import styles from "./app.module.css";
import { data, urlData } from "../../utils/data";
import api from "../../utils/api";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";

function App() {

  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlData);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Ошибка при извлечении данных:', error)
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data} closeModal={setModalOpen}/>
      </main>
      [modalOpen && <Modal closeModal={setModalOpen}/>]
    </div>
  );
}

export default App;
