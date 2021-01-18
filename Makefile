
# Umbrella target for updating all data for web app
web-data: web-json stills

# Update JSON files for web app
web-json:
	python3 scripts/convert_to_web_app_json.py

# Update jpeg images for web app
stills:
	cd web && yarn stills

# Run web app in development mode
dev:
	cd web && yarn dev

# Run web app in production mode
prod:
	cd web && yarn prod:watch
