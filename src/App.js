import React from 'react';
import Login from './components/login/login';
import styles from './App.module.css';

const App = ({ authService }) => {
  return (
    <div className={styles.app}>
      <Login authService={authService} />;
    </div>
  );
};

export default App;
