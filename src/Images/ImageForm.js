import { useEffect, useRef } from "react";
import styles from "./ImagesList.module.css";
import { db } from "../FireBase";
import { doc, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImageForm(props) {
    const { albumId, albumName, setShouldEdit, shouldEdit, imageToEdit } = props;
    const nameInputRef = useRef(null);
    const urlInputRef = useRef(null);

    useEffect(() => {
        if (shouldEdit && localStorage.getItem("name")) {
            nameInputRef.current.value = localStorage.getItem("name");
            urlInputRef.current.value = localStorage.getItem("url");
        }
    }, [shouldEdit, imageToEdit]);

    function handleClear(event) {
        event.preventDefault();
        nameInputRef.current.value = "";
        urlInputRef.current.value = "";
    }

    async function handleAddImage(event) {
        event.preventDefault();
        const imageName = nameInputRef.current.value;
        const imageUrl = urlInputRef.current.value;
        if (imageName && imageUrl) {
            const ref = collection(db, "albums", albumId, "images");
            await addDoc(ref, {
                name: imageName,
                src: imageUrl,
                timestamp: serverTimestamp()
            });
            handleClear(event);
            toast.success("Image added !");
        }
    }

    async function handleUpdateImage(event) {
        event.preventDefault();
        const imageName = nameInputRef.current.value;
        const imageUrl = urlInputRef.current.value;
        if (imageName && imageUrl) {
            const ref = doc(db, "albums", albumId, "images", imageToEdit.id);
            await updateDoc(ref, {
                name: imageName,
                src: imageUrl
            });
            handleClear(event);
            setShouldEdit(false);
            toast.success("Image Updated !");
        }
    }

    return (
        <>
            <div className={styles.ImagesForm}>
                <h3>{shouldEdit ? `Update image ${localStorage.getItem("name")}` : `Add image to ${albumName}`}</h3>
                <form>
                    <input ref={nameInputRef} type="text" placeholder="Title" required></input>
                    <input ref={urlInputRef} type="text" placeholder="Image URL" required></input>
                    <button onClick={handleClear} className={`${styles.formBtnRed} ${styles.formButton}`}>Clear</button>
                    <button className={`${styles.formBtnBlue} ${styles.formButton}`}
                        onClick={shouldEdit ? handleUpdateImage : handleAddImage}>
                        {shouldEdit ? "Update" : "Add"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default ImageForm;