SHELL := /bin/bash
.DEFAULT_GOAL := setup

setup:
	python3 -m venv '.venv'
	source .venv/bin/activate \
		&& python3 -m pip install --upgrade pip \
		&& python3 -m pip install -r requirements.txt \
		&& python3 -m pip freeze > requirements.lock.txt
