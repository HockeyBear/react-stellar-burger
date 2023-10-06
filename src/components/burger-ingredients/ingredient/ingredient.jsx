import ingredientStyles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorContext, BunContext } from '../../../services/ComponentContext';
import React, { useContext } from 'react';
import { BUN } from '../../../utils/constants';

const Ingredient = ({ item, onClick }) => {
  const { constructorBurgers, setConstructorBurgers } = useContext(ConstructorContext);
  const { consturctorBun, setConstructorBun } = useContext(BunContext);

  const clickIngredient = (item) => {
    if (item.type === BUN) {
      setConstructorBun(item);
    } else {
      setConstructorBurgers([...constructorBurgers, item]);
    }
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
    </div>
  );
};

export default Ingredient;