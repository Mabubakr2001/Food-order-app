import * as React from "react";
import useHttp from "../../../hooks/use-http";
import Card from "../../UI/Card/Card";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import MealItem from "../SeperateMeal/MealItem";
import styles from "./AvailableMeals.module.css";

const { useEffect, useState } = React;

const AvailableMeals = () => {
  const [availableMealsArr, setAvailableMealsArr] = useState([]);
  const { sendRequest, isLoading, error } = useHttp(transformMeals);

  useEffect(() => {
    sendRequest({
      requestConfig: {
        url: "https://react-http-93a9d-default-rtdb.firebaseio.com/meals.json",
      },
      applyData: transformMeals,
    });
  }, [sendRequest]);

  function transformMeals(mealsData) {
    const transformedMealsData = Object.entries(mealsData).map(
      ([key, value]) => {
        return {
          id: key,
          name: value.name,
          description: value.description,
          price: value.price,
        };
      }
    );
    setAvailableMealsArr(transformedMealsData);
  }

  return (
    <Card className={styles.meals}>
      <ul>
        {availableMealsArr.map((meal) => {
          return <MealItem key={meal.id} theMeal={meal} />;
        })}
      </ul>
      {isLoading && !error && <LoadingSpinner />}
      {error && (
        <span
          style={{ display: "block", textAlign: "center", fontSize: "20px" }}
        >
          {error}
        </span>
      )}
    </Card>
  );
};

export default AvailableMeals;
