/**
 * @author Kameshwaran Murugan
 * @email kamesh@qdmplatforms.com
 * @create date 2020-11-27
 * @modify date 2020-12-01
 * @desc If any error/crash happend in the app, those are cached here and 500 page is shown, if 
 * need the error will be send to server.
 */

import React from "react";
import { Grid, Typography, Link, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    height: "100vh",
    width: "100%",
  },
});

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log('info:', info)
    console.log('error:', error)
    
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service

    //TODO:
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Grid
          container
          classes={this.props.classes.root}
          id="error_catcher_root"
          className={this.props.classes.root}
          justify="center"
          alignItems="center"
        >
          <Grid item id="error_catcher_item1">
            <Typography id="error_catcher_typo1" variant="h1">
              500
            </Typography>

            <Typography id="error_catcher_typo2" variant="h2">
              Opps!!! Something went wrong!
            </Typography>

            <Link id="error_catcher_link" href="/">
              Try again
            </Link>
          </Grid>
        </Grid>
      );
    }
    return this.props.children;
  }
}

export default withStyles(styles)(AppErrorBoundary);
