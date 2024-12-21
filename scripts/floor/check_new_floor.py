import requests
import json
import re


def remove_js_comments(js_content: str) -> str:
    """Remove comments from JavaScript content."""
    js_content = re.sub(r"//.*?\n", "", js_content)  # Remove single-line comments
    js_content = re.sub(
        r"/\*.*?\*/", "", js_content, flags=re.DOTALL
    )  # Remove multi-line comments
    return js_content


def fix_js_to_json(js_content: str) -> str:
    """Convert JavaScript object to valid JSON format."""
    js_content = re.sub(
        r"(\w+)(?=\s*:)", r'"\1"', js_content
    )  # Ensure property names are quoted
    js_content = re.sub(
        r",\s*}", "}", js_content
    )  # Remove trailing comma before closing brace
    js_content = re.sub(
        r",\s*]", "]", js_content
    )  # Remove trailing comma before closing bracket
    return js_content


def fetch_and_parse_js_object(url: str) -> list:
    """Fetch a JavaScript object from a URL and parse it into a list of dictionaries."""
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        js_content = response.text
        js_content = remove_js_comments(js_content)

        if "=" in js_content:
            js_obj = js_content.split("=")[1].strip()
            js_obj = js_obj[js_obj.index("{") : js_obj.rindex("}") + 1]
        else:
            raise ValueError("The JavaScript content does not contain an assignment.")

        json_content = fix_js_to_json(js_obj)
        parsed_data = json.loads(json_content)

        # Print the parsed data for debugging
        # print("\nParsed Data:")
        # print()
        return json.dumps(parsed_data, indent=2)

    except json.JSONDecodeError as e:
        print(f"JSON decoding error: {e}")
        return []
    except Exception as e:
        print(f"Error fetching or parsing the JavaScript object: {e}")
        return []


def load_existing_floor_assets(file_path: str) -> list:
    """Load existing background assets from a JSON file."""
    r = requests.get(file_path)  # Return the list of backgrounds
    floor = r.json()
    return floor


def compare_and_update_floor_assets(existing_assets: list, new_assets: dict) -> list:
    """Compare existing and new background assets and update the existing assets."""
    existing_paths = [floor_obj["path"] for floor_obj in existing_assets]
    new_assets_list = []
    new_assets = json.loads(new_assets)
    for floor in new_assets.keys():
        if floor == "[None]":
            continue
        if new_assets[floor]["res"].split("/")[-1] not in existing_paths:
            my_path = "/".join(new_assets[floor]["res"].split("/")[:-1])
            print("New Floor found:", floor)
            d = {"display_name": floor, "path": my_path}
            new_assets_list.append(d)
    return new_assets_list, True if len(new_assets_list) > 0 else False


def save_updated_floor_assets(file_path: str, updated_assets: list):
    """Save the updated background assets to a JSON file."""
    with open(file_path, "w") as f:
        json.dump({"floor": updated_assets}, f, indent=2)


if __name__ == "__main__":
    existing_floor_file = "https://raw.githubusercontent.com/explicitdanger/eggs-db/refs/heads/main/floor_assets.json"  # Path to your existing assets file
    new_floor_url = "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/refs/heads/main/dict/cavefloordict.js"  # URL to fetch new assets

    # Load existing background assets
    existing_assets = load_existing_floor_assets(existing_floor_file)

    # Fetch and parse new background assets
    new_assets = fetch_and_parse_js_object(new_floor_url)

    # Compare and update existing assets
    updated_assets, updated = compare_and_update_floor_assets(
        existing_assets["floor"], new_assets
    )

    if updated:
        # Save the updated background assets to a new JSON file
        save_updated_floor_assets("floor/updated_floor_assets.json", updated_assets)
        print("Updated background assets saved to 'updated_floor_assets.json'.")
    else:
        print("No new backgrounds to add.")
