import React from 'react';
import Login from './components/login/login';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Maker from './components/maker/maker';
import Corona from './components/corona/corona';

// exact = 주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여준다.
const App = ({ FileInput, authService, cardRepository, corona }) => {
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login authService={authService} />;
          </Route>
          <Route exact path='/maker'>
            <Maker
              FileInput={FileInput}
              authService={authService}
              cardRepository={cardRepository}
            />
          </Route>
          <Route exact path='/corona'>
            <Corona authService={authService} corona={corona} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
