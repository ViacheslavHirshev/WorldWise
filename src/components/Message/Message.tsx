import styles from "./Message.module.css";

export const Message = ({ message }: { message: string }) => {
  return <p className={styles.message}>{message}</p>;
};
