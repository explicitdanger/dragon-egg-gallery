'''
creates seperate json file for each dragon object
these objects are stored in a seperate directory
'''

import json
import os

# Create output directory if it doesn't exist
output_dir = "dragons"
os.makedirs(output_dir, exist_ok=True)

# Read and parse the JSON file
with open("dragon/updated_dragon_list.json", "r") as f:
    data = json.load(f)

# Create individual files for each dragon
for dragon_name, dragon_data in data["dragon"][0].items():
    # Create filename - use the dragon's name as the filename
    filename = f"{output_dir}/{dragon_name}.json"
    
    # Write the dragon data to its own file
    with open(filename, "w") as f:
        json.dump(dragon_data, f, indent=2)

print(f"Split complete! Files have been created in the '{output_dir}' directory.")