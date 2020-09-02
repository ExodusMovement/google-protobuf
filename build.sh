#!/bin/bash

v="3.13.0"

rm -rf package *tgz
npm pack "google-protobuf@$v"
tar -xf "google-protobuf-$v.tgz"

rm -rf package/google/protobuf/compiler
rm package/google/protobuf/{api,duration,empty,field_mask,struct,timestamp}_pb.js
prettier --write package/*.js package/*/*/*.js

replace \
  "var global = Function('return this')();" \
  "const localProtoScope = {}; const { proto } = localProtoScope;" \
  -- package/google/protobuf/*_pb.js > /dev/null

replace \
  "goog.exportSymbol" \
  "// symbol export removed: (" \
  -- package/google/protobuf/*_pb.js > /dev/null

replace \
  ", global)" \
  ", localProtoScope)" \
  -- package/google/protobuf/*_pb.js > /dev/null

cd package && find ../patches -type f | sort | xargs -n1 patch -i && cd -

cp package.patched.json package/package.json

if grep -qrE "[^a-zA-Z]Function\(" package; then
  echo "Error: Function( still present"
  exit -1
fi

if grep -qrE "[^a-zA-Z]eval\(" package; then
  echo "Error: eval( still present"
  exit -1
fi

if grep -qrE '(^|[^a-zA-Z."])global([^a-zA-Z]|$)' package/google; then
  echo "Error: global still present"
  exit -1
fi

if grep -qrE "exportSymbol" package; then
  echo "Error: exportSymbol( still present"
  exit -1
fi