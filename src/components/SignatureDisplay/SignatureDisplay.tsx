'use client';

import styles from './SignatureDisplay.module.css';

interface SignatureDisplayProps {
   signature: string;
}

export default function SignatureDisplay({ signature }: SignatureDisplayProps) {
   return (
      <div className={styles.signatureContainer}>
         <h3>Signature:</h3>
         <p className={styles.signature}>{signature}</p>
      </div>
   );
}
