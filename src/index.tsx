import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { CssBaseline } from "@material-ui/core";
import "./app.css";
import { Helmet } from "react-helmet";
import { SWRConfig } from "swr";

const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false
};

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <title>{process.env.REACT_APP_TITLE}</title>
    </Helmet>
    <SWRConfig value={swrConfig}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
