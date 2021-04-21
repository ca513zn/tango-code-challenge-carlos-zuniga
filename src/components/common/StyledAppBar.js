import { AppBar, withStyles } from "@material-ui/core";
import React from "react";

const StyledAppBar = withStyles(() => ({
  root: {
  },
}))(({ children }) => <AppBar position="sticky">{children}</AppBar>);

export default StyledAppBar;
