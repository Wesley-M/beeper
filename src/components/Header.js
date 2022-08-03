import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {Grid} from "@mui/material";
import InstructionsDialog from "./Instructions";

const Header = () => {
  return (
      <AppBar position="static" sx={{ bgcolor: "#151515" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid container direction="row" alignItems="center" spacing={0.5}>
              <Grid item>
                <AudiotrackIcon/>
              </Grid>
              <Grid item>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      fontFamily: 'Bree Serif, serif',
                      color: 'inherit',
                      fontSize: '1.4em',
                      textDecoration: 'none'
                    }}
                >
                  Beeper
                </Typography>
              </Grid>
            </Grid>

            <InstructionsDialog/>
          </Toolbar>
        </Container>
      </AppBar>
  );
};
export default Header;