import './App.css'
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { RequestAirDrop } from './RequestAirDrop';
import { ShowBalance } from './ShowBalance';
import { SendToken } from './SendToken';

function App() {

  return (
    <>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        {/* we should pass wallets which doesnt follow standards */}
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div style={{ width: "100vw", display: "flex", justifyContent: "center", }}>
              <WalletMultiButton />
            </div>
            <div style={{ width: "100vw", display: "flex", justifyContent: "center", }}>
              {/* <RequestAirDrop /> */}
              <ShowBalance />
              {/* <SendToken /> */}
            </div>

          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
