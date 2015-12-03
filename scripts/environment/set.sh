#!/bin/sh

# Run this shell script preceded by ". " (dot space). It does the shell be executed in the same shell you are.  e.g. ". ./configuration/set-environment.sh"

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

cd $dir/../..

PS3='Choose environment type: '

# bash select
select environment in "development" "staging" "production"
do
  export WP_CLI_CONFIG_PATH="./configuration/wp/$environment.yml"
  echo "Environment set as $environment"
# Break, otherwise endless loop
  break
done
