#!/bin/sh

if [ -f .git/config ]; then

  if hash git 2>/dev/null; then
    git config core.ignorecase false
  else
    echo "git not installed"
    exit
  fi

fi

# if [ -f Gemfile ]; then
#
#   if hash ruby 2>/dev/null; then
#
#     if hash update_rubygems 2>/dev/null; then
#       #sudo update_rubygems
#       update_rubygems
#     else
#       echo "update_rubygems not installed"
#     fi
#
#     if hash gem 2>/dev/null; then
#       gem update --system
#       gem install bundler
#     else
#       echo "gem not installed"
#       exit
#     fi
#
#     if hash bundle 2>/dev/null; then
#       bundle install
#     else
#       echo "bundle not installed"
#       exit
#     fi
#
#   else
#     echo "ruby not installed"
#     exit
#   fi
#
# fi

if [ -f package.json ]; then
  echo "package.json found"

  if hash npm 2>/dev/null; then
    echo "npm installed"

    if [ -d node_modules ]; then
      echo "running npm update"
      npm update
    else
      echo "running npm install"
      npm install
    fi

    if [ -f bower.json ]; then
      echo "bower.json found"

      if [ -f ./node_modules/.bin/bower ]; then
        echo "bower installed"

        if [ -d bower_components ]; then
          echo "running bower update"
          npm run bower update;
        else
          echo "running bower install"
          npm run bower install;
        fi

      else
        echo "bower not installed"
        exit
      fi

    fi

    if hash ncu 2>/dev/null; then
      echo "npm-check-updates installed"
      echo "running npm-check-updates"
      ncu
    else
      echo "npm-check-updates not installed"
      exit
    fi

    if [ -f gulpfile.js ]; then
      echo "gulpfile.json found"

      if [ -f ./node_modules/.bin/gulp ]; then
        echo "gulp installed"
        echo "running gulp"
        npm run gulp
      else
        echo "gulp not installed"
        exit
      fi

    fi

  else
    echo "npm not installed"
    exit
  fi

fi
