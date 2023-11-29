source .env
forge script script/TierGater.s.sol:TierGaterScript --private-key $PRIVATE_KEY --broadcast --rpc-url $PROVIDER_URI_BASEGOERLI -vvvv --verify --etherscan-api-key $ETHERSCAN_API_KEY
cp out/TierGater.sol/TierGater.json ../webapp/src/lib/abi/TierGater.json