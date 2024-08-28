#!/bin/sh
rimraf bundle
tsc
tsc-alias
node --enable-source-maps --inspect bundle/index.js
