export const Constants = Object.freeze({
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  EXPLORER_BASE_URL: "https://explorer.axiom.xyz/v2/goerli/query/",
  UNISWAP_UNIV_ROUTER_GOERLI: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD".toLowerCase(),

  AUTO_AIRDROP_ADDR: "0xb8249737191E1e2480C5c48CbE36bd47dD7Ece79",
  TOKEN_ADDR: "0xc03f02c2A2469eaD19fA7091d1fCe804E03Cf6b3",

  // Swap (address sender, address recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)
  EVENT_SCHEMA:
    "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67",
  ELIGIBLE_BLOCK_HEIGHT: 9000000,
  GOERLI_MEMBERSHIP_ADDR: "0x6d191847d3D171a8CB1b11aA047cEC3a78E9806E",

  GEARBOX_RPC: "https://anvil.gearbox.foundation/forks/bbf427c5-90ba-4dc1-84b2-9296fe1c3f2c",
  manager: "0xf409B587Bd0b9baC4DF791117F0cbdA424c195e1",
  gater: "0x613B9ccaE524510F454549226673abE9404Ad547"
});
