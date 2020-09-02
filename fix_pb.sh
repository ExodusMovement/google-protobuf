#!/bin/bash

replace \
  "var global = Function('return this')();" \
  "const localProtoScope = {}; const { proto } = localProtoScope;" \
  -- "$@" > /dev/null
if grep -qrE "[^a-zA-Z]Function\(" "$@"; then
  echo "Error: Function( still present"
  exit -1
fi

replace \
  ", global)" \
  ", localProtoScope)" \
  -- "$@" > /dev/null
if grep -qrE '(^|[^a-zA-Z."])global([^a-zA-Z]|$)' "$@"; then
  echo "Error: global still present"
  exit -1
fi

replace \
  "goog.exportSymbol" \
  "// symbol export removed: (" \
  -- "$@" > /dev/null
if grep -qrE "exportSymbol" "$@"; then
  echo "Error: exportSymbol( still present"
  exit -1
fi

# Extra checks

if grep -qrE "[^a-zA-Z]eval\(" "$@"; then
  echo "Error: eval( is present"
  exit -1
fi

if grep -qrEi "[^ae]script" "$@"; then
  echo "Error: 'script' is present"
  exit -1
fi
