import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export default createMuiTheme({
  typography: {
    fontFamily: "'Baloo Thambi 2', cursive",
    fontSize: 18
  },
  palette: {
    primary: red
  },
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "white !important"
      },
      input: {
        color: "white !important"
      }
    },
    MuiFormLabel: {
      root: {
        color: "white !important"
      }
    }
  }
});
