// import React, { useEffect, useState } from "react";
// import { imageDb } from "./Config";
// import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";

// function FirebaseImageUpload() {
//   const [img, setImg] = useState("");
//   const [imgUrl, setImgUrl] = useState([]);

//   const handleClick = () => {
//     if (img !== null) {
//       const imgRef = ref(imageDb, `files/${v4()}`);
//       uploadBytes(imgRef, img).then((value) => {
//         console.log(value);
//         getDownloadURL(value.ref).then((url) => {
//           setImgUrl((data) => [...data, url]);
//         });
//       });
//     }
//   };

//   useEffect(() => {
//     listAll(ref(imageDb, "files")).then((imgs) => {
//       console.log(imgs);
//       imgs.items.forEach((val) => {
//         getDownloadURL(val).then((url) => {
//           setImgUrl((data) => [...data, url]);
//         });
//       });
//     });
//   }, []);

//   return (
//     <div className="App">
//       <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//       <button onClick={handleClick}>Upload</button>
//       <br />
//       {imgUrl.map((dataVal) => (
//         <div>
//           <img src={dataVal} height="200px" width="200px" />
//           <br />
//         </div>
//       ))}
//     </div>
//   );
// }
// export default FirebaseImageUpload;

// import React, { useEffect, useState } from "react";
// import { imageDb } from "./Config";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";

// function FirebaseImageUpload() {
//   const [img, setImg] = useState("");

//   const handleClick = () => {
//     if (img !== null) {
//       const imgRef = ref(imageDb, `files/${v4()}`);
//       uploadBytes(imgRef, img).then((value) => {
//         getDownloadURL(value.ref).then((url) => {
//           console.log("Uploaded Image URL:", url);
//         });
//       });
//     }
//   };

//   return (
//     <div className="App">
//       <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//       <button onClick={handleClick}>Upload</button>
//     </div>
//   );
// }

// export default FirebaseImageUpload;

// import React, { useState } from "react";
// import { imageDb } from "./Config";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";

// function FirebaseImageUpload() {
//   const [img, setImg] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const handleClick = () => {
//     if (img !== null) {
//       const imgRef = ref(imageDb, `files/${v4()}`);
//       uploadBytes(imgRef, img).then((value) => {
//         getDownloadURL(value.ref).then((url) => {
//           console.log("Uploaded Image URL:", url);

//           // Send the URL to the backend
//           sendImageUrlToBackend(url);
//         });
//       });
//     }
//   };
//   const serviceProviderId = "65cf7c6fa17678097d7d85b0";

//   const sendImageUrlToBackend = (imageUrl) => {
//     // Replace with your backend API URL
//     const backendApiUrl =
//       "http://localhost:8000/api/imgproviderurl/uploadimgurl";

//     // Replace with your actual service provider ID

//     fetch(backendApiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         serviceProviderId,
//         imagePath: imageUrl,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Image URL sent to backend:", data);
//       })
//       .catch((error) => {
//         console.error("Error sending image URL to backend:", error);
//       });
//   };
//   const fetchImageURL = () => {
//     // Replace with your backend API URL for fetching image URL by serviceProviderId
//     const backendFetchApiUrl = `http://localhost:8000/api/imgproviderurl/fetchimgurl/${serviceProviderId}`;

//     fetch(backendFetchApiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.imagePath) {
//           console.log("Image URL fetched successfully:", data.imagePath);
//           setImageUrl(data.imagePath);
//         } else {
//           console.log("No image uploaded for the given serviceProviderId");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching image URL:", error);
//       });
//   };

//   return (
//     <div className="App">
//       <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//       <button onClick={handleClick}>Upload</button>
//       <button onClick={fetchImageURL}>Fetch Image</button>
//       {imageUrl && (
//         <div>
//           <img src={imageUrl} alt="Uploaded" height="200px" width="200px" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default FirebaseImageUpload;

//final
// import React, { useState, useEffect } from "react";
// import { imageDb } from "./Config";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";

// function FirebaseImageUpload() {
//   const [img, setImg] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const serviceProviderId = "65d03ff96e2fff085239ca2f";
//   const noprofileurl =
//     "https://firebasestorage.googleapis.com/v0/b/servify1.appspot.com/o/files%2Fno%20profile.jpg?alt=media&token=d8b1e716-4e68-4441-acac-27a66b77b22f";

//   useEffect(() => {
//     fetchImageURL();
//   }, []); // Fetch image URL when component mounts

//   const handleClick = () => {
//     if (!img) {
//       alert("Please select a file before uploading.");
//       return;
//     }

//     if (!(img instanceof File)) {
//       alert("Invalid file selected. Please choose a valid file.");
//       return;
//     }

//     const imgRef = ref(imageDb, `files/${v4()}`);
//     uploadBytes(imgRef, img).then((value) => {
//       getDownloadURL(value.ref).then((url) => {
//         console.log("Uploaded Image URL:", url);

//         // Send the URL to the backend
//         sendImageUrlToBackend(url);
//       });
//     });
//   };

//   const sendImageUrlToBackend = (imageUrl) => {
//     // Replace with your backend API URL
//     const backendApiUrl =
//       "http://localhost:8000/api/imgproviderurl/uploadimgurl";

//     fetch(backendApiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         serviceProviderId,
//         imagePath: imageUrl,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Image URL sent to backend:", data);
//         // After uploading, fetch the new image URL
//         fetchImageURL();
//       })
//       .catch((error) => {
//         console.error("Error sending image URL to backend:", error);
//       });
//   };

//   const fetchImageURL = () => {
//     const backendFetchApiUrl = `http://localhost:8000/api/imgproviderurl/fetchimgurl/${serviceProviderId}`;

//     fetch(backendFetchApiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.imagePath) {
//           console.log("Image URL fetched successfully:", data.imagePath);
//           setImageUrl(data.imagePath);
//         } else {
//           console.log("No image uploaded for the given serviceProviderId");
//           setImageUrl(noprofileurl);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching image URL:", error);
//       });
//   };

//   return (
//     <div className="App">
//       <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//       <button onClick={handleClick}>Upload</button>
//       {imageUrl && (
//         <div>
//           <img src={imageUrl} alt="Uploaded" height="200px" width="200px" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default FirebaseImageUpload;

import React, { useState, useEffect } from "react";
import { imageDb } from "./Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FirebaseImageUpload() {
  const [img, setImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const serviceProviderId = "65d08ee319f485b39d721e71";
  const noprofileurl =
    "https://firebasestorage.googleapis.com/v0/b/servify1.appspot.com/o/files%2Fno%20profile.jpg?alt=media&token=d8b1e716-4e68-4441-acac-27a66b77b22f";

  useEffect(() => {
    fetchImageURL();
  }, []); // Fetch image URL when component mounts

  const handleClick = () => {
    if (!img) {
      alert("Please select a file before uploading.");
      return;
    }

    if (!(img instanceof File)) {
      alert("Invalid file selected. Please choose a valid file.");
      return;
    }

    const imgRef = ref(imageDb, `files/${v4()}`);
    uploadBytes(imgRef, img).then((value) => {
      getDownloadURL(value.ref).then((url) => {
        console.log("Uploaded Image URL:", url);

        // Send the URL to the backend
        sendImageUrlToBackend(url);
      });
    });
  };

  const sendImageUrlToBackend = (imageUrl) => {
    // Replace with your backend API URL
    const backendApiUrl =
      "http://localhost:8000/api/imgproviderurl/uploadimgurl";

    fetch(backendApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceProviderId,
        imagePath: imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image URL sent to backend:", data);
        // After uploading, fetch the new image URL
        fetchImageURL();
      })
      .catch((error) => {
        console.error("Error sending image URL to backend:", error);
      });
  };

  const fetchImageURL = () => {
    const backendFetchApiUrl = `http://localhost:8000/api/imgproviderurl/fetchimgurl/${serviceProviderId}`;

    fetch(backendFetchApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.imagePath) {
          console.log("Image URL fetched successfully:", data.imagePath);
          setImageUrl(data.imagePath);
        } else {
          console.log("No image uploaded for the given serviceProviderId");
          setImageUrl(noprofileurl);
        }
      })
      .catch((error) => {
        console.error("Error fetching image URL:", error);
      });
  };

  const handleDelete = () => {
    const backendDeleteApiUrl = `http://localhost:8000/api/imgproviderurl/deleteimg/${serviceProviderId}`;

    fetch(backendDeleteApiUrl, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(noprofileurl);
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  return (
    <div className="App">
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button onClick={handleClick}>Upload</button>
      <button onClick={handleDelete}>Remove Image</button>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" height="200px" width="200px" />
        </div>
      )}
    </div>
  );
}

export default FirebaseImageUpload;
