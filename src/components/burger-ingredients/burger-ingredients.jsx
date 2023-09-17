import { useState, useRef, useMemo } from "react";
import ingStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../utils/prop-types';
import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Ingredient from "./ingredient/ingredient";

const BurgerIngredients = (ingredient) => {
  const [current, setCurrent] = useState('bun');
  const [currentItem, setCurrentItem] = useState(null)

  const refIng = {
    'bun': useRef(null),
    'sauce': useRef(null),
    'filling': useRef(null)
  };

  const handleClickTab = (tab) => {
    setCurrent(tab);
    if (refIng[tab].current) {
      refIng[tab].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const bun = useMemo(() => {
    return ingredient.data.filter(item => item.type === 'bun');
  }, [ingredient]);
  const sauce = useMemo(() => {
    return ingredient.data.filter(item => item.type === 'sauce');
  }, [ingredient]);
  const filling = useMemo(() => {
    return ingredient.data.filter(item => item.type === 'main');
  }, [ingredient]);

  return (
    <>
      <section className={ingStyles.section}>
        <h2 className="text text_type_main-large pt-10">Соберите бургер</h2>
        <div className={`${ingStyles.tab} pt-5 pb-10`}>
        <Tab 
        value="bun" 
        active={current === "bun"} 
        onClick={() => handleClickTab('bun')}
        >
          Булки
        </Tab>
        <Tab 
        value="sauce" 
        active={current === "sauce"} 
        onClick={() => handleClickTab('sauce')}
        >
          Соусы
        </Tab>
        <Tab 
        value="filling" 
        active={current === "filling"} 
        onClick={() => handleClickTab('filling')}
        >
          Начинки
        </Tab>
        </div>
        <div className={ingStyles.ingredients}>
          <div className={`${ingStyles.ingredient} custom-scroll`}>
            <h2 className="text text_type_main-medium" ref={refIng["bun"]}>
              Булки
            </h2>
            <div className={`${ingStyles.ingredient_con} pt-6 pl-4 pb-10`}>
              {bun.map((item) => (
                <Ingredient
                  item={item}
                  key={item._id}
                  onClick={setCurrentItem}
                />
              ))}
            </div>
            <h2 className="text text_type_main-medium" ref={refIng["sauce"]}>
              Соусы
            </h2>
            <div className={`${ingStyles.ingredient_con} pt-6 pl-4 pb-10`}>
              {sauce.map((item) => (
                <Ingredient
                  item={item}
                  key={item._id}
                  onClick={setCurrentItem}
                />
              ))}
            </div>
            <h2 className="text text_type_main-medium" ref={refIng["filling"]}>
              Начинки
            </h2>
            <div className={`${ingStyles.ingredient_con} pt-6 pl-4 pb-10`}>
              {filling.map((item) => (
                <Ingredient
                  item={item}
                  key={item._id}
                  onClick={setCurrentItem}
                />
              ))}
            </div>
          </div>
        </div>
        {/* {modal && (
          <Modal closeModal={setModal} title='Детали игредиента'>
            <IngredientDetails {...cardModal} />
          </Modal>
        )} */}
      </section>
      {currentItem && (
        <Modal closeModal={() => setCurrentItem(null)} title='Детали Ингредиента'>
          <IngredientDetails ingredient={currentItem} />
        </Modal>
      )}
    </>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default BurgerIngredients;