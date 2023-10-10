import orderStyle from './order-details.module.css';
import orderAccept from '../../images/done.svg';
import PropTypes from 'prop-types';


const OrderDetails = (item) => {
  return (
    <div className={`${orderStyle.con} pb-30 pt-4 pl-25 pr-25`}>
      <h2 className={`${orderStyle.text} text text_type_digits-large mb-8`}>{item.order.number}</h2>
      <p className={"text text_type_main-medium"}>
        идентификатор заказа
      </p>
      <img className={`${orderStyle.img} mt-15 mb-15`} src={orderAccept} alt="Order accepted" />
      <p className={"text text_type_main-default"}>
        Ваш заказ начали готовить
      </p>
      <p className={"text text_type_main-default text_color_inactive"}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

OrderDetails.propTypes = {
  item: PropTypes.number.isRequired
}

export default OrderDetails;