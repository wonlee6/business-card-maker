# Vaccine Card Maker Project_Plan

[homepage](https://60f9641d5c2b28d782ee3da6--objective-rosalind-b76de9.netlify.app/)

> 기술 스택 : react, react-router, firebase, cloudinary(imageUploader)

### Login 화면

![login](/public/images/8.png)

### main 화면

![main](/public/images/9.png)

### component

![main](/public/images/10.png)

## react-router

```jsx
const App = ({ FileInput, authService, cardRepository }) => {
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
        </Switch>
      </Router>
    </div>
  );
};
```

`react-router` 통해 경로 지정  
`'/'` 에는 로그인 페이지를, `'/maker'`에는 카드를 만들 수 있는 페이지를 보여준다.

기본적으로 fireBase라는 클라우드 데이터베이스를 이용하기에, firebase로 작업하는 부분은 service에 따로 분리하여 작업 한다.

## service에는 REST API(auth, cardRepository, imageUploader, firebase)작업하는 코드들이 있다.

### auth_service

auth에는 기본적으로 로그인, 로그아웃 회원 정보 관련 작업을 하는 로직이 있으며,

```js
// auth_service.js
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
```

Google or Github 인지 확인한 후, firebase의 `signInWithPopup(provider)` 함수를 통해 로그인하게 된다.

```js
class CardRepository {
  syncCards(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }
  saveCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
  }
  removeCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
  }
}
```

`card_repository.js`에는 firebase에 있는 유저의 data 레퍼런스를 가지고 오는 로직이 있다.

### image_uploader.js

cloudinary API 통해 image를 업로드 하는 로직이 있다.

```js
class ImageUploader {
  async upload(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'docs_upload_example_us_preset');
    const result = await fetch(
      'https://api.cloudinary.com/v1_1/demo/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    return await result.json();
  }
}
```

각각의 역할을 하는 service들을 index.js에 의존성 주입을 하여 props로 전달한다.

```js
const authService = new AuthService();
const imageUploader = new ImageUploader();
const cardRepository = new CardRepository();

const FileInput = memo((props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
));

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      FileInput={FileInput}
      cardRepository={cardRepository}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
```

이렇게 props로 전달 받은 데이터를 가지고

```jsx
const Login = ({ authService }) => {
  const history = useHistory();
  const goToMaker = (userId) => {
    history.push({
      pathname: '/maker',
      state: { id: userId },
    });
  };
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then((data) => goToMaker(data.user.uid));
  };

  // 사용자의 정보를 가지고 있을 경우, 로그인 페이지가 아닌 페이지로 이동
  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToMaker(user.id);
    });
  });
```

로그인을 하게 된다.

FormData들을 실시간으로 firebase와 주고 받는데,
card 안에 data들을 넣고,

```js
// maker.jsx
  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };


// card_repository.js
saveCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
}
removeCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
}
```

`userId`와 `card` 가 `saveCard()` 함수의 인자로 받아와 `firebase.set()` 또는 `remove()` 함수를 실행하게 되어 저장하게 된다. ( `set() remove()`는 firebase에서 제공하는 함수이다.)

### image_uploader

```jsx
// imagesFileInput.jsx
const ImageFileInput = memo(({ imageUploader, name, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };
  const onChange = async (event) => {
    console.log(event.target.files[0]);
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setLoading(false);

    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };
  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type='file'
        accept='image/*'
        name='file'
        onChange={onChange}
      />
      {!loading && (
        <button
          className={`${styles.button} ${name ? styles.pink : styles.grey}`}
          onClick={onButtonClick}
        >
          {name || 'no file'}
        </button>
      )}

      {loading && <div className={styles.loading}></div>}
    </div>
  );
});
```

imagesFileInput.jsx 컴포넌트에서는 UI작업을 하고,

```jsx
// cardEditForm.jsx
<FileInput name={fileName} onFileChange={onFileChange} />
```

index.js에서 props로 전달한 FileInput을 통해 작업을 수행한다.

# Netlify 통한 배포

### [homepage](https://create-react-app.dev/) 에 react를 배포하는 다양한 방법이 있다

이번 프로젝트는 netlify 통해 배포를 함

<!-- ![Netlify](/public/images/11.png) -->

1. yarn build 실행을 한다.
2. netlify 설치 진행 후 deploy 입력

```
npm install netlify-cli -g // 1
netlify deploy // 2
```

3. 실행 한 후 github 권한 등록 후, 콘솔창에서 create를 선택(키보드 화살표로 움직여 엔터)

4. Team Name, Site Name(선택) 입력 후, (Publish directory) build 입력 후 엔터

5. admin URL 클릭해 확인

### 예외

1. firebase 경우 - firebase의 Authentication에서 admin URL을 등록해주어야 함
2. package.json에 있는 homepage 주소가 있을 경우, 삭제 후 다시 netlify deploy 진행
