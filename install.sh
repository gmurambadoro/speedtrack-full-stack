#!/usr/bin/env bash

# path to the web directory
# NB: there is no trailing slash (/)
WEB_DIR=/var/www

# check if the required environment variables have been set
if [ -z "$FRONTEND_DIR" ];
then
  echo E: Variable "\$FRONTEND_DIR" is not set. Please run the command below and replace "<<dir_name>>" with the name of the directory.
  echo
  echo export FRONTEND_DIR="<<dir_name>>"
  echo
  exit 1
fi

if [ -z "$BACKEND_DIR" ];
then
  echo E: Variable "\$BACKEND_DIR" is not set. Please run the command below and replace "<<dir_name>>" with the name of the directory.
  echo
  echo export BACKEND_DIR="<<dir_name>>"
  echo
  exit 1
fi

if [ -z "$BACKEND_URL" ];
then
  echo E: Variable "\BACKEND_URL" is not set. Replace the url with the one for your backend.
  echo
  echo export BACKEND_URL="http://backend.example.com"
  echo
  exit 1
fi

# navigate into webroot and create installation folders
cd $WEB_DIR || exit 1

# attempt to create the target directors and silently fail if they already exist
sudo mkdir "$FRONTEND_DIR" "$BACKEND_DIR"

# check that the required directories exist and we can access their contents
ls -ah "$FRONTEND_DIR" || exit 1
ls -ah "$BACKEND_DIR" || exit 1

# set proper permissions recursively for apache user
sudo chown -R www-data:www-data "$FRONTEND_DIR" "$BACKEND_DIR"
sudo chown -R www-data:www-data "$FRONTEND_DIR" "$BACKEND_DIR"

# the tmp directory will be the working folder
cd /var/tmp/ || exit 1

# delete the working folder if it already exists
rm -rf speedtrack-full-stack
git clone https://github.com/gmurambadoro/speedtrack-full-stack.git speedtrack-full-stack
cd speedtrack-full-stack || exit 1
echo
echo ".env" => BEFORE
cat .env
echo
echo "REACT_APP_API_BASE_URL=${BACKEND_URL}" > .env
echo
echo echo ".env" => AFTER
cat .env
echo

echo "!!=== BUILDING THE FRONTEND ===!!"
echo

npm install
npm run build
sudo rsync -avzhr build/ "${WEB_DIR}/${FRONTEND_DIR}/" || exit 1

cd backend || exit 1

echo
echo
echo "!!=== BUILDING THE BACKEND ===!!"
echo
npm install
cd ../
sudo rsync -avzhr backend/ "${WEB_DIR}/${BACKEND_DIR}/" || exit 1

echo
echo [OK] Build Successful.
echo

exit 0