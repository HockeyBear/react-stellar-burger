import ingredientStyles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorContext, BunContext } from '../../../services/ComponentContext';
import React, { useContext, useState } from 'react';
import { BUN } from '../../../utils/constants';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';

const Ingredient = ({ item, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { constructorBurgers, setConstructorBurgers } = useContext(ConstructorContext);
  const { consturctorBun, setConstructorBun } = useContext(BunContext);

  const clickIngredient = (item) => {
    if (item.type === BUN) {
      setConstructorBun(item);
    } else {
      setConstructorBurgers([...constructorBurgers, item]);
    }
    setIsModalOpen(true);
  }

  return (
    <div className={ingredientStyles.card} onClick={() => clickIngredient(item)}>
      <Counter count={0} size="default" extraClass='m-1' />
      <img src={item.image} alt={item.name} />
      <div>
        <p className={`text text_type_digits-default`}>{item.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`text text_type_main-default`}>{item.name}</p>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)} title='Детали Ингредиента'>
          <IngredientDetails ingredient={item} />
        </Modal>
      )}
    </div>
  );
};

export default Ingredient;
