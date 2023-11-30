export const Constants = Object.freeze({
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  EXPLORER_BASE_URL: 'https://explorer.axiom.xyz/v2/goerli/query/',
  UNISWAP_UNIV_ROUTER_GOERLI: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD'.toLowerCase(),

  //AUTO_AIRDROP_ADDR: '0xb8249737191E1e2480C5c48CbE36bd47dD7Ece79',

  // Swap (address sender, address recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)
  EVENT_SCHEMA:
    '0xfa2baf5d3eb95569f312f22477b246f9d4c50276f1cb3ded8e1aeadcbc07a763',
  ELIGIBLE_BLOCK_HEIGHT: 9000000,
  GOERLI_MEMBERSHIP_ADDR: '0x574aBF92c19BfA75388d1B1D3a84E1FBb425da48',

  GEARBOX_RPC:
    'https://anvil.gearbox.foundation/forks/bbf427c5-90ba-4dc1-84b2-9296fe1c3f2c',
  manager: '0xf409B587Bd0b9baC4DF791117F0cbdA424c195e1',
  gater: '0xbEBb6c8893C45cAD5636E6ccDAd63243D03c3cdA',
})
