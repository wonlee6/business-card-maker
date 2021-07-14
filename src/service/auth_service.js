import { firebaseAuth, githubProvider, googleProvider } from './firebase';

// auth 관련 역할만 하는 클래스
class AuthService {
  login(providerName) {
    // google var provider = new firebase.auth.GoogleAuthProvider();
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return googleProvider;
      case 'Github':
        return githubProvider;
      default:
        throw new Error(`not supported provider : ${providerName}`);
    }
  }
}

export default AuthService;
