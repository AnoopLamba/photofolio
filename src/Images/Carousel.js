import { useState } from "react";
import styles from "./Carousel.module.css";

function Carousel(props) {
    const { selectedIndex, images, handleCardClose } = props;
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);

    function handleImageScroll(number) {
        const length = images.length;
        const newIndex = (currentIndex + number + length) % length;
        setCurrentIndex(newIndex);
    }

    return (
        <div className={styles.carouselContainer}>
            <button className={styles.carouBtn} onClick={() => handleImageScroll(-1)}>&lt;</button>
            <img src={images[currentIndex].src} className={styles.carouselImage} alt="carousel" />
            <button className={styles.carouBtn} onClick={() => handleImageScroll(1)}>&gt;</button>
            <button
                className={`${styles.carouBtn} ${styles.carouClose}`}
                onClick={handleCardClose}
            >
                X
            </button>
        </div>
    );
};

export default Carousel;