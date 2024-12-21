'''
compares the official list of dragons
with the current version of dragons_list
adds new names keys to missing_dragons.json
'''

import requests
import json

def load_official_dragon_json():
    """Fetches and parses the official dragon dictionary from GitHub"""
    try:
        resp = requests.get(
            "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/refs/heads/main/dict/dragondict.js"
        )
        resp.raise_for_status()  # Raise exception for bad status codes
        dragons = json.loads(resp.text.split("=")[1].strip())
        del dragons["dummydragon"]
        return dragons
    except Exception as e:
        print(f"Error loading official dragon data: {e}")
        return {}

def load_current_dragons_names():
    """Loads dragon names from local JSON file"""
    try:
        with open("dragon/updated_dragon_list.json", "r") as f:
            dragon_data = json.load(f)
            # Get all dragon names from the first dictionary in the dragon array
            return set(dragon_data["dragon"][0].keys())
    except Exception as e:
        print(f"Error loading current dragon list: {e}")
        return set()

def check_new_dragons(official_dragons):
    """Compares official dragons with current dragons"""
    if not official_dragons:
        print("No official dragons data available")
        return []

    current_dragons = load_current_dragons_names()

    if not current_dragons:
        print("No current dragons data available")
        return []

    master_current_dragons = [
        "".join(dragon_name.split("_")) for dragon_name in current_dragons
    ]
    master_current_dragons += [
        dragon_name.split("_dragon")[0] for dragon_name in current_dragons
    ]
    # Print comparison results
    new_dragons = []
    for dragon_key in official_dragons:
        if (
            official_dragons[dragon_key]["speciesDisplay"].lower().replace(" ", "") not in master_current_dragons
        ):
            new_dragons.append(dragon_key)
            print(
                f"Missing dragon: {official_dragons[dragon_key]['speciesDisplay']} ({dragon_key})"
            )

    # Print some stats
    print(f"\nStats:")
    print(f"Official dragons: {len(official_dragons)}")
    print(f"Current dragons: {len(current_dragons)}")
    print(f"Missing dragons: {len(new_dragons)}")

    # Save missing dragons to file
    with open('missing_dragons.json', 'w') as f:
        json.dump(new_dragons, f, indent=2)
    print("\nMissing dragons saved to 'missing_dragons.json'")

    return new_dragons

def run():
    """Main function to run the comparison"""
    print("Loading dragon data...")
    dragons = load_official_dragon_json()
    new_dragons = check_new_dragons(dragons)

    if new_dragons:
        print("\nMissing dragon keys:", new_dragons)

if __name__ == "__main__":
    run()
