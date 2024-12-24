import { ChainId } from '@pancakeswap/chains'

export const PANCAKE_EXTENDED = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'

// const COINGECKO = 'https://tokens.pancakeswap.finance/coingecko.json'
// export const PANCAKE_ETH_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-eth-default.json'
// export const PANCAKE_ZKSYNC_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-zksync-default.json'
// export const PANCAKE_POLYGON_ZKEVM_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-polygon-zkevm-default.json'
// export const PANCAKE_ARB_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-arbitrum-default.json'
// export const PANCAKE_LINEA_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-linea-default.json'
// export const PANCAKE_BASE_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-base-default.json'
// export const PANCAKE_OPBNB_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-opbnb-default.json'

// export const PANCAKE_ETH_MM = 'https://tokens.pancakeswap.finance/pancakeswap-eth-mm.json'
// export const PANCAKE_BSC_MM = 'https://tokens.pancakeswap.finance/pancakeswap-bnb-mm.json'
// export const PANCAKE_ARB_MM = 'https://tokens.pancakeswap.finance/pancakeswap-arb-mm.json'

// const COINGECKO_ETH = 'https://tokens.coingecko.com/uniswap/all.json'
// export const CMC = 'https://tokens.pancakeswap.finance/cmc.json' // not updated for a while

const ETH_URLS: string[] = []
const BSC_URLS: string[] = []
const POLYGON_ZKEVM_URLS: string[] = []
const ARBITRUM_URLS: string[] = []
const LINEA_URLS: string[] = []
const ZKSYNC_URLS: string[] = []
const BASE_URLS: string[] = []
const OPBNB_URLS: string[] = []

// List of official tokens list
export const OFFICIAL_LISTS: string[] = []

export const UNSUPPORTED_LIST_URLS: string[] = []
export const WARNING_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  ...BSC_URLS,
  ...ETH_URLS,
  ...ZKSYNC_URLS,
  ...LINEA_URLS,
  ...POLYGON_ZKEVM_URLS,
  ...BASE_URLS,
  ...ARBITRUM_URLS,
  ...OPBNB_URLS,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
  ...WARNING_LIST_URLS,
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [
  PANCAKE_EXTENDED,
  // PANCAKE_ETH_DEFAULT,
  // PANCAKE_ETH_MM,
  // PANCAKE_BSC_MM,
  // PANCAKE_ARB_MM,
  // PANCAKE_POLYGON_ZKEVM_DEFAULT,
  // PANCAKE_ZKSYNC_DEFAULT,
  // PANCAKE_ARB_DEFAULT,
  // PANCAKE_LINEA_DEFAULT,
  // PANCAKE_BASE_DEFAULT,
  // PANCAKE_OPBNB_DEFAULT,
  // OP_SUPER_CHAIN_URL,
  // COINGECKO,
  // COINGECKO_ETH,
]

export const MULTI_CHAIN_LIST_URLS: { [chainId: number]: string[] } = {
  [ChainId.BSC]: BSC_URLS,
  [ChainId.ETHEREUM]: ETH_URLS,
  [ChainId.ZKSYNC]: ZKSYNC_URLS,
  [ChainId.POLYGON_ZKEVM]: POLYGON_ZKEVM_URLS,
  [ChainId.ARBITRUM_ONE]: ARBITRUM_URLS,
  [ChainId.LINEA]: LINEA_URLS,
  [ChainId.BASE]: BASE_URLS,
  [ChainId.OPBNB]: OPBNB_URLS,
}
