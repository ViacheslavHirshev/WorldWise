import { Map } from "../../components/Map/Map";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import styles from "./AppLayout.module.css";

export const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};
