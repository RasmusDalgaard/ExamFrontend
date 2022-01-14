import { Container } from "react-bootstrap";
import "./styling/headerstyling.css";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import RaceList from "./components/RaceList.jsx";
import CarList from "./components/CarList";
import CarsInRace from "./components/CarsInRace";
import DriversInRace from "./components/DriversInRace";
import CarListAdmin from "./components/CarListAdmin";
import ConnectRace from "./components/ConnectRace";
import AddRace from "./components/AddRace";
import aFacade from "./facades/apiFacade";
import lFacade from "./facades/loginFacade";
import { useState } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [errorMessage, setErrorMessage] = useState("All is good... so far");
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    lFacade.logout();
    setLoggedIn(false);
    setErrorMessage("Logged out");
  };

  return (
    <Container fluid className="text-center img mt-2">
      <Router>
        <Header lFacade={lFacade} loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Home
              logout={logout}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              lFacade={lFacade}
              setErrorMessage={setErrorMessage}
            />
          </Route>
          //User acces
          <Route path="/races">
            {lFacade.hasUserAccess("user", loggedIn) && (
              <RaceList aFacade={aFacade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/carsinrace">
            {lFacade.hasUserAccess("user", loggedIn) && (
              <CarsInRace aFacade={aFacade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/driversinrace">
            {lFacade.hasUserAccess("user", loggedIn) && (
              <DriversInRace
                aFacade={aFacade}
                setErrorMessage={setErrorMessage}
              />
            )}
          </Route>
          <Route path="/cars">
            {lFacade.loggedIn && (
              <CarList aFacade={aFacade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          //Admin access
          <Route path="/addrace">
            {lFacade.hasUserAccess("admin", loggedIn) && (
              <AddRace aFacade={aFacade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/carlistadmin">
            {lFacade.hasUserAccess("admin", loggedIn) && (
              <CarListAdmin
                aFacade={aFacade}
                setErrorMessage={setErrorMessage}
              />
            )}
          </Route>
          <Route path="/connectrace">
            {lFacade.hasUserAccess("admin", loggedIn) && (
              <ConnectRace
                aFacade={aFacade}
                setErrorMessage={setErrorMessage}
              />
            )}
          </Route>
          <Route exact path="/login">
            {!loggedIn ? (
              <Login
                lFacade={lFacade}
                setLoggedIn={setLoggedIn}
                setErrorMessage={setErrorMessage}
              />
            ) : (
              <div>
                <p>
                  <button onClick={logout}>Logout</button>
                </p>
                <p>Role: {lFacade.getUserRoles()}</p>
              </div>
            )}
          </Route>
          <Route path="*">
            <p>no match</p>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
