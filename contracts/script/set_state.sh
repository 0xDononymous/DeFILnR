source .env
cast send $MEMBERSHIP_ADDR "setRecipient(address)" $GATER_ADDR --rpc-url $PROVIDER_URI_GOERLI --private-key $PRIVATE_KEY
#cast send $GATER_ADDR "setTrustedSource(address)" $MEMBERSHIP_ADDR --rpc-url $PROVIDER_URI_GBTESTNET --private-key $PRIVATE_KEY
cast send $GATER_ADDR "setTrustedSource(uint32,address)" 5 $MEMBERSHIP_ADDR --rpc-url $PROVIDER_URI_BASEGOERLI --private-key $PRIVATE_KEY