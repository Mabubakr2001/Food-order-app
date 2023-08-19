import Card from "../../UI/Card/Card";
import MealItem from "../SeperateMeal/MealItem";
import styles from "./AvailableMeals.module.css";

const availableMealsArr = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
  {
    id: "m5",
    name: "Pizza Sausage",
    description: "Favorite type of food for many people",
    price: 20.99,
  },
];

const AvailableMeals = () => {
  return (
    <Card className={styles.meals}>
      <ul>
        {availableMealsArr.map((meal) => {
          return <MealItem key={meal.id} theMeal={meal} />;
        })}
      </ul>
    </Card>
  );
};

AvailableMeals.propTypes = {};

export default AvailableMeals;
