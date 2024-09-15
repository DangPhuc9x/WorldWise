import styles from "./CountryItem.module.css";

function CountryItem(children) {
  const { country } = children;
  return (
    <li className={styles.countryItem}>
      <span className="flags">{country.emoji}</span>
      <span>{country.countryName}</span>
    </li>
  );
}

export default CountryItem;
