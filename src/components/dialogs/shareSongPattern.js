import {toast} from "react-toastify";
import Popup from 'sweetalert2/src/sweetalert2.js'

export const shareSongPattern = (patternUrl) => {
  patternUrl.then(url => {
    if (url === "") {
      toast('Empty Song', {type: 'error'});
    } else {
      Popup.fire({
        title: 'Share your song!',
        html: `<input id="swal-input1" class="swal2-input" value=${url} disabled/>`,
        confirmButtonText: 'Copy',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#282828'
      }).then((result) => {
        if (result.isConfirmed) {
          navigator.clipboard.writeText(url).then(function () {
            Popup.fire({
              title: "Copied!",
              text: "Now you just need to share it with your friends!",
              confirmButtonColor: '#3085d6'
            })
          }, function (err) {
            console.error('Async: Could not copy text: ', err);
          });
        }
      });
    }
  })
}