import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/imageFileInput';
import CardRepository from './service/card_repository';
const authService = new AuthService();
const imageUploader = new ImageUploader();
const cardRepository = new CardRepository();

// 컴포넌트 자체를 전달하면 확장성이 떨어지기에 밑에처럼 prop으로 전달
const FileInput = (props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
);

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
