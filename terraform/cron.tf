resource "aws_cloudwatch_event_rule" "invoices_cron" {
  name                = "stark-challenge-invoices-cron"
  schedule_expression = "cron(0 */3 * * ? *)"
}

resource "aws_cloudwatch_event_target" "invoices_cron" {
  rule = aws_cloudwatch_event_rule.invoices_cron.name
  arn  = aws_lambda_function.invoices.arn
}
