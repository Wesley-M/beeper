import CheckIcon from "@mui/icons-material/Check";
import { Alert } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { toast } from "react-toastify";
import { api } from "../settings";

export default function SharePanelDialog({songURL, ...other}) {
  const [open, setOpen] = React.useState(false);
  const [songName, setSongName] = React.useState("");

  // Get QueryClient from the context
  const queryClient = useQueryClient()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSongNameChange = (e) => {
    setSongName(e.target.value);
  }

  const saveSong = () => {
    songURL.then(url => {
      const songCode = url.split('music=').pop();

      const createReq = api.post('/songs', {
        name: songName,
        content: songCode
      }).then(res => {
        queryClient.invalidateQueries(['songs'])
      })

      toast.promise(
          createReq,
          {
            pending: 'Registro em andamento...',
            success: 'Música registrada!',
            error: {
              render({data}){
                const {response} = data;
                const msg = response.data.message;

                if (msg.indexOf("dup key: { name") >= 0) {
                  return "Música com esse nome já existe."
                } else if (msg.indexOf("dup key: { content") >= 0) {
                  return "Música duplicada."
                } else if (msg.indexOf("`content` is required") >= 0) {
                  return "Música vazia."
                }
              }
            }
          }
      )

      handleClose();
    })
  }

  return (
      <>
        <Button
            variant="contained"
            onClick={handleClickOpen}
            startIcon={<CheckIcon />}
            size="large"
            color="success"
            disableElevation
            {...other}
        >
          Salvar no quadro
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Quadro Musical</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Registre a música atual no quadro musical! Ela estará disponível para todos ouvirem por um dia inteiro.
            </DialogContentText>

            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome da música"
                type="email"
                fullWidth
                variant="outlined"
                required
                onChange={handleSongNameChange}
                sx={{
                  "margin": "1em 0"
                }}
            />

            <Alert severity="warning">
              Atenção! A música não poderá ser atualizada depois de submetida. E será removida do quadro musical
              somente ao passar de um dia.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={saveSong}>Registrar</Button>
          </DialogActions>
        </Dialog>
      </>
  );
}