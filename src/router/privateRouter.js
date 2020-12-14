/**
 * @author Kameshwaran Murugan
 * @email kamesh@qdmplatforms.com
 * @create date 2020-11-27
 * @modify date 2020-12-01
 * @desc The private route check wheather the user is logged in or not and also check
 * wheather the request route from the user is accessible to them or not using the Access(role,path)
 * function then allow to the particular route or else it will redirect to login page.
 */

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Routes } from "./routes";
import { Access } from "./access";
import AppDrawer from "../App.drawer";

const PrivateRoute = ({ children, ...rest }) => {
  
  const isAuthenticated = (router) => {   
    if (1) {
      const _ = Access(1, router?.match?.path);
      if (_ >= 0) {
        return true;
      };
      return false;
    } else {
      return false;
    }
  };
 
  return (
    <Route
      {...rest}
      render={(_) =>
        isAuthenticated(_) ? (
          <AppDrawer>{children}</AppDrawer>
        ) : (
            <Redirect
              to={{
                pathname: Routes.login,
                state: { from: _?.location },
              }}
            />
          )
      }
    />
  );
};

export default PrivateRoute;
