import {Stack, styled} from "@mui/material";

export const DesktopControlsContainer = styled(Stack)(({theme}) => ({
  width: '100%',
  height: '20vh',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
  position: 'absolute',
  top: 'calc(80vh + 0.75em)',
  backgroundColor: '#282828',
  paddingLeft: '1.5em'
}));

export const MobileControlsContainer = styled(Stack)(({theme}) => ({
  width: '95%',
  alignItems: 'center',
  marginTop: '1.5em',
  [theme.breakpoints.up('xs')]: {
    display: 'flex',
    flexDirection: 'column'
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none',
    flexDirection: 'row'
  }
}));

