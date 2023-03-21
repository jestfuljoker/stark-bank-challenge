#!/usr/env/bin/bash

set -e

[ -d "./lambda/__compiled__" ] || mkdir -p "./lambda/__compiled__"

for functionPath in ./lambda/typescript/*; do
  functionName=$(basename "$functionPath")

  pnpx esbuild "$functionPath"/index.ts \
    --platform=node \
    --bundle \
    --minify \
    --sourcemap \
    --external:@types/* \
    --external:@faker-js/faker \
    --external:starkbank \
    --external:@aws-sdk/* \
    --external:aws-lambda \
    --outfile=./lambda/__compiled__/"$functionName"/index.js
done
