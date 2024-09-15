import Spinner from "./shared/Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./shared/Message";
import { useCities } from "../contexts/CitiesContext";

// cannot separate children prop directly (get error)
// function CityList({ cities, isLoading }) {

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
