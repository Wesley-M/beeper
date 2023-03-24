import {Stack} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import InstructionsDialog from "../dialogs/Instructions";
import PublishingPanel from "../dialogs/PublishingPanel";
import {ReactComponent as Logo} from '../../images/logo.svg'
import Box from "@mui/material/Box";

const Header = () => {
  return (
      <AppBar position="static" sx={{ bgcolor: "#282828" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo width={90}/>
            <Box flex={1}/>
            <Stack direction="row" spacing={1}>
              <PublishingPanel/>
              <InstructionsDialog/>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
  );
};
export default Header;