import lFacade from "./loginFacade";

const url = "http://localhost:8080/exambackend";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

let apiFacade = () => {
  const fetchData = (endpoint, updateAction, SetErrorMessage) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(url + "/api/" + endpoint, options)
      .then(handleHttpErrors)
      .then((data) => updateAction(data))
      .catch((err) => {
        if (err.status) {
          console.log(err);
          err.fullError.then((e) => SetErrorMessage(e.code + ": " + e.message));
        } else {
          SetErrorMessage("Network error");
        }
      });
  };

  const fetchFavourites = (endpoint, updateAction, SetErrorMessage) => {
    const username = lFacade.getUsername();
    console.log(username);
    const body = { username: username };
    console.log(body);
    const options = makeOptions("POST", true, body); //True add's the token
    return fetch(url + "/api/" + endpoint, options)
      .then(handleHttpErrors)
      .then((data) => updateAction(data))
      .catch((err) => {
        if (err.status) {
          console.log(err);
          err.fullError.then((e) => SetErrorMessage(e.code + ": " + e.message));
        } else {
          SetErrorMessage("Network error");
        }
      });
  };

  const postData = (endpoint, updateAction, SetErrorMessage) => {
    const options = makeOptions("POST", true);
    return fetch(url + "/api/" + endpoint, options)
      .then(handleHttpErrors)
      .then((data) => updateAction(data))
      .catch((err) => {
        if (err.status) {
          console.log(err);
          err.fullError.then((e) => SetErrorMessage(e.code + ": " + e.message));
        } else {
          SetErrorMessage("Network error");
        }
      });
  };

  const putData = (endpoint, updateAction, SetErrorMessage) => {
    const username = lFacade.getUsername;
    const body = { username: `${username}` };
    const options = makeOptions("PUT", true, body);
    return fetch(url + "/api/" + endpoint, options)
      .then(handleHttpErrors)
      .then((data) => updateAction(data))
      .catch((err) => {
        if (err.status) {
          console.log(err);
          err.fullError.then((e) => SetErrorMessage(e.code + ": " + e.message));
        } else {
          SetErrorMessage("Network error");
        }
      });
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: body,
    };
    if (addToken && lFacade.loggedIn()) {
      opts.headers["x-access-token"] = lFacade.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
      console.log(opts.body);
    }
    return opts;
  };

  return {
    makeOptions,
    fetchData,
    fetchFavourites,
    handleHttpErrors,
    url,
  };
};

const aFacade = apiFacade();
export default aFacade;
