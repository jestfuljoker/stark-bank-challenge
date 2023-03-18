# START API CONFIG =============================================================
resource "aws_apigatewayv2_api" "stark_challenge_api" {
  name          = "stark-challenge-api"
  protocol_type = "HTTP"
}

resource "aws_cloudwatch_log_group" "api_gtw_cloud_watch" {
  name = "/aws/api_gtw/${aws_apigatewayv2_api.stark_challenge_api.name}"
}

resource "aws_apigatewayv2_stage" "dev" {
  api_id      = aws_apigatewayv2_api.stark_challenge_api.id
  name        = "dev"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gtw_cloud_watch.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}
# END API CONFIG ===============================================================

# START RESOURCES ==============================================================

# Invoices 
resource "aws_apigatewayv2_integration" "invoices_integration" {
  api_id = aws_apigatewayv2_api.stark_challenge_api.id

  integration_uri    = aws_lambda_function.invoices.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "post_invoices" {
  api_id = aws_apigatewayv2_api.stark_challenge_api.id

  route_key = "POST /invoices"
  target    = "integrations/${aws_apigatewayv2_integration.invoices_integration.id}"
}

resource "aws_lambda_permission" "invoices_api_gtw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.invoices.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.stark_challenge_api.execution_arn}/*/*"
}

# Transfers
resource "aws_apigatewayv2_integration" "transfers_integration" {
  api_id = aws_apigatewayv2_api.stark_challenge_api.id

  integration_uri    = aws_lambda_function.transfers.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "post_transfers" {
  api_id = aws_apigatewayv2_api.stark_challenge_api.id

  route_key = "POST /transfers"
  target    = "integrations/${aws_apigatewayv2_integration.transfers_integration.id}"
}

resource "aws_lambda_permission" "transfers_api_gtw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.transfers.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.stark_challenge_api.execution_arn}/*/*"
}

# END RESOURCES ================================================================
