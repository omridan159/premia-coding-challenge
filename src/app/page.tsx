'use client';

import { useEffect, useState } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';

import ActionButton from '../components/ActionButton/ActionButton';
import SignatureDisplay from '../components/SignatureDisplay/SignatureDisplay';
import WalletInfo from '../components/WalletInfo/WalletInfo';

export default function HomePage() {
   const { address, isConnected } = useAccount();
   const { signMessageAsync } = useSignMessage();
   const [signature, setSignature] = useState<string | null>(null);

   useEffect(() => {
      if (isConnected) {
         setSignature(null);
      }
   }, [isConnected]);

   const handleSign = async () => {
      try {
         const signedMessage = await signMessageAsync({ message: 'Hello World!' });
         setSignature(signedMessage);
      } catch (error) {
         console.error('Error signing message:', error);
      }
   };

   return (
      <div
         className="page"
         style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}
      >
         <main
            className="main"
            style={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: '1rem',
               width: '100%',
               maxWidth: '500px'
            }}
         >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <ConnectButton />
            </div>

            {isConnected && (
               <>
                  <WalletInfo address={address} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                     <ActionButton
                        label="Sign Message"
                        onClick={handleSign}
                        backgroundColor="#4CAF50"
                        hoverColor="#45a049"
                     />
                  </div>
                  {signature && <SignatureDisplay signature={signature} />}
               </>
            )}
         </main>
      </div>
   );
}
