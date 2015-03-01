#!/bin/sh

# Enable Apache vhosts:
# sudo nano /usr/local/etc/apache2/2.4/httpd.conf

# Uncomment the following lines:
# Include /private/etc/apache2/extra/httpd-vhosts.conf
# LoadModule rewrite_module libexec/mod_rewrite.so
# LoadModule vhost_alias_module libexec/apache2/mod_vhost_alias.so

# Add the following line:
# LoadModule php5_module /usr/local/opt/php56/libexec/apache2/libphp5.so

# Set up vhost for site:
# sudo nano /usr/local/etc/apache2/2.4/extra/httpd-vhosts.conf

# User karl
# Group staff

# Test configuration:
# sudo httpd -t

# Restart Apache:
# sudo httpd -k restart

cd `dirname $0`

xcode-select --install

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update && brew cleanup

brew install caskroom/cask/brew-cask

brew upgrade brew-cask && brew cask cleanup

brew install rbenv ruby-build

# Add rbenv to bash so that it loads every time you open a terminal
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
source ~/.bash_profile

# Install Ruby 2.1.3 and set it as the default version
rbenv install 2.1.3
rbenv global 2.1.3

#ruby -v

# Install pip package management system which is used to install and manage software packages written in Python.
sudo easy_install pip

# Install AWS Command Line Interface
sudo pip install awscli

# brew tap allows you to import formula from other repositories into your Homebrew instance.
#brew tap homebrew/apache
brew tap homebrew/dupes
brew tap homebrew/versions
brew tap homebrew/homebrew-php

# Set Homebrew options
brew options php56

# Verify
brew update && brew upgrade

# Install Homebrew formulae for command line applications
brew install imagemagick
brew install git
brew install graphicsmagick
brew install mongodb
brew install openssl
brew install shellcheck
brew install wget

# Set up node
brew install node
echo 'export NODE_ENV=development' >> ~/.bash_rc

# Set up Apache
sudo apachectl stop
sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist 2>/dev/null
brew install httpd24 --with-privileged-ports --with-brewed-ssl
sudo cp -v /usr/local/Cellar/httpd24/2.4.10/homebrew.mxcl.httpd24.plist /Library/LaunchDaemons
sudo chown -v root:wheel /Library/LaunchDaemons/homebrew.mxcl.httpd24.plist
sudo chmod -v 644 /Library/LaunchDaemons/homebrew.mxcl.httpd24.plist
sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.httpd24.plist
sudo httpd -k start

# Set up MySQL
brew install mysql
ln -sfv /usr/local/opt/mysql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
mysql.server restart
mysql_secure_installation
mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp
sudo cp ../mysql/my.cnf /etc/my.cnf
mysql.server restart

# Set up PHP
brew install php56 --homebrew-apxs --with-apache --with-homebrew-curl --with-homebrew-openssl --with-phpdbg --with-tidy --without-snmp
chmod -R ug+w /usr/local/Cellar/php56/5.6.4/lib/php
pear config-set php_ini /usr/local/etc/php/5.6/php.ini
printf '\nAddHandler php5-script .php\nAddType text/html .php' >> /usr/local/etc/apache2/2.4/httpd.conf
perl -p -i -e 's/DirectoryIndex index.html/DirectoryIndex index.php index.html/g' /usr/local/etc/apache2/2.4/httpd.conf
printf '\nexport PATH="$(brew --prefix homebrew/php/php56)/bin:$PATH"' >> ~/.profile
echo 'export PATH="$(brew --prefix php56)/bin:$PATH"' >> ~/.bash_rc
ln -sfv /usr/local/opt/php56/*.plist ~/Library/LaunchAgents
brew install composer

# Install Homebrew cask formulae for GUI-based applications
brew cask install atom
brew cask install cakebrew
brew cask install deltawalker
brew cask install firefox
brew cask install github
brew cask install google-chrome
brew cask install tower
brew cask install transmit
brew cask install sequel-pro
brew cask install skype

exit
