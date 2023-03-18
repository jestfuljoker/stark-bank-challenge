resource "aws_iam_role_policy_attachment" "lambda_attachment_cloud_watch" {
  role       = aws_iam_role.invoke_lambda.name
  policy_arn = aws_iam_policy.cloud_watch.arn
}

resource "aws_iam_role_policy_attachment" "lambda_attachment_secrets_manager" {
  role       = aws_iam_role.invoke_lambda.name
  policy_arn = aws_iam_policy.secrets_manager.arn
}

resource "aws_iam_role_policy_attachment" "api_gtw_attachment_cloud_watch" {
  role       = aws_iam_role.api_gtw_cloud_watch.name
  policy_arn = aws_iam_policy.cloud_watch_api_gtw.arn
}
