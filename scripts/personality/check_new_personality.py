import requests
import json

# Fetch the JavaScript content from the URL
url = "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/refs/heads/main/dict/personalitydict.js"
response = requests.get(url)

# Extract the JavaScript object directly
js_content = response.text

# Find the start of the JSON object
start_index = js_content.find('{')
end_index = js_content.rfind('}') + 1  # Include the closing brace

if start_index != -1 and end_index != -1:
    json_content = js_content[start_index:end_index].strip()  # Extract the JSON part
    try:
        personality_dict = json.loads(json_content)
        
        # Save the extracted object to a JSON file
        with open('personality/updated_personality_list.json', 'w') as json_file:
            json.dump(personality_dict, json_file, indent=4)
    except json.JSONDecodeError as e:
        print("Could not decode the extracted JSON content:", e)
else:
    print("Could not find the JavaScript object.")
