#!/bin/sh

GITHUB_USER=$1
BRANCH_NAME=$2

if [ -z $GITHUB_USER ] || [ -z $BRANCH_NAME ]; then
    echo "Missing parameters. Example: sh run.sh GithubUser BranchName"
    exit 1
fi

mp init -f repos.txt

mp clone

FILE=.deploy/helm/Chart.yaml
if [ -f "$FILE" ]; then
    mp plan -b $BRANCH_NAME -m "$BRANCH_NAME Change helm version and repo attributes" -- sh "`pwd`/helm.sh"
else
    mp plan -b $BRANCH_NAME -m "$BRANCH_NAME Upgrade repository attributes" -- node "`pwd`/handleRepo.js"
fi

mp push -a $GITHUB_USER
