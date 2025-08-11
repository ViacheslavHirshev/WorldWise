import { useAuth } from "../../context/AuthContext";
import styles from "./User.module.css";

export const User = () => {
  const { user, logout } = useAuth();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    logout();
  }

  return (
    user && (
      <div className={styles.user}>
        <img src={user.avatar} alt={user.name} />
        <span>Welcome, {user.name}</span>
        <button onClick={handleClick}>Logout</button>
      </div>
    )
  );
};
