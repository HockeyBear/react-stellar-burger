import ingredientStyles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ item, onClick }) => {
  return (
    <div className={ingredientStyles.card} onClick={() => onClick(item)}>
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