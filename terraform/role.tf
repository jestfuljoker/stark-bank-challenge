data "aws_iam_policy_document" "default_for_lambda" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "invoke_lambda" {
  name               = "invoke-lambda"
  assume_role_policy = data.aws_iam_policy_document.default_for_lambda.json
}

data "aws_iam_policy_document" "api_gtw_cloud_watch_document" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "api_gtw_cloud_watch" {
  name               = "api-gtw-cloud-watch"
  assume_role_policy = data.aws_iam_policy_document.api_gtw_cloud_watch_document.json

}
