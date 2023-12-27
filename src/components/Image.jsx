import React, { useEffect, useState } from "react";

function Image() {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [allImage, setAllImage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [oneImage, setOneImage] = useState(null); // Change to null

  useEffect(() => {
    getImage();
  }, []);

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
    setImageName(e.target.files[0].name);
  }

  function uploadImage() {
    fetch("http://localhost:5000/upload-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image,
        imageName: imageName,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function getImage() {
    fetch("http://localhost:5000/get-image", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllImage(data.image);
      })
      .catch((error) => console.error(error));
  }

  function handleSearch() {
    fetch(`http://localhost:5000/search-image?name=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          // Check if it's an array or object
          if (Array.isArray(data.image)) {
            // Handle multiple images
            console.log(data.image);
            setOneImage(null); // Reset oneImage state
            // Update state or perform any other actions as needed
          } else {
            // Handle a single image
            console.log(data.image);
            setOneImage(data.image);
            // Update state or perform any other actions as needed
          }
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <div>
        <input accept="image/" type="file" onChange={convertToBase64} />
      </div>
      <div>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter image name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {allImage.map((data) => (
          <img
            key={data._id}
            width={100}
            height={100}
            src={data.image}
            alt="preview"
          />
        ))}
      </div>
      <div>
        {oneImage && (
          <img width={100} height={100} src={oneImage.image} alt="preview" />
        )}
      </div>
    </div>
  );
}

export default Image;
