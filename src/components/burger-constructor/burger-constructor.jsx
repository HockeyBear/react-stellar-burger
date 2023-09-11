import React, { Component, useMemo } from "react";
import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../utils/prop-types';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
  
  const totalPrice = props.data.reduce((sum, item) => sum + item.price, 0);

  const bun = useMemo(() => {
    return props.data.find((item) => item.type === 'bun');
  }, [props]);
  const sauce = React.useMemo(() => {
    return props.data.find(item => item.type === 'sauce')
  }, [props]);
  const main = React.useMemo(() => {
    return props.data.filter(item => item.type === 'filling')
  }, [props]);

  const RenderedIngredient = (item, type) => {
    return (
      <div key={item._id}>
        <DragIcon type="primary" />
        <ConstructorElement text={type.name} price={type.price} thumbnail={type.image} />
      </div>
    )
  }

  return (
    <section className={constructorStyles.section}>
      <div className={constructorStyles.container + ' custom-scroll mt-25 pl-4'}>
        <div className={constructorStyles.ingredientCon}>
          {bun && <ConstructorElement type="top" isLocked={true}
            text={bun.name + "(верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </div>
        <div className={constructorStyles.ingredientCon}>
          <DragIcon type="primary" />
          {bun && <ConstructorElement text={sauce.name}
            price={sauce.price}
            thumbnail={sauce.image}
          />}
        </div>
        {main.map(item => <RenderedIngredient key={item._id} {...item} />)}
        <div className={constructorStyles.ingredientCon}>
          {bun && <ConstructorElement type="bottom" isLocked={true}
            text={bun.name + "(низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </div>
        
      </div>
      <div className={constructorStyles.order + ' mt-10 mr-4'}>
        <div className={constructorStyles.sum}>
          <p className="text text_type_main-large">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => props.setIsOpen(true)}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default BurgerConstructor;