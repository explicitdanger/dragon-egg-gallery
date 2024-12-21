"""
Creates separate JSON files for each chunk of dragon objects.
Each file contains up to 8 dragon objects stored in an array.
"""

import json
import os

# Create output directory if it doesn't exist
output_dir = "dragon/pages"
os.makedirs(output_dir, exist_ok=True)

# Read and parse the JSON file
with open("dragon/updated_dragon_list.json", "r") as f:
    data = json.load(f)

# Extract the dragon objects
dragons = data["dragon"][0]  # Access the first element of the list to get the dictionary of dragons

# Split the dragons into chunks of 8
chunk_size = 8
dragon_objects = list(dragons.values())  # Get the list of dragon objects

for i in range(0, len(dragon_objects), chunk_size):
    chunk = dragon_objects[i:i + chunk_size]  # Get the next chunk of dragons
    filename = f"{output_dir}/dragon_page_{(i // chunk_size) + 1}.json"  # Create filename

    # Write the chunk of dragon data to its own file
    with open(filename, "w") as f:
        json.dump({"dragons": chunk}, f, indent=2)

print(f"Split complete! Files have been created in the '{output_dir}' directory.")
