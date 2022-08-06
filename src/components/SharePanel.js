import CloseIcon from "@mui/icons-material/Close";
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
import {api, FRONTEND_API} from "../settings";
import {Grid, Stack} from "@mui/material";
import {Hearing, Send} from "@mui/icons-material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SharePanel() {
  const [open, setOpen] = useState(false);
  const [songs, setSongs] = useState([]);

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

  console.log(songsReq?.data);
  
  return (
    <div>
      <Button
        sx={{
          color: "white",
          marginRight: { xs: "0", sm: "0", md: "10vw", lg: "14vw", xl: "14vw" },
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
        onClick={handleClickOpen}
      >
        Quadro Musical
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#151515" }}>
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
              Quadro Musical
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: "2em 0",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {(songsReq?.data || []).map(song => {
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
                              backgroundColor: "#000000BB",
                              padding: '1em',
                              borderRadius: '0.4em',
                              transition: 'background 250ms ease',
                              "&:hover": {
                                backgroundColor: "#000000CC"
                              }
                            }}
                        >
                          <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                            <Typography>
                              {song.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Hearing/>
                          </Grid>
                        </Grid>
                      </Link>
                    </Grid>
                )
              })}
            </Grid>
            {songsReq?.data?.length === 0 &&
                <Typography
                    sx={{
                      fontSize: {xs: '2.5em', sm: '2.5em', md: '3em', lg: '3.5em', xl: '4em'},
                      fontWeight: 'bold',
                      opacity: 0.3,
                      textAlign: 'center',
                      margin: '2em 1em'
                    }}
                >
                  Melhore o dia de alguém, compartilhe uma música hoje 😃
                </Typography>
            }
          </Container>
        </Box>
      </Dialog>
    </div>
  );
}
