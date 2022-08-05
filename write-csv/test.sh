#! /bin/bash

./build.sh

rm -f *.csv

node dist/index.js testdata/test-results.json sp-list.csv organizations.csv processed.csv

cp organizations.csv organizations-2.csv
cp sp-list.csv sp-list-2.csv
cp processed.csv processed-2.csv
node dist/index.js testdata/test-results-2.json sp-list-2.csv organizations-2.csv processed-2.csv

cp organizations-2.csv organizations-3.csv
cp sp-list-2.csv sp-list-3.csv
cp processed-2.csv processed-3.csv
node dist/index.js testdata/test-results-3.json sp-list-3.csv organizations-3.csv processed-3.csv



