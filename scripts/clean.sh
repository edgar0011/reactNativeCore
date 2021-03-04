#!/bin/bash
set -e


watchman watch-del-all
rm -rf node_modules
yarn cache clean
yarn
yarn start -- --reset-cache
rm -rf /tmp/metro-*
