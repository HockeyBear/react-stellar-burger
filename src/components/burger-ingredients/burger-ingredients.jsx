import React, { useState, useRef, useMemo, useContext } from "react";
import ingStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
// import ingredientPropType from '../../utils/prop-types';
// import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Ingredient from "./ingredient/ingredient";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { GET_CURRENT_INGREDIENT, MODAL_OPEN, MODAL_OPEN_INGREDIENT, MODAL_CLOSE_INGREDIENT, DELETE_CURRENT_INGREDIENT } from "../../services/actions";
import { ConstructorContext, IngredientsContext, BunContext } from "../../services/ComponentContext";
import { BUN, SAUCE, FILLING } from "../../utils/constants";
import { renderedIngredientData } from "../../services/ingredients/ingredients-selectors";

const Component = () => {
  const { ref, inView, entry } = useInView({
    threshold: 1,
  })
}

const BurgerIngredients = () => {

  const Tabs = useMemo(() => {
    return {
      BUN: 'bun',
      SAUCE:'sauce',
      FILLING: 'main'
    }
  }, []);

  const [current, setCurrent] = useState(Tabs.BUN);
  const dispatch = useDispatch();

  const [currentItem, setCurrentItem] = useState(false)

  const data = useSelector(renderedIngredientData);
  console.log(data)
  // const modalIngredient = useSelector(state => state.modalInfoIngredient.currentIngredient);
  // const { constructorBurgers, setConstructorBurgers } = useContext(ConstructorContext);
  // const { consturctorBun, setConstructorBun } = useContext(BunContext);

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
    return data.filter(item => item.type === 'bun');
  }, [data]);
  const sauce = useMemo(() => {
    return data.filter(item => item.type === 'sauce');
  }, [data]);
  const filling = useMemo(() => {
    return data.filter(item => item.type === 'main');
  }, [data]);

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
            <h2 className="text text_type_main-medium" ref={refIng[BUN]}>
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
            <h2 className="text text_type_main-medium" ref={refIng[SAUCE]}>
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
            <h2 className="text text_type_main-medium" ref={refIng['filling']}>
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
      </section>
      {currentItem && (
        <Modal closeModal={() => setCurrentItem(false)} title='Детали Ингредиента'>
          <IngredientDetails ingredient={currentItem} />
        </Modal>
      )}
    </>
  )
}

// BurgerIngredients.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropType).isRequired
// };

export default BurgerIngredients;