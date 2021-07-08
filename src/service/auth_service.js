import firebase from 'firebase';

// auth 관련 역할만 하는 클래스
class AuthService {
  login(providerName) {
    // google var provider = new firebase.auth.GoogleAuthProvider();
    const authProvider = new firebase.auth[`${providerName}AuthProvider}`]();
    return firebase.auth().signInWithPopup(authProvider);
  }
}

export default AuthService;
