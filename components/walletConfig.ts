// components/walletConfig.ts

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { createConfig } from "wagmi";

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: "Cherzi Arena",
    projectId: "f08c4bbfc7b776ede46ee721df339102",
    chains: [mainnet, polygon, optimism, arbitrum, base, zora],
    ssr: true,
  })
);
