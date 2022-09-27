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

  return (
      <div>
        <Button
            sx={{
              color: 'white',
              fontWeight: 'bold'
            }}
            onClick={handleClickOpen}
        >
          Instruções
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
                Instruções
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
                Bem-vind@!
              </Typography>

              <Typography sx={{ color: '#FFFFFFCC', fontSize: '1.2em' }}>
                Esse projeto se trata de um experimento musical interativo. E seu objetivo é permitir
                a criação rápida e divertida de músicas, como também o compartilhamento de experiências
                com seus amigos.
              </Typography>

              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MouseIcon sx={{ color: '#FFFFFFCC' }} />
                    </ListItemIcon>
                    <ListItemText
                        sx={{ color: '#FFFFFFCC' }}
                        primary="Para criar suas músicas, clique ou arraste seu mouse (pressionando o botão esquerdo) nas células da grade."
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <GraphicEqIcon sx={{ color: '#FFFFFFCC' }}/>
                    </ListItemIcon>
                    <ListItemText
                        sx={{ color: '#FFFFFFCC' }}
                        primary="Existem diferentes sons para você experimentar! Mude o tipo clicando no botão 'Melódico' na parte inferior da tela."
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PlayIcon sx={{ color: '#FFFFFFCC' }}/>
                    </ListItemIcon>
                    <ListItemText
                        sx={{ color: '#FFFFFFCC' }}
                        primary="Pressione o botão de 'Play' e aproveite a sua criação."
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ShareIcon sx={{ color: '#FFFFFFCC' }}/>
                    </ListItemIcon>
                    <ListItemText
                        sx={{ color: '#FFFFFFCC' }}
                        primary="Pronto, agora basta compartilhar com seus amigos :) Para isso, pressione o botão 'compartilhar' e copie o link."
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AudiotrackIcon sx={{ color: '#FFFFFFCC' }}/>
                    </ListItemIcon>
                    <ListItemText
                        sx={{ color: '#FFFFFFCC' }}
                        primary="Se deseja tornar a sua música pública, temos um quadro musical anônimo no qual você pode salvá-las. Mas atenção, o quadro é reiniciado diariamente e não poderá modificar ou remover sua música após adicioná-la"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Container>
          </Box>
        </Dialog>
      </div>
  );
}
