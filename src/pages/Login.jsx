import { SignIn } from "@clerk/clerk-react";
import "./Login.css";

function Login() {
  return (
    <section className="clerk-center">
      <div className="div-center">
        <SignIn />
      </div>
    </section>
  );
}

export default Login;
