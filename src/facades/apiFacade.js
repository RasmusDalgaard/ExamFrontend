import lFacade from "./loginFacade";

const url = "http://localhost:8080/exambackend";

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

  const putData = (endpoint, updateAction, SetErrorMessage, data) => {
    const options = makeOptions("PUT", true, data);
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

  const deleteData = (endpoint, updateAction, SetErrorMessage) => {
    const options = makeOptions("DELETE", true);
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

  const postRace = (
    name,
    date,
    time,
    location,
    endpoint,
    updateAction,
    setErrorMessage
  ) => {
    const newRace = { name: name, date: date, time: time, location: location };
    console.log(newRace);
    const options = makeOptions("POST", true, newRace);
    return fetch(url + "/api/" + endpoint, options)
      .then((data) => updateAction(data))
      .then(handleHttpErrors)
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMessage(e.code + ": " + e.message));
        } else {
          setErrorMessage("Network error");
        }
      });
  };

  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

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
    deleteData,
    putData,
    postRace,
    makeOptions,
    fetchData,
    handleHttpErrors,
    url,
  };
};

const aFacade = apiFacade();
export default aFacade;
