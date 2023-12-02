import styles from "./Card.module.css";
import albumIcon from "../Icons/Album-icon.png";

function AlbumsCard(props) {
    const { handleAlbumClick, album } = props;

    return (
        <div className={styles.Card} onClick={() => handleAlbumClick(album.id)}>
            <div className={`${styles.cardImage} ${styles.albumImage}`}>
                <img src={albumIcon} alt="album" />
            </div>
            <div className={styles.cardText}>
                <span>{album.name}</span>
            </div>
        </div>
    );
};

export default AlbumsCard;