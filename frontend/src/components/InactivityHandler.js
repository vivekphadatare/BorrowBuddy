import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InactivityHandler({ timeout }) {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.clear();
        alert("Auto logout due to inactivity");
        navigate("/");
      }, timeout);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // initialize timer

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, timeout]);

  return null;
}

export default InactivityHandler;
