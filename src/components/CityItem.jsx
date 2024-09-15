import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// FUNC: Show list of cities inside 'CITIES' tab
function CityItem(children) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = children.city;

  function handleDelete(event) {
    // Prevent the default behaviour of the component
    // (inside <Link> definition) to={'<id>?lat=<lat>&lng=<lng>'}
    event.preventDefault();

    deleteCity(id);
  }

  return (
    <li>
      {/* to={`${id}`} : Add text to current URL */}
      {/* to={`/${id}`} : Add to the root */}
      <Link
        className={`${styles.cityItem} 
          ${id === currentCity.id && styles["cityItem--active"]}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={`${styles.emoji} flags`}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
