import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <Login onSwitch={handleSwitch} />
      ) : (
        <Register onSwitch={handleSwitch} />
      )}
    </div>
  );
}

export default AuthPage;
