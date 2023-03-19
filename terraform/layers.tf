data "archive_file" "lambda_deps_zip" {
  type        = "zip"
  source_dir  = "../lambda/layers/lambda-deps"
  output_path = "../lambda/__zip__/lambda-deps.zip"
}

resource "aws_lambda_layer_version" "lambda_deps" {
  layer_name       = "stark-challenge-lambda-deps-layer"
  filename         = data.archive_file.lambda_deps_zip.output_path
  source_code_hash = data.archive_file.lambda_deps_zip.output_base64sha256
}
