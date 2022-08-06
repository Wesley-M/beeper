import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {Grid, Stack} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import InstructionsDialog from "./Instructions";
import SharePanel from "./SharePanel";

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
            <Stack direction="row" spacing={1}>
              <SharePanel/>
              <InstructionsDialog/>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
  );
};
export default Header;