import React, { useContext, useMemo, useState } from "react";
import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import ingredientPropType from '../../utils/prop-types';
// import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ConstructorContext, IngredientsContext, BunContext } from "../../services/ComponentContext";
import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/API";

const BurgerConstructor = () => {
  const { ingredientsData } = useContext(IngredientsContext);
  const { constructorBurgers, setConstructorBurgers } = useContext(ConstructorContext);
  const { consturctorBun, setConstructorBun } = useContext(BunContext);
  const [order, setOrder] = useState();
  const [modalOrder, setModalOrder] = useState(false);

  const hasSelectedBun = consturctorBun !== null;

  const totalPrice = useMemo(() => {
    const burgerPrice = constructorBurgers? constructorBurgers.reduce((sum, curr) => {
      return sum + curr.price;
    }, 0) : 0;
    const bunPrice = consturctorBun? consturctorBun.price * 2 : 0;
    return burgerPrice + bunPrice;
  }, [consturctorBun, constructorBurgers]);

  const orderClick = () => {
    const burger = constructorBurgers.map(item => item._id);
    burger.push(consturctorBun._id);
    return fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: burger
      })
      
    }).then(result => checkResponse(result))
      .then(result => {
        setOrder(result.order);
        setModalOrder(true);
      })
      .catch(error => {
        console.log('Произошла ошибка при отправке запроса:', error.message);
        alert('Произошла ошибка при отправке запроса. Пожалуйста, попробуйте еще раз.');
      });
  }

  const RenderedIngredient = (item) => {
    return (
      <div key={item._id}>
        <DragIcon type="primary" />
        <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
      </div>
    )
  }

  return (
    <IngredientsContext.Provider value={ingredientsData}>
      <>
        <section className={constructorStyles.section}>
          <div className={constructorStyles.ingredientCon + " mt-25"}>
            {hasSelectedBun && <ConstructorElement 
            type="top" 
            isLocked={true}
            text={consturctorBun.name + "(верх)"}
            price={consturctorBun.price}
            thumbnail={consturctorBun.image}
            />}
          </div>
          <div
            className={constructorStyles.container + " custom-scroll pl-4"}
          >
            {constructorBurgers.map((item, index) => <RenderedIngredient key={index} {...item} />)}
          </div>
          <div className={`${constructorStyles.ingredientCon} ${constructorStyles.lastIngredientCon}`}>
            {hasSelectedBun && <ConstructorElement 
            type="bottom" 
            isLocked={true}
            text={consturctorBun.name + "(низ)"}
            price={consturctorBun.price}
            thumbnail={consturctorBun.image}
            />}
          </div>
          <div className={constructorStyles.order + " mt-10 mr-4"}>
            <div className={constructorStyles.sum}>
              <p className="text text_type_main-large">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => orderClick()}
            >
              Оформить заказ
            </Button>
          </div>
        </section>
        {modalOrder && (
          <Modal closeModal={() => setModalOrder(false)}>
            <OrderDetails order={order} />
          </Modal>
        )}
      </>
    </IngredientsContext.Provider>
  );
}

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropType).isRequired,
// }

export default BurgerConstructor;