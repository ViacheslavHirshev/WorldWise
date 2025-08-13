import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { PageNav } from "../../components";
import { Button } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              login(email, password);
            }}
            type="primary"
          >
            Login
          </Button>
        </div>
      </form>
    </main>
  );
};
