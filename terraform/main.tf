provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    region = "us-east-1"
    bucket = "stark-bank-challenge-terraform-state"
    key    = "challenge/state/terraform.tfstate"

    dynamodb_table = "stark-challenge-tf-lock"
    encrypt        = "true"
  }
}
