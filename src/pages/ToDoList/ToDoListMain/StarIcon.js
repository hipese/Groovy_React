import styles from './ToDoListMain.module.css';

const StarIcon = ({ id, isActive, onClick }) => {
  const strokeColor = isActive ? "#FFD700" : "white";
  const fillClass = isActive ? styles.ratingStarFilled : styles.ratingStarNotFilled;
  const handleClick = (event) => {
    event.stopPropagation();
    onClick(id);
  }


  return (
    <label htmlFor="rating-2" className={styles.ratingLabel}>
      <svg className={styles.ratingStar} width="15px" height="15px" viewBox="0 0 32 32" aria-hidden="true" onClick={handleClick}>
        <g transform="translate(16,16)">
          <circle className={styles.ratingStarRing} fill="none" stroke="#000" strokeWidth="16" r="8" transform="scale(0)" />
        </g>
        <g stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(16,16) rotate(180)">
            <polygon className={styles.ratingStarStroke} points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
            <polygon className={`${styles.ratingStarFill} ${fillClass}`} points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" />
          </g>
          <g transform="translate(16,16)" strokeDasharray="12 12" strokeDashoffset="12">
            <polyline className={styles.ratingStarLine} transform="rotate(0)" points="0 4,0 16" />
            <polyline className={styles.ratingStarLine} transform="rotate(72)" points="0 4,0 16" />
            <polyline className={styles.ratingStarLine} transform="rotate(144)" points="0 4,0 16" />
            <polyline className={styles.ratingStarLine} transform="rotate(216)" points="0 4,0 16" />
            <polyline className={styles.ratingStarLine} transform="rotate(288)" points="0 4,0 16" />
          </g>
        </g>
      </svg>
    </label>
  );
};

export default StarIcon;