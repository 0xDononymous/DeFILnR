source .env
forge script script/Gater.s.sol:GaterScript --private-key $PRIVATE_KEY --broadcast --rpc-url $PROVIDER_URI_BASEGOERLI -vvvv
cp out/Gater.sol/Gater.json ../webapp/src/lib/abi/Gater.json