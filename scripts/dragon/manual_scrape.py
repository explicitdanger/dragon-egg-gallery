'''
takes names of dragons as listed in the dvc.wiki.gg wiki url
scrapes the necessary info and creates the dragon object and saves it
to dragon_list.json

this file is to be used when a new dragon is added but scraping new dragons info 
is unsuccessfull by the scrape_new_dragons.py script

USAGE:- make manual-scrape DRAGONS="dragon1 egg_dragon"

'''

import sys
import requests
from bs4 import BeautifulSoup
import json
import datetime
from typing import Dict, Any, List
from urllib.parse import urljoin

class ManualDragonScraper:
    def __init__(self):
        self.base_url = "https://dvc.wiki.gg"
        self.dragons = {}
        self.session = self._create_session()

    def _create_session(self) -> requests.Session:
        """Create a session with headers"""
        session = requests.Session()
        session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        return session

    def scrape_dragon(self, dragon_key: str) -> Dict[str, Any]:
        """Scrape a single dragon's data"""
        url = f"{self.base_url}/wiki/{dragon_key}"
        print(f"url={url}")
        try:
            response = self.session.get(url, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                infobox = soup.find('aside', class_='portable-infobox')
                if not infobox:
                    return {}

                # Get profile image URL
                profile_img = soup.find('img', {'alt': lambda x: x and 'Sprite' in x})
                profile_img_url = urljoin(self.base_url, profile_img['src']) if profile_img else ""

                # Get egg image URL
                egg_img = soup.find('img', {'alt': lambda x: x and 'Egg' in x})
                egg_img_url = urljoin(self.base_url, egg_img['src']) if egg_img else ""

                # Format dragon name from key (e.g., "frost_dragon" -> "Frost Dragon")
                formatted_name = " ".join(word.capitalize() for word in dragon_key.replace("_", " ").split())

                # Get dragon info
                dragon_info = {
                    "name": formatted_name,  # Use formatted key as name
                    "egg_description": self._get_infobox_value(infobox, 'EggDescription'),
                    "elements": self._get_elements(infobox),
                    "rarity": self._get_infobox_value(infobox, 'Rarity'),
                    "region": self._get_infobox_value(infobox, 'Region'),
                    "dragon_type": self._get_infobox_value(infobox, 'DragonType'),
                    "body_type": self._get_infobox_value(infobox, 'BodyType'),
                    "food": self._get_infobox_value(infobox, 'Food'),
                    "tradeable": self._get_infobox_value(infobox, 'Tradeable').lower() == 'yes',
                    "breeding_tier": self._parse_breeding_tier(self._get_infobox_value(infobox, 'BreedValue')),
                    "profile_img_url": profile_img_url,
                    "profile_url": url,
                    "egg_img_url": egg_img_url
                }
                return dragon_info

        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")
        return {}

    def _get_infobox_value(self, infobox, data_source: str) -> str:
        """Helper method to get infobox values"""
        element = infobox.find('div', {'data-source': data_source})
        if element:
            value_div = element.find('div', class_='pi-data-value')
            if value_div:
                return value_div.text.strip()
        return ""

    def _get_elements(self, infobox) -> List[str]:
        """Extract elements from infobox"""
        elements_div = infobox.find('div', {'data-source': 'Elements'})
        elements = []
        if elements_div:
            for img in elements_div.find_all('img'):
                element = img.get('alt', '').lower().replace(' element icon.png', '')
                if element:
                    elements.append(element)
        return elements

    def _parse_breeding_tier(self, tier_text: str) -> int:
        """Parse breeding tier from text"""
        if tier_text:
            try:
                return int(''.join(filter(str.isdigit, tier_text)))
            except ValueError:
                pass
        return 0

    def update_dragon_list(self, dragon_key: str, dragon_data: Dict[str, Any]):
        """Update the dragon list with new data"""
        try:
            # Load existing dragon list
            with open('dragon/updated_dragon_list.json', 'r') as f:
                existing_data = json.load(f)
        except FileNotFoundError:
            existing_data = {"dragon": [{}, 0, ""]}

        # Convert key to lowercase for storage
        storage_key = dragon_key.lower()

        # Sort the dragon data keys
        sorted_dragon_data = {}
        for key in sorted(dragon_data.keys()):
            sorted_dragon_data[key] = dragon_data[key]

        # Update dragon data with sorted version
        existing_data["dragon"][0][storage_key] = sorted_dragon_data
        
        # Sort the main dictionary
        existing_data["dragon"][0] = dict(sorted(existing_data["dragon"][0].items()))
        
        # Update count and timestamp
        existing_data["dragon"][1] = len(existing_data["dragon"][0])
        existing_data["dragon"][2] = str(datetime.datetime.now())

        # Save updated list
        with open('dragon/updated_dragon_list.json', 'w', encoding='utf-8') as f:
            json.dump(existing_data, f, indent=2, ensure_ascii=False)

def main():
    if len(sys.argv) < 2:
        print("Usage: python manual_scrape.py <dragon_name1> <dragon_name2> ...")
        sys.exit(1)

    scraper = ManualDragonScraper()
    
    # Process each dragon name from command line arguments
    for dragon_key in sys.argv[1:]:
        print(f"\nProcessing {dragon_key}")
        
        # Scrape the dragon
        dragon_data = scraper.scrape_dragon(dragon_key)
        print(dragon_data)
        if dragon_data:
            scraper.update_dragon_list(dragon_key, dragon_data)
            print(f"Successfully updated {dragon_key}")
        else:
            print(f"Failed to scrape {dragon_key}")

if __name__ == "__main__":
    main() 