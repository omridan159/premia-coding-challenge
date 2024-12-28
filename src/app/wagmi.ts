'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { coinbaseWallet, metaMaskWallet, rainbowWallet } from '@rainbow-me/rainbowkit/wallets';
import type { Transport } from 'viem';
import { createConfig, http } from 'wagmi';
import {
   arbitrum,
   arbitrumGoerli,
   base,
   baseGoerli,
   bsc,
   bscTestnet,
   linea,
   lineaTestnet,
   mainnet,
   optimism,
   optimismGoerli,
   polygon,
   polygonMumbai,
   sepolia,
   zkSync,
   zkSyncSepoliaTestnet
} from 'wagmi/chains';

const connectors = connectorsForWallets(
   [
      {
         groupName: 'Recommended',
         wallets: [metaMaskWallet, rainbowWallet, coinbaseWallet]
      }
   ],
   { appName: 'NextJS-Web3-App', projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID' }
);

const transports: Record<number, Transport> = {
   [mainnet.id]: http(),
   [sepolia.id]: http(),
   [polygon.id]: http(),
   [polygonMumbai.id]: http(),
   [optimism.id]: http(),
   [optimismGoerli.id]: http(),
   [arbitrum.id]: http(),
   [arbitrumGoerli.id]: http(),
   [zkSync.id]: http(),
   [zkSyncSepoliaTestnet.id]: http(),
   [linea.id]: http(),
   [lineaTestnet.id]: http(),
   [base.id]: http(),
   [baseGoerli.id]: http(),
   [bsc.id]: http(),
   [bscTestnet.id]: http()
};
export const wagmiConfig = createConfig({
   chains: [
      mainnet,
      sepolia,
      polygon,
      polygonMumbai,
      optimism,
      optimismGoerli,
      arbitrum,
      arbitrumGoerli,
      zkSync,
      base,
      baseGoerli,
      bsc,
      bscTestnet
   ],
   connectors,
   transports,
   ssr: true
});
