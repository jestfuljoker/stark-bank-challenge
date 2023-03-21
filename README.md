# Stark Bank Challenge <img alt="Stark Bank Logo" src="https://avatars0.githubusercontent.com/u/40616106?s=400&v=4" width=32 heigh=32 align="center"/>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Chriszao/stark-bank-challenge?color=%2304D361" />

  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/progress-100%25-brightgreen.svg" alt="Progress">
  </a>

  <a href="https://github.com/Chriszao/stark-bank-challenge/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Chriszao/stark-bank-challenge">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

> This service was created to issue invoices to random customers and transfer the amount paid to an account using the stark bank library.

### Developed Features

- [x] Create a Project at sandbox;
- [x] Create a Webhook endpoint;
- [x] Issues 8 to 12 Invoices every 3 hours to random people for 24 hours;
- [x] Receives the webhook callback of the Invoice credit and sends the received amount to the provided account from challenge evaluators using a Transfer;
- [x] Create microservices infrastructure on AWS;
- [x] Unitary tests.

### 💻 Prerequisites

Before you begin, make sure you've met the following requirements:

* [NodeJs v10.x+](https://nodejs.org/en);
* [AWS CLI](https://aws.amazon.com/cli/);
* [Terraform CLI](https://developer.hashicorp.com/terraform/downloads);
* [AWS SAM (optional to invoke local lambdas)](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html);
* [Docker (optional)](https://www.docker.com/get-started/)


### 📦 Preparing environment

To run the application, follow these steps:

Download the project and install the dependencies:

```bash
# Clone this repo
git clone https://github.com/Chriszao/stark-bank-challenge.git

# Enter the project folder
cd stark-bank-challenge

# Install deps P.S: You can use the package manager of your choice. 
# but this project were developed with pnpm, and works better with it
pnpm install

# Run the aws configure command to set the AWS credentials for the next steps. 
# P.S: You must have an IAM user for this step.

# Deploy infrastructure on your account with terraform 
pnpm tf:deploy

# To run unit tests, run the following:
pnpm test

# To test locally lambdas, run the following:
pnpm invoke:local <lambda_name> <json>

# e.g
pnpm invoke:local invoices test
```

### ☕ Using the Application

```bash
# Make a POST request on this endpoint to generate the invoices.
# An HTTP status code 200 would be returned and true in the body.

curl -X POST https://b3a8es3tm3.execute-api.us-east-1.amazonaws.com/dev/invoices

# You can use the Insomnia collection to order as well.

# The transfers endpoint is automatically invoked by the stark bank webhook.
```

---
### 🛠️ Technologies
- [Typescript](https://www.typescriptlang.org/docs/);
- [Jest](https://jestjs.io/);
- [Husky](https://typicode.github.io/husky/#/?id=features);
- [Eslint](https://eslint.org/);
- [Prettier](https://prettier.io/);
- [AWS Lambda Function](https://docs.aws.amazon.com/lambda/index.html);
- [Terraform](https://www.terraform.io/);
- [AWS SAM](https://aws.amazon.com/serverless/sam/);
- Among others.


<p align="center">
  Developed with 💙 by <strong>Chriszao</strong>
</p>

[⬆ Back to top](#StarkBankChallenge)<br>
