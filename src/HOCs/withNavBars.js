/**
 * @author Kameshwaran Murugan
 * @email kamesh@qdmplatforms.com
 * @create date 2020-11-27
 * @modify date 2020-12-01
 * @desc withNavBars HOC will give you the Navbars (Top/Bottom Navbars)
 */

import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    width: '100%',
    // [theme.breakpoints.up("md")]: {
    //   paddingTop: appBarHeight,
    //   width: "calc(100% - 240px)",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   paddingTop: props => props?.navBarArr?.length ? appBarHeight + 48 : appBarHeight,
    // }
  },
}));


const withNavBars = (Component) => (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Your nav bars here */}

      {/* Content */}
      <div className={classes.content}>
        <Component {...props}>{props.children}</Component>
      </div>
    </div>
  );
};

export default withNavBars;
