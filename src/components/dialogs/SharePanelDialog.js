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
import { api } from "../../settings";
import { CustomButton } from "../ui/CustomButton";

export default function SharePanelDialog({ songURL, ...other }) {
  const [open, setOpen] = React.useState(false);
  const [songName, setSongName] = React.useState("");

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
          pending: 'Saving in progress...',
          success: 'Song registered!',
          error: {
            render({ data }) {
              const { response } = data;
              const msg = response.data.message;

              console.log(msg);

              if (msg.indexOf("dup key: { name") >= 0) {
                return "The song name already exists."
              } else if (msg.indexOf("dup key: { content") >= 0) {
                return "Song already exists."
              } else if (msg.indexOf("`content` is required") >= 0) {
                return "Song can't be empty."
              } else if (msg.indexOf("`name` is required") >= 0) {
                return "Song name can't be empty."
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
      <CustomButton
        onClick={handleClickOpen}
        Icon={CheckIcon}
        text='Publish'
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Song Board</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: "1.5em" }}>
            Caution! Songs can't be changed after submition.
            Only after a whole day it will be removed.
          </Alert>

          <DialogContentText>
            Publish your current song:
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Song name"
            type="email"
            fullWidth
            variant="outlined"
            required
            onChange={handleSongNameChange}
            sx={{
              "margin": "1em 0"
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveSong}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}