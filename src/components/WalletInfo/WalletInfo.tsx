'use client';

import type { Address } from 'viem';
import { useBalance } from 'wagmi';

import styles from './WalletInfo.module.css';

interface WalletInfoProps {
   address: Address | undefined;
}

export default function WalletInfo({ address }: WalletInfoProps) {
   const { data: balance } = useBalance({ address });

   return (
      <div className={styles.info}>
         <p>
            Address: <span className={styles.mono}>{address}</span>
         </p>
         <p>
            Balance:{' '}
            <span className={styles.mono}>
               {balance?.value ? (Number(balance.value) / 10 ** 18).toFixed(4) : '0'} {balance?.symbol}
            </span>
         </p>
      </div>
   );
}
