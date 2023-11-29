# Hyperlane relayer deployment steps

Note: You don't need to deploy hyperlane relayer if you are using standard chain

```
hyperlane config create chain
```

```
hyperlane config create multisig
 hyperlane deploy core \
    --targets gbtestnet,goerli \
    --chains $CHAIN_CONFIG_FILE \
    --artifacts $PREDEPLOYED_ARTIFACT_FILE \
    --ism $MULTISIG_CONFIG_FILE \
    --out $OUT_DIR \
    --key 0xf7ade4b728583c9d446f3b80302155f1efe25643edbf373bbe7e689339569dbd
```

```
hyperlane deploy kurtosis-agents
```

```
hyperlane send message \
--origin goerli \
--destination gbtestnet \
--core ./artifacts/core-deployment-2023-11-18-10-32-33.json \
--key 0x..
```
