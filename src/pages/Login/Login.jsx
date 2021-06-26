import { useState } from "react";
//Images
import logo from "../../assets/logo192.png";
//Components
import Loader from "../../components/Loaders/LoginLoader";
import NetworkErrModal from "../../components/Modals/NetworkErrModal";

function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [valid, setValid] = useState({
    username: true,
    password: true,
    uContent: "",
    pContent: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passVisible, setPassVisible] = useState(false);

  const formHandler = (e) => {
    if (e.target.id !== "remember") {
      setState({ ...state, [e.target.id]: e.target.value });
    } else {
      setState({ ...state, remember: !state.remember });
    }
  };

  const loginHandler = () => {
    setIsLoading(true);
    fetch("https://covid-focus-sycoss.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ admin: state.username, password: state.password }),
    }).then((res) => {
      res
        .json()
        .then((body) => {
          if (!res.ok) throw Error(body.message);

          setIsLoading(false);
          let authData = JSON.stringify({
            username: state.username,
            token: body.token,
            expiration: new Date().getTime() + 43200000,
          });

          if (state.remember) {
            window.localStorage.setItem("auth_data", authData);
          } else {
            window.sessionStorage.setItem("auth_data", authData);
          }
          props.setIsLoggedIn("true");
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.toString() === "Error: User Doesnt exists") {
            setValid({
              username: false,
              password: true,
              uContent: "This username is not authorized!",
              pContent: "",
            });
          } else if (err.toString() === "Error: Incorrect Password") {
            setValid({
              username: true,
              password: false,
              uContent: "",
              pContent: "Wrong password",
            });
          }
        });
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // form validation
    let Valid = true;
    let Validobj = { ...valid };
    if (state.username === "") {
      Validobj = {
        ...Validobj,
        username: false,
        uContent: "Username is required",
      };
      Valid = false;
    } else {
      Validobj = { ...Validobj, email: true, uContent: "" };
    }
    if (state.password === "") {
      Validobj = {
        ...Validobj,
        password: false,
        pContent: "Password is required",
      };
      Valid = false;
    } else {
      Validobj = { ...Validobj, password: true, pContent: "" };
    }
    setValid(Validobj);
    if (!Valid) return;

    //login function
    loginHandler();
  };

  return (
    <>
      {showModal ? <NetworkErrModal setShowModal={setShowModal} /> : ""}
      <div className="bg-gray-900 flex items-center justify-center h-screen">
        <div className="container mx-auto px-4">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full sm:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <img className="mx-auto h-40 w-40 mt-2" src={logo} alt="logo" />
                <div className="flex-auto px-4 py-10 pt-0 relative">
                  {isLoading ? <Loader /> : ""}
                  <div className="text-gray-500 text-center mb-3 font-bold">
                    Log In
                  </div>
                  <form autoComplete="off" spellCheck="false">
                    <div className="relative w-full mb-5">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Username"
                        value={state.username}
                        onChange={formHandler}
                        autoFocus
                      />
                      {valid.username ? (
                        ""
                      ) : (
                        <div className="text-red-600 text-xs -mb-4">
                          <i className="fas fa-exclamation-triangle mx-1"></i>
                          {valid.uContent}
                        </div>
                      )}
                    </div>

                    <div className="relative w-full mb-5">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type={passVisible ? "text" : "password"}
                        className="relative px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        value={state.password}
                        onChange={formHandler}
                      />
                      <div
                        className="absolute right-2 top-8 p-1 h-6 w-7 bg-gray-200 hover:bg-gray-300 outline-none focus:outline-none"
                        style={{ borderRadius: "50%" }}
                        onClick={(e) => {
                          e.preventDefault();
                          setPassVisible(!passVisible);
                        }}
                      >
                        <span className="relative">
                          {!passVisible ? (
                            <i className="far fa-eye absolute"></i>
                          ) : (
                            <i className="far fa-eye-slash absolute"></i>
                          )}
                        </span>
                      </div>

                      {valid.password ? (
                        ""
                      ) : (
                        <div className="text-red-600 text-xs -mb-4">
                          <i className="fas fa-exclamation-triangle mx-1"></i>
                          {valid.pContent}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="remember"
                          type="checkbox"
                          className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          value={state.remember}
                          onChange={formHandler}
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">
                          Remember me
                        </span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-800 text-white hover:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        onClick={(e) => submitHandler(e)}
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
