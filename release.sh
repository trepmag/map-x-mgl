#!/bin/bash

#
# Script to build and push new image in remote docker repository
#
BRANCH=master
REMOTE=github
NEW_VERSION=$1
OLD_VERSION=`cat version.txt`
echo $NEW_VERSION
FG_GREEN="\033[32m"
FG_NORMAL="\033[0m"
CHANGES_CHECK=$(git status --porcelain | wc -l)
DIR_APP=app
DIR_CUR=$(pwd)
CUR_HASH=$(git rev-parse HEAD)

USAGE="Usage : bash build.sh $OLD_VERSION"

if [ $CHANGES_CHECK -gt 0 ]
then 
  echo "This project as uncommited changes, stop here"
  exit 1
fi

if [ -z "$NEW_VERSION" ] || [ "$NEW_VERSION" == "$OLD_VERSION" ]
then
  echo "Wrong or missing version. Old version version =  $OLD_VERSION new version = $NEW_VERSION"
  echo "$USAGE"
  exit 1
fi

#
# Update version + verification
#

echo "Update package.json"
REP_PACKAGE_VERSION='s/"version": "'"$OLD_VERSION"'"/"version": "'"$NEW_VERSION"'"/g'
perl -pi -e "$REP_PACKAGE_VERSION" ./app/package.json
perl -pi -e "$REP_PACKAGE_VERSION" ./api/package.json
echo "Update version.txt"
REP_VERSION='s/'"$OLD_VERSION"'/'"$NEW_VERSION"'/g'
perl -pi -e "$REP_VERSION" version.txt
perl -pi -e "$REP_VERSION" ./app/src/html/index.html
echo "Update docker-compose.yml"
REP_API_TAG='s/mx-api-node:'"$OLD_VERSION"'-alpine/mx-api-node:'"$NEW_VERSION"'-alpine/g'
REP_APP_TAG='s/mx-app-shiny:'"$OLD_VERSION"'-debian/mx-app-shiny:'"$NEW_VERSION"'-debian/g'
perl -pi -e $REP_API_TAG ./docker-compose.yml
perl -pi -e $REP_APP_TAG ./docker-compose.yml
echo "Update .drone.yml"
REP_DRONE_TAG='s/'"$OLD_VERSION"'-/'"$NEW_VERSION"'-/g'
perl -pi -e $REP_DRONE_TAG ./.drone.yml

git --no-pager diff --minimal 

echo "Verify git diff of versioning changes. Continue (npm prod, build + push) ? [YES/NO]"
read confirm_diff

if [ "$confirm_diff" != "YES"  ]
then
  echo "Stop here, stash changes. rollback to $CUR_HASH " 
  git stash
  exit 1
fi

echo "Commit and push version $NEW_VERSION tag and text"
git add .
git commit -m "auto build version $NEW_VERSION"
git tag $NEW_VERSION
git push $REMOTE $BRANCH --tags

echo "Done"
