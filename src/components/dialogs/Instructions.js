import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MouseIcon from '@mui/icons-material/Mouse';
import PlayIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {ReactComponent as Logo} from '../../images/logo.svg'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InstructionsDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const content = {
    message: "This is an interactive musical experiment. And its goals are to allow fast and fun creation " +
      "of songs, as well as to enable the sharing of new experiences with your friends.\n",
    instructions: [
      {
        Icon: MouseIcon,
        text: "To create a song, tap or hold and drag over the cells."
      },
      {
        Icon: GraphicEqIcon,
        text: "There are a few sounds to experiment with! Change them clicking on the icon at the bottom left."
      },
      {
        Icon: PlayIcon,
        text: "Press play and enjoy your creation."
      },
      {
        Icon: ShareIcon,
        text: "Alright! Now you just need to share with your friends :) Press 'Share' and copy the link."
      },
      {
        Icon: AudiotrackIcon,
        text: "If you wish to turn your song public, we hold an anonymous song board! Just share it. But caution, the board" +
          " is restarted everyday and you can't edit your song after submission."
      },
    ]
  }

  return (
      <div>
        <Button
            sx={{
              color: 'white',
              fontWeight: 'bold'
            }}
            onClick={handleClickOpen}
        >
          Instructions
        </Button>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative', backgroundColor: "#282828" }}>
            <Toolbar>
              <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
              >
                <KeyboardBackspaceIcon />
              </IconButton>
              <Box sx={{ margin: "0.5em" }}/>
              <Logo width={90}/>
            </Toolbar>
          </AppBar>
          <Box
              sx={{
                minHeight: '100vh',
                backgroundColor: '#282828',
                padding: '2em 0'
              }}
          >
            <Container maxWidth="md">

              <Typography
                sx={{
                  color: 'white',
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  padding: '1em 0'
                }}
              >
                Instructions
              </Typography>

              <Typography sx={{ color: '#FFFFFFCC', fontSize: '1.2em' }}>
                {content.message}
              </Typography>

              <List>
                {content.instructions.map(({ text, Icon}) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon sx={{ color: '#FFFFFFCC' }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ color: '#FFFFFFCC' }}
                        primary={text}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Container>
          </Box>
        </Dialog>
      </div>
  );
}
