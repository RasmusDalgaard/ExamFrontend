import React from "react";
import { NavLink } from "react-router-dom";

export default function Header({ lFacade, loggedIn }) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" className="leftF" to="/">
            <b>Home</b>
          </NavLink>
        </li>
        {lFacade.hasUserAccess("user", loggedIn) && (
          <div>
            <li>
              <NavLink
                exact
                activeClassName="selected"
                className="leftF"
                to="/races"
              >
                Races
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="selected"
                className="leftF"
                to="/cars"
              >
                Cars
              </NavLink>
            </li>
          </div>
        )}

        <li>
          <NavLink
            exact
            activeClassName="selected"
            className="rightF buttonBG"
            to="/login"
          >
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
}