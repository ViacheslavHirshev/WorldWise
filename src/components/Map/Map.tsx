import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

export const Map = () => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      Map
    </div>
  );
};
