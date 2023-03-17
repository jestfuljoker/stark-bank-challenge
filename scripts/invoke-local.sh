#!/usr/env/bin/bash

set -e

ERROR_COLOR="\033[31;1m"
DEFAULT_COLOR="\033[97;1m"

FUNCTION_NAME=$1
FILE_NAME=$2
FILE_PATH="lambda/__tests__/$FUNCTION_NAME/$FILE_NAME.json"
echo "$FILE_PATH"

invokeSam() {
  sam local invoke "$FUNCTION_NAME" -e "$1" --log-file logfile.txt &&
    code logfile.txt
}

[ -z "$FUNCTION_NAME" ] || [ -z "$FILE_NAME" ] &&
  echo -e "${ERROR_COLOR}Please provide the function or test file name${DEFAULT_COLOR}" &&
  exit 1

if [ ! -f "$FILE_PATH" ]; then
  echo -e "${ERROR_COLOR}Test file \"$FILE_NAME\" does not exist${DEFAULT_COLOR}"
  exit 1
fi

if [ -f "lambda/typescript/$FUNCTION_NAME/index.ts" ]; then
  esbuild \
    lambda/typescript/"$FUNCTION_NAME"/index.ts \
    --platform=node \
    --bundle \
    --sourcemap \
    --minify \
    --external:@types/* \
    --outfile=lambda/__compiled__/"$FUNCTION_NAME"/index.js && invokeSam "$FILE_PATH"
fi
