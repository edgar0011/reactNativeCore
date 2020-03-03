#!/bin/bash
set -e

rm -rf node_modules
watchman watch-del-all
yarn cache clean
yarn
yarn start -- --reset-cache
