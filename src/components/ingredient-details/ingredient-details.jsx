import ingredientDetails from './ingredient-details.module.css';
import ingredientPropType from '../../utils/prop-types';

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      <h2 className={ingredientDetails.title + " text text_type_main-large mt-15 ml-10"}>Детали ингредиента</h2>
      <div className={ingredientDetails.con}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
        <div className={ingredientDetails.details}>
          <div className={ingredientDetails.info}>
            <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
          </div>
          <div className={ingredientDetails.info}>
            <p className="text text_type_main-small text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
          </div>
          <div className={ingredientDetails.info}>
            <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
          </div>
          <div className={ingredientDetails.info}>
            <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
}

export default IngredientDetails;