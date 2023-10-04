import React, { useContext, useMemo, useState } from "react";
import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import ingredientPropType from '../../utils/prop-types';
// import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ConstructorContext, IngredientsContext, BunContext } from "../../services/ComponentContext";
import { orderUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/API";

const BurgerConstructor = ({ data }) => {
  const { ingredientsData } = useContext(IngredientsContext);
  const { constructorBurgers, setConstructorBurgers } = useContext(ConstructorContext);
  const { consturctorBun, setConstructorBun } = useContext(BunContext);
  const [order, setOrder] = useState(false);
  
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
    return fetch(orderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredents: burger
      })
    }).then(result => checkResponse(result))
      .then(result => {
        setOrder(result.order);
      })
  }

  // const bun = useMemo(() => {
  //   return data && data.find((item) => item.type === 'bun');
  // }, [data]);
  // const sauce = useMemo(() => {
  //   return data && data.find(item => item.type === 'sauce')
  // }, [data]);
  // const main = useMemo(() => {
  //   return data && data.filter(item => item.type === 'filling')
  // }, [data]);

  const RenderedIngredient = (item, type) => {
    return (
      <div key={item._id}>
        <DragIcon type="primary" />
        <ConstructorElement text={type.name} price={type.price} thumbnail={type.image} />
      </div>
    )
  }

  return (
    <IngredientsContext.Provider value={ingredientsData}>
      <>
        <section className={constructorStyles.section}>
          <div
            className={constructorStyles.container + " custom-scroll mt-25 pl-4"}
          >
            <div className={constructorStyles.ingredientCon}>
              {consturctorBun && <ConstructorElement 
              type="top" 
              isLocked={true}
              text={consturctorBun.name + "(верх)"}
              price={consturctorBun.price}
              thumbnail={consturctorBun.image}
              />}
            </div>
            {constructorBurgers.map((item, type) => <RenderedIngredient key={type} {...item} />)}
            <div className={constructorStyles.ingredientCon}>
              {consturctorBun && <ConstructorElement 
              type="bottom" 
              isLocked={true}
              text={consturctorBun.name + "(низ)"}
              price={consturctorBun.price}
              thumbnail={consturctorBun.image}
              />}
            </div>
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
        {order && (
          <Modal closeModal={() => setOrder(false)}>
            <OrderDetails />
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