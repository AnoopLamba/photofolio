import backBtnIcon from "../Icons/Back-button-icon.png";
import styles from "./ImagesList.module.css";
import ImagesCard from "../Card/ImagesCard";
import ImageForm from "./ImageForm";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import { doc, collection, getDoc, onSnapshot, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../FireBase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImagesList(props) {
    const { albumId, setShowAlbum } = props;
    const [albumName, setAlbumName] = useState(null);
    const [showImageForm, setShowImageForm] = useState(false);
    const [images, setImages] = useState([]);
    const [shouldEdit, setShouldEdit] = useState(false);
    const [imageToEdit, setImageToEdit] = useState(null);

    const [showCarousel, setShowCarousel] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    //getting real time updates here
    useEffect(() => {
        const q = query(collection(db, "albums", albumId, "images"), orderBy("timestamp", "desc"));
        onSnapshot(q, (querySnapShot) => {
            const dataFromDb = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setImages(dataFromDb);
        });
    });

    // getting album name
    useEffect(() => {
        async function getAlbumName() {
            const albumRef = await getDoc(doc(db, "albums", albumId));
            setAlbumName(albumRef.data().name);
        };
        getAlbumName();
    });


    //edit image from card
    function editImage(image, event) {
        event.stopPropagation();
        localStorage.setItem("name", image.name);
        localStorage.setItem("url", image.src);
        setShouldEdit(true);
        setShowImageForm(true);
        setImageToEdit(image);
    }

    //delete image btn from card
    async function deleteImage(image, event) {
        event.stopPropagation();
        await deleteDoc(doc(db, "albums", albumId, "images", image.id));
        toast.success("Image deleted !");
    }

    //this function is not for imageForm
    function handleAddImageButton() {
        setShowImageForm(!showImageForm);
        if (shouldEdit) {
            setShouldEdit(false);
            localStorage.removeItem("name");
            localStorage.removeItem("url");
        }
    }

    //handling card click event
    function handleCardClick(index) {
        setSelectedIndex(index);
        setShowCarousel(true);
        document.body.style.overflow = "hidden";
    }

    //handling card closing event 
    function handleCardClose() {
        document.body.style.overflow = "";
        setShowCarousel(false);
    }

    return (
        <>
            {showCarousel &&
                <Carousel
                    selectedIndex={selectedIndex}
                    images={images}
                    handleCardClose={handleCardClose}
                />
            }
            <div className={styles.ImagesList}>
                {showImageForm &&
                    <ImageForm
                        albumId={albumId}
                        albumName={albumName}
                        setShouldEdit={setShouldEdit}
                        shouldEdit={shouldEdit}
                        imageToEdit={imageToEdit}
                    />
                }
                <div className={styles.imagesNav}>
                    <button onClick={() => setShowAlbum(true)} className={styles.navBackBtn}>
                        <img src={backBtnIcon} alt="back" />
                    </button>
                    <span>{images.length === 0 ? "No images !" : `Images in ${albumName}`}</span>
                    <button className={`${styles.navButton} ${showImageForm ? styles.navBtnCancel : styles.navBtnAdd}`}
                        onClick={handleAddImageButton}
                    >
                        {showImageForm ? "Cancel" : "Add image"}
                    </button>
                </div>
                <div className={styles.imagesDisplay}>
                    {images.map((image, index) => (
                        <ImagesCard
                            image={image}
                            index={index}
                            editImage={editImage}
                            deleteImage={deleteImage}
                            handleCardClick={handleCardClick}
                            key={image.timestamp}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ImagesList;