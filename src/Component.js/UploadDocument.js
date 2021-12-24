import React, { useState } from "react";

const Image = () => {
  if (url === "") {
    return;
  } else if (url !== "") {
    <img src={rowData.ImageUrl} style={{ width: 50 }} alt="" />;
  }
};

const UploadDocument = () => {
  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState([]);
  handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setImage(file);
      }
    }
  };

  renderImageUrl = (item) => {
    try {
      return URL.createObjectURL(item);
    } catch (err) {
      return item;
    }
  };

  handleUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`Documents/${image.name}`).put(image);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress: progress });
        storage
          .ref("Documents")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImage(url);
            setProgress(0);
          });
      });
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={() => {
          handleChange();
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          handleUpload();
        }}
      >
        Upload
      </Button>
      <div style={{ height: "20px" }}>
        {progress > 0 ? <progress value={progress} max="100" /> : ""}
      </div>
      <div>{Image}</div>
    </>
  );
};

export default UploadDocument;
