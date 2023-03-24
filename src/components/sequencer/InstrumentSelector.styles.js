import {styled, Typography} from "@mui/material";
import Button from "@mui/material/Button";

export const InstrumentButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "backgroundColor"
})(({ backgroundColor }) => ({
  textTransform: 'capitalize',
  backgroundColor: 'transparent',
  opacity: 0.7,
  width: '8em',
  height: '6em',
  "&:hover": {
    backgroundColor: backgroundColor,
    opacity: 1
  }
}));

export const InstrumentName = styled(Typography)(() => ({
}));