import requests
import json
import re


def remove_js_comments(js_content: str) -> str:
    """Remove comments from JavaScript content."""
    # Remove single-line comments
    js_content = re.sub(r"//.*?\n", "", js_content)
    # Remove multi-line comments
    js_content = re.sub(r"/\*.*?\*/", "", js_content, flags=re.DOTALL)
    return js_content


def fix_js_to_json(js_content: str) -> str:
    """Convert JavaScript object to valid JSON format."""
    # Ensure all property names are enclosed in double quotes
    js_content = re.sub(r"(\w+)(?=\s*:)", r'"\1"', js_content)
    # Remove trailing commas
    js_content = re.sub(r",\s*}", "}", js_content)  # Remove trailing comma before closing brace
    js_content = re.sub(r",\s*]", "]", js_content)  # Remove trailing comma before closing bracket
    return js_content


def fetch_and_parse_js_object(url: str) -> dict:
    """Fetch a JavaScript object from a URL and parse it into a Python dictionary."""
    try:
        # Fetch the content from the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses

        # Get the content as text
        js_content = response.text

        # Print the raw JavaScript content for debugging
        print("Raw JavaScript Content:")
        print(js_content)

        # Remove comments from the JavaScript content
        js_content = remove_js_comments(js_content)

        # Print the cleaned JavaScript content for debugging
        print("\nCleaned JavaScript Content:")
        print(js_content)

        # Extract the JavaScript object
        if "=" in js_content:
            js_obj = js_content.split("=")[1].strip()  # Assuming the format is 'const cavebgJson = {...}'
            js_obj = js_obj[js_obj.index("{") : js_obj.rindex("}") + 1]  # Extract the JSON part
        else:
            raise ValueError("The JavaScript content does not contain an assignment.")

        # Fix the JavaScript object to be valid JSON
        json_content = fix_js_to_json(js_obj)

        # Print the extracted JSON object for debugging
        print("\nExtracted JSON Object:")
        print(json_content)

        # Parse the JSON content into a Python dictionary
        parsed_data = json.loads(json_content)

        return parsed_data

    except json.JSONDecodeError as e:
        print(f"JSON decoding error: {e}")
        print(f"Invalid JSON content: {json_content}")  # Print the invalid JSON content
        return {}
    except Exception as e:
        print(f"Error fetching or parsing the JavaScript object: {e}")
        return {}


if __name__ == "__main__":
    url = "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/refs/heads/main/dict/cavebgdict.js"
    parsed_object = fetch_and_parse_js_object(url)

    # Print the parsed object
    print("\nParsed Object:")
    print(json.dumps(parsed_object, indent=2))
