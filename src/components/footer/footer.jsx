import React, { memo } from 'react';
import styles from './footer.module.css';

const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <p className={styles.title}>2021 Lee SangWon - All rights reserved</p>
    </footer>
  );
});

export default Footer;
