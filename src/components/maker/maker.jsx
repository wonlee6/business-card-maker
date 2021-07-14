import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService }) => {
  // object key를 이용해서 데이터를 가져오는 방식으로 변경
  const [cards, setCards] = useState({
    1: {
      id: '1',
      name: 'Ellie',
      theme: 'dark',
      company: 'dream coding',
      title: 'Software Engineer',
      emaile: 'ellie@gmail.com',
      message: 'go for it',
      fileName: 'ellie',
      fileURL: null,
    },
    2: {
      id: '2',
      name: 'Ellie',
      theme: 'light',
      company: 'dream coding',
      title: 'Software Engineer',
      emaile: 'ellie@gmail.com',
      message: 'go for it',
      fileName: 'ellie',
      fileURL: null,
    },
    3: {
      id: '3',
      name: 'Ellie',
      theme: 'colorful',
      company: 'dream coding',
      title: 'Software Engineer',
      emaile: 'ellie@gmail.com',
      message: 'go for it',
      fileName: 'ellie',
      fileURL: null,
    },
  });
  const history = useHistory();

  // auth_service 에서 logout 처리 함
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push('/');
      }
    });
  });
  // const addCard = (card) => {
  //   const updated = [...cards, card];
  //   setCards(updated);
  // };
  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
  };
  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
