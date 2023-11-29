#!/bin/sh

source .env.local

ALCHEMY_KEY="4ADLfEmrv3lcd99Sz5k7ziCGrEGfhz5U"
URL="https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}"

npx axiom compile ./src/lib/circuit/circuit.ts -o ./src/lib/circuit/build.json -p $URL