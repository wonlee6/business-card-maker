import React from 'react';
import CardAddEditForm from '../card_add_form/cardAddEditForm';
import CardEditForm from '../card_edit_form/cardEditForm';
import styles from './editor.module.css';

const Editor = ({ cards, addCard, updateCard, deleteCard }) => (
  <section className={styles.editor}>
    <h1 className={styles.title}>Card Maker</h1>
    {/* object key로 데이터를 가져오는 식으로 변경 */}
    {Object.keys(cards).map((key) => (
      <CardEditForm
        key={key}
        card={cards[key]}
        updateCard={updateCard}
        deleteCard={deleteCard}
      />
    ))}
    <CardAddEditForm onAdd={addCard} />
  </section>
);

export default Editor;
