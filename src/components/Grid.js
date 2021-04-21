import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { arrayToHash, transformHash } from "../utils";
import StyledButton from "./common/StyledButton";
import {
  Dialog,
  Grid,
  DialogContent,
  CardHeader,
  Box,
  CircularProgress,
  Zoom,
} from "@material-ui/core";
import StyledAppBar from "./common/StyledAppBar";
import { PauseRounded, PlayArrowRounded } from "@material-ui/icons";

const MainView = ({ data, updateSpeed }) => {
  const { m, n, state } = data;

  const [animate, setAnimate] = useState(false);
  const [hash, setHash] = useState({});

  useEffect(() => {
    const arrToHash = arrayToHash(state);
    setHash(arrToHash);
  }, [state]);

  let rows = Array(m).fill(0);
  let cols = Array(n).fill(0);

  const handleAnimation = () => {
    setAnimate(!animate);
  };

  const toggleAnimation = () => {
    const newHash = transformHash(m, n, hash);
    setHash(newHash);
  };

  useEffect(() => {
    let timer;
    if (animate) {
      timer = setTimeout(() => toggleAnimation(), updateSpeed);
    } else {
      clearTimeout(timer);
    }
  });

  return (
    <Dialog open={true} fullScreen>
      <StyledAppBar>
        <CardHeader
          title="Tango Coding Challenge 2020"
          titleTypographyProps={{ variant: "body1" }}
          subheader="Carlos Zuniga"
          subheaderTypographyProps={{
            variant: "caption",
            color: "textPrimary",
          }}
        />
      </StyledAppBar>
      <Box height="100vh" bgcolor="background.dark">
        <DialogContent>
          <Grid container spacing={1} justify="center">
            <Grid item xs={12}>
              <Box
                height="288px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={1}
              >
                {Object.keys(hash).length > 0 ? (
                  <Zoom in={true} mountOnEnter unmountOnExit>
                    <Box width={1}>
                      {rows.map((row, ri) => {
                        return (
                          <Box
                            key={`row-${ri}`}
                            display="flex"
                            width={1}
                            mt={0.5}
                          >
                            {cols.map((column, ci) => {
                              const val = hash[`${ri}-${ci}`];
                              const values = [
                                {
                                  val: 0,
                                  label: "dead",
                                },
                                {
                                  val: 1,
                                  label: "sad",
                                },
                                {
                                  val: 2,
                                  label: "happy",
                                },
                              ];
                              return (
                                <Box
                                  borderRadius={8}
                                  key={`col-${ci}`}
                                  width={1}
                                  height="14px"
                                  bgcolor={`primary.${values[val].label}`}
                                  color={`primary.${values[val].label}`}
                                >
                                  {"-"}
                                </Box>
                              );
                            })}
                          </Box>
                        );
                      })}
                    </Box>
                  </Zoom>
                ) : (
                  <CircularProgress />
                )}
              </Box>
            </Grid>
            <Grid item>
              <StyledButton
                variant="outlined"
                color="primary"
                onClick={handleAnimation}
                endIcon={animate ? <PauseRounded /> : <PlayArrowRounded />}
              >
                {animate ? "Pause" : "Play"}
              </StyledButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

MainView.propTypes = {
  data: PropTypes.object,
  updateSpeed: PropTypes.number,
};

export default MainView;
