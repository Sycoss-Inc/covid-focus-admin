import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// Pages
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Error from "./pages/Error/Error";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (
      window.sessionStorage.getItem("auth_data") ||
      window.localStorage.getItem("auth_data")
    ) {
      loginHandler();
    } else {
      let loader = document.getElementById("loading-spinner");
      if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }
    }
  }, [isLoggedIn]);

  const resize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  resize();

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const loginHandler = () => {
    let localData = window.localStorage.getItem("auth_data");
    if (!localData) localData = window.sessionStorage.getItem("auth_data");
    localData = JSON.parse(localData);

    // check expiration
    let time = new Date().getTime();
    if (time < localData.expiration) {
      setIsLoggedIn(true);
    } else {
      window.sessionStorage.clear();
      window.localStorage.clear();
    }
    let loader = document.getElementById("loading-spinner");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  };

  let route;
  // if (isLoggedIn) {
  if (isLoggedIn) {
    route = <Admin setIsLoggedIn={setIsLoggedIn} />;
  } else {
    route = (
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="*" component={Error} />
      </Switch>
    );
  }
  return route;
}

export default App;
