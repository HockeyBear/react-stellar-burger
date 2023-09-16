import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

const URL_API = 'https://norma.nomoreparties.space/api/ingredients';


function App() {
  const [state, setState] = useState({
    ingredientData: [],
    isLoading: true,
    hasError: false,
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    const getBurger = async () => {
      try {
        setState({ ...state, isLoading: true, hasError: false });
        fetch(URL_API)
        .then((res) => res.json())
        .then((data) => {
          setState({ ...state, ingredientData: data.data });
        });
      } catch (error) {
        console.log('Ошибка при получении данных', error.message);
      } finally {
        setState({ ...state, isLoading: false});
      }
    };
    getBurger();
  }, []);

  const handleClick = (id) => {
    if (id) {
      setCurrentItem(id);
    }
  };

  const addToOrder = () => {
    setOrder(true);
  };
  const closeModal = () => {
    setOrder(false);
    setCurrentItem(null);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading ? (
          <p>Загрузка данных...</p>
        ) : (
          <>
            <BurgerIngredients data={state.ingredientData} handleClick={handleClick}/> 
            <BurgerConstructor data={state.ingredientData} openModal={addToOrder}/>
          </>
        )}
      </main>
      {order && (
        <Modal closeModal={currentItem}>
          <OrderDetails />
        </Modal>
      )}
      {currentItem && (
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={currentItem} />
        </Modal>
      )}
    </div>
  );
}

export default App;
