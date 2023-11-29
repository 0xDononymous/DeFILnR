# Contracts for AxiomV2 Autonomous Airdrop Example

## Setup

Rename `env.example` to `.env` and fill out the parameters.

## Compile

```bash
forge install
cd lib/core-v3/
yarn install
cd ../..
forge compile
```

## Deploy

1.  Set address in the Membership.s.sol
2.  Run `./script/deploy_goerli.sh` to deploy to Goerli testnet (please ensure you have some Goerli testnet ETH before deploying).
3.  Run `./script/deploy_tiergater_basegoerli.sh` to deploy to basegoerli testnet (please ensure you have some basegoerli testnet ETH before deploying).
4.  Run `./script/set_state.sh` to set the smart contract address states to the deployed address.

## Update smart contract addresses

Update the `.env` file with the deployed address `MEMBERSHIP_ADDR`, `GATER_ADDR`.
Run `./script/set_state.sh` to set the smart contract address states to the deployed address.

# Test

```bash
forge test --fork-url gearbox
```
