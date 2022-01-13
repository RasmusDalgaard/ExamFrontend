import aFacade from "./apiFacade";
const URL = "http://localhost:8080/exambackend";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

let loginFacade = () => {
  const login = (user, password, setLoggedIn, setErrorMessage) => {
    const options = aFacade.makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setLoggedIn(true);
        setErrorMessage("Logged in");
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMessage(e.code + ": " + e.message));
        } else {
          setErrorMessage("Network error");
        }
      });
  };

  //Make Signup function similar to the login function

  // Security funktionalitet

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return "";
  };

  const getUsername = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const username = decodedClaims.username;
      return username;
    } else return "";
  };

  const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(",");
    return loggedIn && roles.includes(neededRole);
  };

  // todo with jenner
  const create = (user, password, setErrorMessage) => {
    const newUser = { username: user, password: password };
    const options = aFacade.makeOptions("POST", true, newUser);
    return fetch(URL + "/api/user/create", options)
      .then(handleHttpErrors)
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMessage(e.code + ": " + e.message));
        } else {
          setErrorMessage("Network error");
        }
      });
  };

  return {
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    getUserRoles,
    hasUserAccess,
    create,
    getUsername,
  };
};
const lFacade = loginFacade();

export default lFacade;
