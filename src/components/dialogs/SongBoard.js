import {Grid, Stack, styled} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Link from '@mui/material/Link';
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useQuery } from '@tanstack/react-query';
import * as React from "react";
import { useState } from "react";
import { api, FRONTEND_API } from "../../settings";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {ReactComponent as Logo} from '../../images/logo.svg'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const PublishingPanelRevealTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SongCard = ({song}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Link
        href={`${FRONTEND_API}?music=${song.content}`}
        sx={{
          textDecoration: 'none',
          color: '#FFFFFFDC',
          fontWeight: 'bold',
          width: '30%',
          "&:hover": {
            color: '#FFFFFF'
          }
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{
            backgroundColor: "#FFFFFF10",
            padding: '0.75em',
            borderRadius: '0.5em',
            transition: 'background 500ms ease-in-out',
            "&:hover": {
              backgroundColor: "#FFFFFF20"
            }
          }}
        >
          <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
            <PlayArrowRoundedIcon/>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
            <Typography noWrap sx={{ fontSize: '1em' }} title={song.name}>
              {song.name}
            </Typography>
          </Grid>
        </Grid>
      </Link>
    </Grid>
  );
}

export default function SongBoard() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSongs = async () => {
    const {data} = await api.get("/songs");
    return data;
  }

  const songsReq = useQuery(["songs"], getSongs);
  
  return (
    <div>
      <Button
        sx={{
          whiteSpace: "nowrap",
          color: '#FFFFFFCC',
          "&:hover": {
            color: "#FFF"
          }
        }}
        onClick={handleClickOpen}
      >
        Song Board
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={PublishingPanelRevealTransition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#151515" }}>
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
            minHeight: "100vh",
            backgroundColor: "#282828",
            padding: "2em 0",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{
                color: 'white',
                fontSize: '1.5em',
                fontWeight: 'bold',
                padding: '1em 0'
              }}
            >
              Song Board
            </Typography>

            <Grid container spacing={2}>
              {(songsReq?.data || []).map(song => <SongCard song={song}/>)}
            </Grid>
            {songsReq?.data?.length === 0 &&
                <Stack direction="column"  alignItems="center">
                  <Typography
                    sx={{
                      fontSize: {xs: '3.5em', md: '4em', xl: '5em'},
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: '1em',
                      color: '#FFFFFF40',
                      flex: 1
                    }}
                  >
                    ಥ﹏ಥ
                  </Typography>
                  <Typography
                      sx={{
                        fontSize: {xs: '1.5em', md: '2.5em', xl: '3.5em'},
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: '1em',
                        color: '#FFFFFF40',
                        flex: 4
                      }}
                  >
                    It's all empty here!<br/>
                    Share a song today ♫
                  </Typography>
                </Stack>
            }
          </Container>
        </Box>
      </Dialog>
    </div>
  );
}
