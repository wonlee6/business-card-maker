import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/imageFileInput';
import CardRepository from './service/card_repository';
import Corona from './service/corona_service';

const corona = new Corona(process.env.REACT_APP_CORONA_API_KEY);

const authService = new AuthService();
const imageUploader = new ImageUploader();
const cardRepository = new CardRepository();

// 컴포넌트 자체를 전달하면 확장성이 떨어지기에 밑에처럼 prop으로 전달
const FileInput = memo((props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
));

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      FileInput={FileInput}
      cardRepository={cardRepository}
      corona={corona}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
