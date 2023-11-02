import React, { useEffect, useRef, useState } from "react";

import { Box, Button, CircularProgress, ClickAwayListener, Divider, Slide, Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import PropTypes from "prop-types";

/**
 *
 * Demos:
 *
 * - [ScrollPilot](https://mui.com/material-ui/react-tooltip/)
 *
 * Docs:
 *
 * - [ScrollPilot Docs](https://mui.com/material-ui/api/tooltip/)
 */

export const ScrollPilot = ({ config }) => {
  const [scrolled, setScrolled] = useState(0);
  const [showNavigation, setShowNavigation] = useState(true);
  const [togglePopup, setTogglePopup] = useState(false);
  const scrollPosRef = useRef(0);

  const defaultConfig = {
    index: [],
    getScrollCompletionVal: (val) => {},
    onNavClicked: (val) => {},
    aesthetics: {
      icon: <>Hi !</>,
      tooltipTxt: "",
      location: "bottom-right",
      size: 50,
      hideOnScroll:true,
      indicatorBackgroundColor: "#ffffff",
      indicatorProgressColor: "#181818",
      margins: {
        desktop: 80,
        mobile: 40,
      },
      popupWidths: {
        desktop: "200px",
        mobile: "180px",
      },
      popupBackgroundColor: "#ffffff",
      popupLinksColor: "#181818",
    },
  };

  const isValidLocation=(loc)=>{
    return loc === "top-left" || loc === "top-right" || loc === "bottom-left" || loc === "bottom-right"
  }

  const isDataTypeValid=(value,type)=>{
    if(typeof value == "object")
      return typeof value?.mobile === type && typeof value?.desktop === type
    else
      return typeof value === type
  }

  const mergedConfig = {
    ...defaultConfig,
    ...config,
    aesthetics: {
      ...defaultConfig.aesthetics,
      ...config?.aesthetics,
      size:isDataTypeValid(config?.aesthetics?.size,"number") ? config?.aesthetics?.size : defaultConfig.aesthetics.size ,
      location: isValidLocation( config?.aesthetics?.location) ? config?.aesthetics?.location : defaultConfig.aesthetics.location ,
      margins:isDataTypeValid(config?.aesthetics?.margins,"number") ? config?.aesthetics?.margins : defaultConfig.aesthetics.margins 
    },
  };

  const {
    index,
    getScrollCompletionVal,
    onNavClicked,
    aesthetics: { icon, tooltipTxt, hideOnScroll, location, size, indicatorBackgroundColor, indicatorProgressColor, margins, popupWidths, popupBackgroundColor, popupLinksColor },
  } = mergedConfig;

  const indicatorPalette = createTheme({
    palette: {
      custom: {
        main: indicatorProgressColor,
      },
    },
  });

  const linksPalette = createTheme({
    palette: {
      custom: {
        main: popupLinksColor,
      },
    },
  });

  const setLocation = (type) => {
    const pos = location?.split("-");
    return type === "indicator"
      ? {
          [pos[0]]: { xs: `${margins?.mobile + "px"}`, sm: margins?.desktop + "px" },
          [pos[1]]: { xs: margins?.mobile + "px", sm: margins?.desktop + "px" },
        }
      : { [pos[0]]: { xs: margins?.mobile + 50 + "px", sm: margins?.desktop + 50 + "px" }, 
          [pos[1]]: { xs: margins?.mobile + 50 + "px", sm: margins?.desktop + 50 + "px" } 
        };
  };

  function handleScroll() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const totalScrolled = Math.round((winScroll / height) * 100) + 4;
    getScrollCompletionVal(totalScrolled);
    setScrolled(totalScrolled > 93 ? 100 :totalScrolled);
    const bodyRect = document.body.getBoundingClientRect();
    const newScrollPos = bodyRect.top;
    if(hideOnScroll){
      if (newScrollPos > scrollPosRef.current) {
        setShowNavigation(true);
      } else {
        setShowNavigation(false);
      }
      scrollPosRef.current = newScrollPos;
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Slide appear={false} direction={`${location?.split("-")[0] === "bottom" ? "up" : "down"}`} in={togglePopup || showNavigation}>
        <Tooltip title={tooltipTxt}>
          <Box sx={{ float: location?.split("-")[1], cursor: "pointer", position: "fixed", ...setLocation("indicator") }}>
            <Box
              onClick={() => {
                index.length > 0 && setTogglePopup(true);
              }}
              sx={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                borderRadius: "50px",
                boxShadow: 3,
                backgroundColor: indicatorBackgroundColor,
              }}
            >
              <ThemeProvider theme={indicatorPalette}>
                <CircularProgress size={size} thickness={4.6} variant="determinate" value={scrolled} color="custom" />
              </ThemeProvider>

              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  maxHeight: "100%",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                {icon}
              </Box>
            </Box>
          </Box>
        </Tooltip>
      </Slide>
      {togglePopup && (
        <ClickAwayListener
          onClickAway={() => {
            setTogglePopup(false);
          }}
        >
          <Box
            onClick={() => {
              setTogglePopup(false);
            }}
            sx={{ p: 1, height: "auto", width: { xs: popupWidths.mobile, sm: popupWidths.desktop }, borderRadius: "20px", boxShadow: 3, backgroundColor: popupBackgroundColor, float: location?.split("-")[1], position: "fixed", ...setLocation() }}
          >
            {Array.isArray(index) &&
              index.map((item, i) => (
                <ThemeProvider key={i} theme={linksPalette}>
                  <Button
                    onClick={() => {
                      onNavClicked(item);
                    }}
                    variant="text"
                    href={item?.section || "#"}
                    color="custom"
                    sx={{ justifyContent: "start", textTransform: "none", fontSize: { xs: "14px", sm: "16px" } }}
                    fullWidth
                  >
                    {item?.label || "Add Label"}
                  </Button>
                  {i < index.length - 1 && <Divider />}
                </ThemeProvider>
              ))}
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
};

ScrollPilot.propTypes = {
  config: PropTypes.shape({
    index: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        section: PropTypes.string,
      })
    ),
    tooltipTxt: PropTypes.string,
    getScrollCompletionVal: PropTypes.func,
    onNavClicked: PropTypes.func,
    aesthetics: PropTypes.shape({
      icon: PropTypes.node,
      location: PropTypes.oneOf(["top-left", "top-right", "bottom-left", "bottom-right"]),
      size: PropTypes.number,
      indicatorBackgroundColor: PropTypes.string,
      indicatorProgressColor: PropTypes.string,
      margins: PropTypes.shape({
        desktop: PropTypes.number,
        mobile: PropTypes.number,
      }),
      popupWidths: PropTypes.shape({
        desktop: PropTypes.string,
        mobile: PropTypes.string,
      }),
      popupBackgroundColor: PropTypes.string,
      popupLinksColor: PropTypes.string,
    }),
  }),
};

