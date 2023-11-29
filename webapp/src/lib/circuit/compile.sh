#!/bin/sh

source .env

ALCHEMY_KEY=${NEXT_PUBLIC_ALCHEMY_KEY}
URL="https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}"

npx axiom compile ./src/lib/circuit/circuit.ts -o ./src/lib/circuit/build.json -p $URL