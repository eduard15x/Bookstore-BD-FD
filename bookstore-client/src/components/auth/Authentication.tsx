import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Authentication = () => {
  const [tab, setTab] = useState("login");
  return (
    <div id="auth-model">
      <div className="content">
        <h2>Your account</h2>
        <button>CLOSE</button>

        <ul className="tabs">
          <li className={`${tab === "login" ? "active" : ""}`}>
            <a href="#" onClick={() => setTab("login")}>
              Login
            </a>
          </li>
          <li className={`${tab === "register" ? "active" : ""}`}>
            <a href="#" onClick={() => setTab("register")}>
              Register
            </a>
          </li>
        </ul>

        {tab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Authentication;
