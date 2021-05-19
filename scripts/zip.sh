#! /bin/bash
rm extension.zip
rm -rf to_publish
mkdir to_publish

cp manifest.json to_publish
cp -R dist to_publish
cp -R icons to_publish
cp -R _locales to_publish

cd to_publish

rm dist/public/manifest.json
zip -r ../extension.zip .

cd -

du -sh extension.zip