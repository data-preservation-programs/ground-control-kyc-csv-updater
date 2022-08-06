#! /bin/bash

set -e

./build.sh

T=test-output
rm -rf $T
mkdir $T

CODE=dist/index.js

node $CODE testdata/test-results.json $T/sp-list.csv $T/organizations.csv $T/processed.csv

cp $T/organizations.csv $T/organizations-2.csv
cp $T/sp-list.csv $T/sp-list-2.csv
cp $T/processed.csv $T/processed-2.csv
node $CODE testdata/test-results-2.json $T/sp-list-2.csv $T/organizations-2.csv $T/processed-2.csv

cp $T/organizations-2.csv $T/organizations-3.csv
cp $T/sp-list-2.csv $T/sp-list-3.csv
cp $T/processed-2.csv $T/processed-3.csv
node $CODE testdata/test-results-3.json $T/sp-list-3.csv $T/organizations-3.csv $T/processed-3.csv

# Trim timestamps so we can diff

mkdir $T/tmp
for f in `cd $T; ls organizations*.csv sp-list*.csv`; do
  #echo $f
  cat $T/$f > $T/tmp/$f
done

for f in `cd $T; ls processed*.csv`; do
  #echo $f
  cat $T/$f | cut -c26- > $T/tmp/$f
done

mkdir $T/tmp-expected
for f in `cd test-expected; ls organizations*.csv sp-list*.csv`; do
  #echo test-expected/$f
  cat test-expected/$f > $T/tmp-expected/$f
done

for f in `cd test-expected; ls processed*.csv`; do
  #echo text-expected/$f
  cat test-expected/$f | cut -c26- > $T/tmp-expected/$f
done

# Compare output vs expected

echo Diffing...
diff -urN test-output/tmp-expected/ test-output/tmp
echo Done testing.

