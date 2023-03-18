#!/usr/bin/env bash

set -e

terraformDeploy() {
  bash scripts/build.sh

  cd terraform || exit
  terraform init

  terraform apply

  cd ../
}

terraformDeploy
