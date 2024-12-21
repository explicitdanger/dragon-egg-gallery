'''

This script parses the official dragon dict and compares with the dragon_list.json
it adds the assets and their form names to each dragon object
it then stores them in the dragon_list.json
'''


import json
import sys
from check_dragon_list import load_official_dragon_json

def normalize_dragon_key(key: str) -> str:
    """Normalize dragon key to match official data format"""
    # Convert Ice_Drake -> icedrake
    return key.replace("_", "").lower()

def extract_dragon_assets(dragon_key, dragon_data):
    """Extract assets and forms from official dragon data structure"""
    assets = []
    forms =[]  # List to store form names
    
    # Process each stage
    for stage_name, stage_data in dragon_data["stage"].items():
        # Process each form in the stage
        for form_num, form_data in stage_data["forms"].items():
            # Skip undead form as it has different structure
            if form_num == "undead":
                continue
            
            # Add the form display name to the forms list
            if form_data["formDisplay"] not in forms:
                forms.append(form_data["formDisplay"])  # Add form name to the list
            
            # Process each gender
            for gender, gender_data in form_data["genders"].items():
                asset = {
                    "form_number": form_num.zfill(2),  # Ensure 2 digits
                    "gender": gender,
                    "stage": stage_name,
                    "color_code": gender_data["color"],
                    "path": f"{dragon_key}_{form_num.zfill(2)}_{gender}_{stage_name}_{gender_data['color']}"
                }
                assets.append(asset)
    
    return assets, forms  # Return both assets and forms

def update_dragon_assets(dragon_keys=None):
    """Update assets for specified dragons or all new dragons"""
    try:
        # Load official dragon data
        official_dragons = load_official_dragon_json()
        if not official_dragons:
            print("No official dragon data available")
            return

        # Load current dragon list
        with open("dragon/updated_dragon_list.json", "r") as f:
            dragon_list = json.load(f)

        # Get the dragon dictionary
        dragons_dict = dragon_list["dragon"][0]
        updated_count = 0

        # Process specified dragons or all dragons
        dragons_to_update = dragon_keys if dragon_keys else dragons_dict.keys()
        
        for original_key in dragons_to_update:
            # Convert Ice_Drake -> icedrake for official data lookup
            normalized_key = normalize_dragon_key(original_key)
            
            if normalized_key in official_dragons:
                print(f"Updating assets for {original_key} (official key: {normalized_key})")
                # Use normalized key to get official data, but original key to update our list
                assets, forms = extract_dragon_assets(normalized_key, official_dragons[normalized_key])
                dragons_dict[original_key]["assets"] = assets
                dragons_dict[original_key]["forms"] = forms  # Add forms to the dragon object
                updated_count += 1
            else:
                print(f"Dragon {original_key} not found in official data (tried: {normalized_key})")

        # Save updated dragon list
        with open("dragon/updated_dragon_list.json", "w") as f:
            json.dump(dragon_list, f, indent=2)

        print(f"\nAssets updated for {updated_count} dragons")

    except Exception as e:
        print(f"Error updating assets: {e}")

if __name__ == "__main__":
    # Get dragon keys from command line arguments
    dragon_keys = sys.argv[1:] if len(sys.argv) > 1 else None
    update_dragon_assets(dragon_keys) 