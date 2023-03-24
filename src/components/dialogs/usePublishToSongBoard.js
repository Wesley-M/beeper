import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { toast } from "react-toastify";
import { api } from "../../settings";
import Popup from 'sweetalert2/src/sweetalert2.js'

export default function usePublishToSongBoard(songURL) {
  const queryClient = useQueryClient();

  const promptToPublish = () => {
    songURL.then(async url => {
      const { value: songName } = await Popup.fire({
        title: "Publish your song!",
        input: "text",
        inputLabel: "Your song's name",
        confirmButtonText: 'Save',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#282828'
      })

      if (songName) {
        saveSong(url, songName);
      }
    })
  }

  const saveSong = (url, name) => {
      const code = url.split('music=').pop();

      const saveSongReq = api.post('/songs', {
        name: name,
        content: code
      }).then(res => {
        queryClient.invalidateQueries(['songs'])
      })

      notifyUser(saveSongReq);
  }

  const notifyUser = (req) => {
    toast.promise(
      req,
      {
        pending: 'Saving in progress...',
        success: 'Song registered!',
        error: {
          render: ({ data }) => getFriendlyErrorMessage(data)
        }
      }
    )
  }

  const getFriendlyErrorMessage = ({ response }) => {
    const error = response.data.message;

    const snippetToMsg = {
      "dup key: { name": "The song name already exists.",
      "dup key: { content": "Song already exists.",
      "`content` is required": "Song can't be empty.",
      "`name` is required": "Song name can't be empty."
    }

    const [ selectedSnippet ] = Object.keys(snippetToMsg).filter(snippet => error.indexOf(snippet) >= 0);
    return snippetToMsg[selectedSnippet];
  }

  return { promptToPublish }
}