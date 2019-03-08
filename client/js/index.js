function uploadImage(event) {
  event.preventDefault();
  event.stopPropagation();
  let form = document.getElementById("#formUpload");
  let data = new FormData(form);
  let imagedata = document.querySelector("input[type=file]").files[0];
  data.append("file", imagedata);

  fetch("http://localhost:3000/api/upload", {
    mode: "no-cors",
    method: "POST",
    headers: {
      "Content-type": "undefined",
      Accept: "application/json",
      type: "formData"
    },
    body: data
  })
    .then((err, res) => {
      if (err) throw err;
      console.log(res);
      return res.json();
    })
    .then(res => {
      console.log("AQUI: ", res);
    });
  return false;
}
