import Spinner from "./shared/Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./shared/Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // OUTPUT: countries <= resultArrCity
  // Get all the countries inside the 'cities' list (not duplicate)
  // and save into resultArrCity
  const countries = cities.reduce((resultArrCity, city) => {
    if (!resultArrCity.map((el) => el.countryName).includes(city.countryName))
      return [
        ...resultArrCity,
        { countryName: city.countryName, emoji: city.emoji },
      ];
    else return resultArrCity;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.countryName} />
      ))}
    </ul>
  );
}

export default CountryList;
