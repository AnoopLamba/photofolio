import { useRef } from "react";
import styles from "./AlbumsList.module.css";
import { db } from "../FireBase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AlbumForm() {
    const nameInputRef = useRef(null);

    function handleClear(event) {
        event.preventDefault();
        nameInputRef.current.value = "";
    };

    async function handleCreateAlbum(event) {
        event.preventDefault();
        const albumName = nameInputRef.current.value;
        if (albumName) {
            await addDoc(collection(db, "albums"), {
                name: albumName,
                timestamp: serverTimestamp(),
            });
            handleClear(event);
            toast.success("Album created !");
        }
    };

    return (
        <div className={styles.AlbumForm}>
            <h3>Create an album</h3>
            <form>
                <input ref={nameInputRef} type="text" placeholder="Album name" required></input>
                <button onClick={handleClear} className={`${styles.formBtnRed} ${styles.formButton}`}>Clear</button>
                <button onClick={handleCreateAlbum} className={`${styles.formBtnBlue} ${styles.formButton}`}>Create</button>
            </form>
        </div>
    );
}

export default AlbumForm;