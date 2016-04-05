#!/bin/sh

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

cd $dir/../..

if [ -f .git/config ]; then

  if hash git 2>/dev/null; then
    git config core.ignorecase false
  else
    echo "git not installed"
    exit
  fi

fi

if [ -f Gemfile ]; then

  if hash ruby 2>/dev/null; then

    if hash update_rubygems 2>/dev/null; then
      #sudo update_rubygems
      update_rubygems
    else
      echo "update_rubygems not installed"
    fi

    if hash gem 2>/dev/null; then
      gem update --system
      gem install bundler
    else
      echo "gem not installed"
      exit
    fi

    if hash bundle 2>/dev/null; then
      bundle install
    else
      echo "bundle not installed"
      exit
    fi

  else
    echo "ruby not installed"
    exit
  fi

fi

if [ -f composer.json ]; then

  if hash php 2>/dev/null; then

    if hash composer 2>/dev/null; then

      if [ ! -f www ]; then
        composer install
      else
        composer update
      fi

    else
      echo "composer not installed"
      exit
    fi

  else
    echo "php not installed"
    exit
  fi

fi

if [ -f package.json ]; then
  echo "package.json found"

  if hash npm 2>/dev/null; then
    echo "npm installed"

    if hash ncu 2>/dev/null; then
      echo "npm-check-updates installed"
      echo "running npm-check-updates"
      ncu --upgradeAll
    else
      echo "npm-check-updates not installed"
      exit
    fi

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

        if hash ncu 2>/dev/null; then
          echo "running npm-check-updates -m bower"
          ncu -m bower --upgradeAll
        else
          echo "npm-check-updates not installed"
          exit
        fi

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
