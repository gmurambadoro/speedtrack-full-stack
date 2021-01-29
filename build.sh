#!/usr/bin/env bash

# path to the web directory
# NB: there is no trailing slash (/)
OUTPUT_DIR=/var/tmp/builds/speedtrack/out
WORK_DIR=/var/tmp/builds/speedtrack/in

echo "=== SpeedTrack Build Tool v1.0.0 ==="
echo
echo "USAGE: Replace the placeholders with values for your application"
echo
echo "export BACKEND_DIR=<<dir_name>>"
echo "export FRONTEND_DIR=<<dir_name>>"
echo "export BACKEND_URL=<<http://backend.example.com>>"
echo
echo bash build.sh
echo
echo "++--++-+--++--+-+--++--++-+--"
echo

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

# create installation folders
mkdir -p $OUTPUT_DIR
mkdir -p $WORK_DIR
cd $OUTPUT_DIR || exit 1

echo
echo "!!==== PREPARING TO BUILD YOUR APPLICATION ===!!"
echo
echo "BACKEND_URL: ${BACKEND_URL}"
echo "BACKEND_DIR: ${BACKEND_DIR}"
echo "FRONTEND_DIR: ${FRONTEND_DIR}"
echo
echo "OUTPUT_DIR: ${OUTPUT_DIR}"
echo "WORK_DIR: ${WORK_DIR}"
echo

# attempt to remove existing target directories
rm -rf "$FRONTEND_DIR" "$BACKEND_DIR"

# create target directories
mkdir "$FRONTEND_DIR" "$BACKEND_DIR" || exit 1

# check that the required directories exist and we can access their contents
ls -ah "$FRONTEND_DIR" || exit 1
ls -ah "$BACKEND_DIR" || exit 1

# the tmp directory will be the working folder
cd $WORK_DIR || exit 1

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
rsync -avzhr build/ "${OUTPUT_DIR}/${FRONTEND_DIR}/" || exit 1

cd backend || exit 1

echo
echo
echo "!!=== BUILDING THE BACKEND ===!!"
echo
npm install
cd ../
rsync -avzhr backend/ "${OUTPUT_DIR}/${BACKEND_DIR}/" || exit 1

echo
echo "!!- OUTPUT DIRECTORIES -!!"
echo
echo Frontend: "${OUTPUT_DIR}/${FRONTEND_DIR}"
echo
echo Backend: "${OUTPUT_DIR}/${BACKEND_DIR}"

echo
echo [OK] Build Successful.
echo


exit 0