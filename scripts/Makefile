.PHONY: all check scrape assets split clean manual-scrape manual-assets

# Default target that runs everything in sequence
all: check scrape assets generate_pages split

update-dragons-manual: check manual-scrape manual-assets split

# Check for new dragons
check:
	@echo "\n=== Checking for new dragons ===\n"
	python dragon/check_dragon_list.py

# Scrape new dragons
scrape:
	@echo "\n=== Scraping new dragons ===\n"
	python dragon/scrape_new_dragons.py

# Update assets for new dragons
assets:
	@echo "\n=== Updating dragon assets ===\n"
	python dragon/update_dragon_assets.py

# Split dragons into individual files
split:
	@echo "\n=== Splitting dragons into individual files ===\n"
	python dragon/generate_dragon_profile_objects.py

# Manually scrape specific dragons
# Usage: make manual DRAGONS="Ice_Drake Other_Dragon"
manual-scrape:
	@echo "\n=== Manually scraping specified dragons ===\n"
	python dragon/manual_scrape.py $(DRAGONS)

# Manually update assets for specific dragons
# Usage: make manual-assets DRAGONS="Ice_Drake Other_Dragon"
manual-assets:
	@echo "\n=== Manually updating assets for specified dragons ===\n"
	python dragon/update_dragon_assets.py $(DRAGONS)


# generates a directoy called pages and creates pages of 8 dragon objects
generate_pages:
	@echo "\n=== generating pagination pages ===\n"
	python dragon/generate_dragon_page_objects.py

# Clean up generated files
clean:
	@echo "\n=== Cleaning up ===\n"
	rm -f dragon/missing_dragons.json
	rm -rf dragon/__pycache__
	rm -rf dragon/pages

update_bg:
	@echo "\n=== Checking for Background updates ===\n"
	python bg/check_new_bg.py
	mv bg/updated_bg_assets.json bg/bg_assets.json
	cp bg/bg_assets.json ../db/bg_assets.json

update_floor:
	@echo "\n=== Checking for Floor updates ===\n"
	python floor/check_new_floor.py
	mv floor/updated_floor_assets.json floor/floor_assets.json
	cp floor/floor_assets.json ../db/floor_assets.json

update_personality:
	@echo "\n=== Checking for Personality updates ===\n"
	python personality/check_new_personality.py
	mv personality/updated_personality_assets.json personality/personality_list.json
	cp personality/personality_list.json ../db/personality_list.json
