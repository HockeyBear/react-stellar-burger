import { useState, useRef, useMemo } from "react";
import ingStyles from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../utils/prop-types';
import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState('bun');
  const [modal, setModal] = useState(false);
  const [cardModal, setCardModal] = useState({})

  const createCart = (item) => {
    const modalOpen = (item) => {
      setCardModal(item);
      setModal(true);
    }

    return(
      <div className={ingStyles.ingredient_card} key={item._id} onClick={() => modalOpen(item)}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={item.image} alt={item.name} />
        <div>
          <p className="text text_type_digits-default">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
    )
  };

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
    return props.data.filter(item => item.type === 'bun');
  }, [props]);
  const sauce = useMemo(() => {
    return props.data.filter(item => item.type === 'sauce');
  }, [props]);
  const filling = useMemo(() => {
    return props.data.filter(item => item.type === 'main');
  }, [props]);

  return (
    <section className={ingStyles.section}>
      <h2 className="text text_type_main-large pt-10">Соберите бургер</h2>
      <div className={`${ingStyles.tab} pt-5 pb-10`}>
      <Tab value="bun" active={current === "bun"} onClick={() => handleClickTab('bun')}>Булки</Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={() => handleClickTab('sauce')}>Соусы</Tab>
      <Tab value="filling" active={current === "filling"} onClick={() => handleClickTab('filling')}>Начинки</Tab>
      </div>
      <div className={ingStyles.ingredients}>
        <div className={`${ingStyles.ingredient} custom-scroll`}>
          <h2 className="text text_type_main-medium" ref={refIng['bun']}>Булки</h2>
          <div className={`${ingStyles.ingredient_con} pt-6 pl-4 pb-10`}>
            {bun.map(item => createCart(item))}
          </div>
          <h2 className="text text_type_main-medium" ref={refIng['sauce']}>Соусы</h2>
          <div className={`${ingStyles.ingredient_con} pt-6 pl-4 pb-10`}>
            {sauce.map(item => createCart(item))}
          </div>
          <h2 className="text text_type_main-medium" ref={refIng['filling']}>Начинки</h2>
          <div className={`${ingStyles.ingredient_con} pt-6 pl-4 pb-10`}>
            {filling.map(item => createCart(item))} 
          </div>
        </div>
      </div>
      {modal && <Modal closeModal={setModal}><IngredientDetails {...cardModal} /></Modal>}
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default BurgerIngredients;