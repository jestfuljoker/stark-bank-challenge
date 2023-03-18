data "aws_iam_policy_document" "cloud_watch" {
  statement {
    actions = [
      "logs:CreateLogStream",
      "logs:CreateLogGroup",
      "logs:PutLogEvents"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "cloud_watch" {
  name   = "stark-challenge-lambda-logging"
  policy = data.aws_iam_policy_document.cloud_watch.json
}

data "aws_iam_policy_document" "cloud_watch_api_gtw" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:DescribeLogGroups",
      "logs:DescribeLogStreams",
      "logs:PutLogEvents",
      "logs:GetLogEvents",
      "logs:FilterLogEvents"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "cloud_watch_api_gtw" {
  name   = "stark-challenge-api-gtw-logging"
  policy = data.aws_iam_policy_document.cloud_watch_api_gtw.json
}


data "aws_iam_policy_document" "secrets_manager" {
  statement {
    actions = [
      "secretsmanager:GetSecretValue",
    ]
    resources = [
      "arn:aws:secretsmanager:us-east-1:533104576249:secret:stark-bank-private-key-H2LS2P"
    ]
  }
}

resource "aws_iam_policy" "secrets_manager" {
  name   = "stark-challenge-secrets-manager"
  policy = data.aws_iam_policy_document.secrets_manager.json
}
