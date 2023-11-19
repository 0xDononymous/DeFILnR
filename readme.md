# Domain Expansion - ETHGlobal Istanbul 2023

## About

Today, in DeFi, we always share the same leverage limitation with other users no matter how good my credibility is. This is because most DeFi protocols can only assess risk based on the chain's current state. We believe that mature users should enjoy a higher flexibility with leverage. With Domain Expansion, users will be segmented, and experienced users get better deals on various DeFi protocols.

To build an efficient tier segmentation system, we use The Graph to provide user's on-chain credits and generate the proof based on the credibility criteria. The proof generated on Axiom will be the reference of the credit account creation. To connect Axiom and Gearbox V3 testnet, the proof will be broadcasted via Hyperlane. Lastly, different segmented users can enjoy corresponding leverage flexibility on Gearbox.

### Links

- [Presentation](https://pitch.com/v/DeFi-LR-System-axtn66)
- [Video (Demo starts at 3:18)](https://www.youtube.com/watch?v=MqjX1VSq-GY)
- [Membership on Goerli](https://goerli.etherscan.io/address/0x6d191847d3d171a8cb1b11aa047cec3a78e9806e)

## Tech Stack

### The Graph

Subgraph enables us to find a user's history of interacting with Gearbox's CredisFacade in our project. It acts as a critical component for querying transactions in the frontend quickly and reliably.

Using a Subgraph for an Axiom Query. This project utilized a subgraph of ETH Goerli transactions, specifically from a CreditFacade containing previously occurred transactions. The subgraph extracts individual transactions from a specific user and consolidates transactions from the CreditFacade. It then analyzes these transactions to assess the user's credibility.

Here is the [subgraph](https://thegraph.com/studio/subgraph/gearbox-creditfacade/playground) used in this project.

Here is the part where The Graph is [used](https://github.com/0xDononymous/DefiLnR/blob/main/webapp/src/lib/query.ts)

### Axiom

Axiom Circuit makes computing complicated on-chain transactions and verifying a user's on-chain history credibility possible in our project.

Axiom Circuit users demonstrate their experience with Gearbox. The more an user has used Gearbox, the greater their understanding of a leverage Defi product. Therefore, within the circuit, we will utilize a for loop to determine the number of input transactions that prove the opening of a credit account at a specific address.

Here is the [circuit](https://repl.axiom.xyz?gist=a42397437fd3bff0b2fc8bc0bd778d4c) used in this project.

Here is the part where Axiom is [used](https://github.com/0xDononymous/DefiLnR/blob/main/contracts/src/Membership.sol#L12)

### Hyperlane

Leveraged the power of Hyperlane to enable our user to bring their previously credibility history with them to a destination chain.

We deployed the Hyperlane relayer and implement the contracts to send and receive message from Hyperlane mailbox. Hyperlane enable us to bridge the user’s segmentation generated from the proof on goerli onto a private mainnet fork where Gearbox v3 is being deployed.

Here is the part where Hyperlane is [used](https://github.com/0xDononymous/DefiLnR/blob/main/contracts/src/Membership.sol)

### Gearbox

Automated and diverse user categorization in Gearbox boosts protocol security and user experience, appealing to both seasoned and new users, while its efficiency significantly cuts operational costs.

We utilized openCreditAccount to open an account. It illustrates the possibility of adding an extra Gater contract and imposes a further limitation on a diverse portfolio of users.

Here is the part where Gearbox is [used](https://github.com/0xDononymous/DefiLnR/blob/19cf18f2162908c3f035ff66aebd9fb250ce74cd/contracts/src/Gater.sol#L52)
