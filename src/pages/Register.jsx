import { SignUp } from "@clerk/clerk-react";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles["c1-rootBox"]}>
      <SignUp/>
    </div>
  );
}

export default Login;
