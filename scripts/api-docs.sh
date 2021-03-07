#! /bin/bash
yarn build:types && yarn api-extractor run && rm -rf docs && yarn api-documenter markdown -i temp -o docs && cp config/docs_config.yml docs/_config.yml