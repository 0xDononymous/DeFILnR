#!/bin/sh

source .env.local

ALCHEMY_KEY=${NEXT_PUBLIC_ALCHEMY_KEY}
URL="https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}"

npx axiom compile ./src/components/axiom/circuit/circuit.ts -o ./src/components/axiom/circuit/build.json -p $URL