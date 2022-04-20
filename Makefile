
export CLADES_SVG_SRC="https://raw.githubusercontent.com/nextstrain/ncov-clades-schema/master/clades.svg"
export CLADES_SVG_DST="web/src/assets/images/clades.svg"

# Umbrella target for updating all data for web app
web-data: web-json stills update-clades-svg

# Update JSON files for web app
# getting OWID data is first, because has long output (case counts) & may hide other warnings/errors
web-json:
	python3 scripts/get_owid_data.py
	python3 scripts/include_case_counts.py
	python3 scripts/convert_to_web_app_json.py
	

# Update jpeg images for web app
stills:
	cd web && yarn stills

# Download fresh clades.svg
update-clades-svg:
	@echo "Downloading clade schema from '${CLADES_SVG_SRC}' to '${CLADES_SVG_DST}'"
	curl -fsSL ${CLADES_SVG_SRC} -o ${CLADES_SVG_DST}

# Run web app in development mode
dev:
	cd web && yarn dev

# Run web app in production mode
prod:
	cd web && yarn prod:watch
