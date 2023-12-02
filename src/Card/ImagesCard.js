import { useState } from "react";
import styles from "./Card.module.css";
import editBtnIcon from "../Icons/Edit-button-icon.png";
import deleteBtnIcon from "../Icons/Delete-button-icon.png";

function ImagesCard(props) {
    const { image, index, editImage, deleteImage, handleCardClick } = props;
    const [selectedHoverIndex, setSelectedHoverIndex] = useState(null);

    return (
        <div className={styles.Card}
            onClick={() => handleCardClick(index)}
            onMouseOver={() => setSelectedHoverIndex(index)}
            onMouseLeave={() => setSelectedHoverIndex(null)}
        >
            <div
                onClick={(event) => editImage(image, event)}
                className={`${styles.cardBtn} ${styles.edit} ${selectedHoverIndex === index && styles.active}`}
            >
                <img src={editBtnIcon} alt="edit" />
            </div>
            <div
                onClick={(event) => deleteImage(image, event)}
                className={`${styles.cardBtn} ${styles.delete} ${selectedHoverIndex === index && styles.active}`}
            >
                <img src={deleteBtnIcon} alt="delete" />
            </div>
            <div className={styles.cardImage}>
                <img src={image.src} alt="album" />
            </div>
            <div className={styles.cardText}>
                <span>{image.name}</span>
            </div>
        </div>
    );
};

export default ImagesCard;