import logoImage from "./Icons/App-icon.png";
import AlbumsList from "./Albums/AlbumsList";
import ImagesList from "./Images/ImagesList";
import { useEffect, useState } from "react";
import { db } from "./FireBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function App() {
  const [showAlbum, setShowAlbum] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showAlbumForm, setShowAlbumForm] = useState(false);

  // get real time updates here by setting up listener on this component
  useEffect(() => {
    const q = query(collection(db, "albums"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapShot) => {
      const dataFromDB = querySnapShot.docs.map((doc) => (
        {
          id: doc.id,
          ...doc.data()
        }
      ));
      setAlbums(dataFromDB);
    });
  }, []);

  function handleAlbumClick(id) {
    setSelectedAlbum(id);
    setShowAlbum(false);
  }

  return (
    <div className="App">
      <nav>
        <img className="logo-image" src={logoImage} alt="logo-icon"></img>
        <span className="logo-heading">Photofolio</span>
      </nav>
      <main>
        <div className="display-container">
          {showAlbum ?
            <AlbumsList albums={albums}
              handleAlbumClick={handleAlbumClick}
              showAlbumForm={showAlbumForm}
              setShowAlbumForm={setShowAlbumForm}
            /> :
            <ImagesList albumId={selectedAlbum}
              setShowAlbum={setShowAlbum}
            />
          }
        </div>
      </main>
    </div>
  );
}

export default App;
