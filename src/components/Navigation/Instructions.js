import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import CloseIcon from '@mui/icons-material/Close';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MouseIcon from '@mui/icons-material/Mouse';
import PlayIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
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
    message: "This is an interactive musical experiment. And its goals are to allow fast and fun creation of songs\n" +
      ", as well as to enable the sharing of new experiences with your friends.\n",
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
          <AppBar sx={{ position: 'relative', backgroundColor: "#151515" }}>
            <Toolbar>
              <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Instructions
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
              sx={{
                minHeight: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                padding: '2em 0'
              }}
          >
            <Container maxWidth="md">
              <Grid container direction="row" alignItems="center" spacing={0.5}>
                <Grid item>
                  <AudiotrackIcon sx={{ color: 'white', fontSize: '2em' }}/>
                </Grid>
                <Grid item>
                  <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        mr: 2,
                        fontFamily: 'Bree Serif, serif',
                        color: 'white',
                        fontSize: '2em',
                        textDecoration: 'none'
                      }}
                  >
                    Beeper
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                sx={{
                  color: 'white',
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  padding: '1em 0'
                }}
              >
                Welcome!
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
