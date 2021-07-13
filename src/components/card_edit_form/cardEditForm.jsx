import React from 'react';
import Button from '../button/button';
import ImageFileInput from '../image_file_input/imageFileInput';
import styles from './cardEditForm.module.css';
const CardEditForm = ({ card, updateCard, deleteCard }) => {
  const { id, name, theme, company, title, email, message, fileName, fileURL } =
    card;

  const onChange = (event) => {
    if (event.currentTarget === null) return;
    event.preventDefault(); // 브라우저 이벤트 방지
    updateCard({
      ...card,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const onSubmit = () => {
    deleteCard(card);
  };
  return (
    <form className={styles.form}>
      <input
        onChange={onChange}
        className={styles.input}
        type='text'
        name='name'
        value={name}
      />
      <input
        className={styles.input}
        type='text'
        name='company'
        value={company}
        onChange={onChange}
      />
      <select className={styles.select} name='theme' value={theme}>
        <option value='light'>light</option>
        <option value='dark'>dark</option>
        <option value='colorful'>colorful</option>
      </select>
      <input className={styles.input} type='text' name='title' value={title} />
      <input className={styles.input} type='text' name='emaile' value={email} />
      <textarea
        className={styles.textarea}
        name='message'
        value={message}
      ></textarea>
      <div className={styles.fileInput}>
        <ImageFileInput />
      </div>
      <Button name='Delete' onClick={onSubmit} />
    </form>
  );
};

export default CardEditForm;
