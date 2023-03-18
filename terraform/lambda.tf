data "archive_file" "invoices_lambda_zip" {
  type        = "zip"
  source_dir  = "../lambda/__compiled__/invoices"
  output_path = "../lambda/__zip__/invoices.zip"
}

resource "aws_lambda_function" "invoices" {
  function_name    = "stark-challenge-invoices"
  filename         = data.archive_file.invoices_lambda_zip.output_path
  source_code_hash = data.archive_file.invoices_lambda_zip.output_base64sha256
  role             = aws_iam_role.invoke_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs18.x"
  timeout          = 10

  environment {
    variables = {
      REGION     = "us-east-1"
      PROJECT_ID = "6361128644902912"
    }
  }
}

data "archive_file" "transfers_lambda_zip" {
  type        = "zip"
  source_dir  = "../lambda/__compiled__/transfers"
  output_path = "../lambda/__zip__/transfers.zip"
}

resource "aws_lambda_function" "transfers" {
  function_name    = "stark-challenge-transfers"
  filename         = data.archive_file.transfers_lambda_zip.output_path
  source_code_hash = data.archive_file.transfers_lambda_zip.output_base64sha256
  role             = aws_iam_role.invoke_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs18.x"
  timeout          = 10

  environment {
    variables = {
      REGION     = "us-east-1"
      PROJECT_ID = "6361128644902912"
    }
  }
}
