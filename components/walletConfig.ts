// components/walletConfig.ts
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

// 1. Project ID from Web3Modal dashboard
const projectId = 'f08c4bbfc7b776ede46ee721df339102'

// 2. Chains
const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
)

// 3. Wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
})

// 4. Web3Modal config
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'dark',
  themeColor: 'pink',
  themeBackground: 'themeColor'
})
