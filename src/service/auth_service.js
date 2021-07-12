import firebase from 'firebase';
import firebaseApp from './firebase';

// auth 관련 역할만 하는 클래스
class AuthService {
  login(providerName) {
    // google var provider = new firebase.auth.GoogleAuthProvider();
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }
}

export default AuthService;
