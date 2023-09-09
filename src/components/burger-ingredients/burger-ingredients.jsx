import {React,  useState } from "react";
import ingStyles from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from 'prop-types';

function Ingredient (data) {
  return(
    <div className={ingStyles.ingredient_card}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={data.image} alt={data.name} />
      <div>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </div>
  )
}

function BurgerIngredients(props) {
  const [current, setCurrent] = useState('bun');

  const handleClickTab = (evt) => {
    setCurrent(evt)
  }

  const [...data] = props.data;
  const bun = data.filter(item => item.type === 'bun');
  const sauce = data.filter(item => item.type === 'sauce');
  const filling = data.filter(item => item.type === 'main');

  return (
    <section className={ingStyles.section}>
      <h2 className="text text_type_main-large pt-10">Соберите бургер</h2>
      <div className={`${ingStyles.tab} pt-5 pb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={handleClickTab}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={handleClickTab}>Соусы</Tab>
        <Tab value="filling" active={current === 'filling'} onClick={handleClickTab}>Начинки</Tab>
      </div>
      <div className={ingStyles.ingredients}>
        <div className={`${ingStyles.ingredient} custom-scroll`}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={`${ingStyles.ingredient_con} pt-6 pl-4 pb-10`}>
            {bun.map(item => <Ingredient {...item} />)}
          </div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${ingStyles.ingredient_con} pt-6 pl-4 pb-10`}>
            {sauce.map(item => <Ingredient {...item} />)}
          </div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${ingStyles.ingredient_con} pt-6 pl-4 pb-10`}>
            {filling.map(item => <Ingredient {...item} />)} 
          </div>
        </div>
      </div>
    </section>
  )
}

Ingredient.propTypes = {
  item: ingredientPropType
};
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType)
};

export default BurgerIngredients;