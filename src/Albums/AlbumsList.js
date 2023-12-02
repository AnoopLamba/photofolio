import styles from "./AlbumsList.module.css";
import AlbumsCard from "../Card/AlbumsCard";
import AlbumForm from "./AlbumForm";

function AlbumsList(props) {
    const { albums, handleAlbumClick, showAlbumForm, setShowAlbumForm } = props;

    return (
        <div className={styles.AlbumsList}>
            {showAlbumForm && <AlbumForm />}
            <div className={styles.albumNav}>
                <span>Your Albums</span>
                <button className={`${styles.navButton} ${showAlbumForm ? styles.navBtnCancel :styles.navBtnAdd}`}
                    onClick={() => setShowAlbumForm(!showAlbumForm)}
                >
                    {showAlbumForm ? "Cancel" : "Add Album"}
                </button>
            </div>
            <div className={styles.albumsDisplay}>
                {albums.map((album) => (
                    <AlbumsCard handleAlbumClick={handleAlbumClick} key={album.id} album={album} />
                ))}
            </div>
        </div>
    );
};

export default AlbumsList;