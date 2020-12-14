/**
 * @author Kameshwaran Murugan
 * @email kamesh@qdmplatforms.com
 * @create date 2020-11-27
 * @modify date 2020-12-01
 * @desc The first component of the application, all the required context and routes are used here 
 * to setup the application.
 */

import React from "react";

import AppAuth from "./App.auth";
import AppTheme from "./App.theme";
import AppAlert from "./App.alert";
import AppErrorBoundary from "./App.errorBoundry";
import RouterApp from "./router";

import { CssBaseline } from "@material-ui/core";
import AppDialog from "./App.dialog";
import AppBackdrop from "./App.backdrop";

function App() {
  return (
    <AppAuth>
      <AppErrorBoundary>
        <AppTheme>
          <CssBaseline />
          <AppAlert>
            <AppDialog>
              <AppBackdrop>
                <RouterApp />
              </AppBackdrop>
            </AppDialog>
          </AppAlert>
        </AppTheme>
      </AppErrorBoundary>
    </AppAuth>
  );
}

export default App;
