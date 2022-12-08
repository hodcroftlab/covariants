#!/usr/bin/env bash
set -euo pipefail

# Inspired by https://stackoverflow.com/a/54096479/526860

FUNCTION_NAME=$1

for region in $(aws --output text ec2 describe-regions | cut -f 4); do
  for loggroup in $(aws --output text logs describe-log-groups --log-group-name "/aws/lambda/us-east-1.$FUNCTION_NAME" --region $region --query 'logGroups[].logGroupName'); do
    printf "$region\tconsole.aws.amazon.com/cloudwatch/home?region=$region#logsV2:log-groups/log-group/\$252Faws\$252Flambda\$252Fus-east-1.$FUNCTION_NAME\n"
  done
done
