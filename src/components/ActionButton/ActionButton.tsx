'use client';

import styles from './ActionButton.module.css';

interface ActionButtonProps {
   label: string;
   onClick: () => void;
   backgroundColor: string;
   hoverColor: string;
}

export default function ActionButton({ label, onClick, backgroundColor, hoverColor }: ActionButtonProps) {
   return (
      <button
         className={styles.button}
         style={{ backgroundColor }}
         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = backgroundColor)}
         onClick={onClick}
      >
         {label}
      </button>
   );
}
