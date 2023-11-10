import React, {useState, useEffect} from 'react';
import styles from './ToDoListModal.module.css';
import axios from 'axios';
import Dropdown from './ToDoListDrop';


const ToDoListModal = ({ showModal, setShowModal }) => {
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });
  const [selectedBackground, setSelectedBackground] = useState("");
  const options = ["내 워크스페이스", "팀원 전체"]

  if (!showModal) return null;
  
  const closeModal = (e) => {
    setShowModal(false);
    setFormData({ title: "" });
    setIsTitleEmpty(false);
    setSelectedBackground("");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if(isTitleEmpty && formData.title.trim()) {
      setIsTitleEmpty(false);
    }
  }

  const SubmitButton = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setIsTitleEmpty(true);
      document.getElementById('titleInput').focus();
      return;
    } else {
      setIsTitleEmpty(false);
    }
  }

  const selectBackground = (background) => {
    setSelectedBackground(background);
  }



    return (
    <div id='modalOverlay' className={styles.modalOverlay} onClick={(e) => { if(e.target.id === "modalOverlay") closeModal(); }}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>Create Board</div>
          <div className={styles.modalBody}>
            <div className={styles.tdlHeader}>
              <div className={styles.tdlHeadertitle}>Background</div>
              <div className={styles.backgroundPicker}>
               <ul>
                {['white', 'Blacksmoke', 'BlueRed', 'Daeliseok', 'GoldStar', 'Milkyway', 'Pastel', 'Rainbow', 'Rainbowvali', 'Blacklight'].map((background, index) => {
                  const isSelected = selectedBackground === background;
                  return (
                    <li key={index}>
                      <button
                        className={`${styles.backgroundimg} ${isSelected ? styles.backgroundimgSelected : ''}`}
                        type='button'
                        title={background}
                        onClick={() => selectBackground(isSelected ? "" : background)}
                        style={{
                          backgroundColor: backgroundStyles[background].backgroundColor,
                          backgroundImage: `url(/TDL/${background}.jpg)`,
                          backgroundSize: 'cover',
                        }}
                      ></button>
                    </li>
                  );
                })}
              </ul>
              </div>
            </div>
            <div className={styles.tdlBody}>
              <div className={styles.modalTitle}>Board Title <span>*</span></div>
              <div>
                <input id='titleInput' className={`${styles.modalInput} ${formData.title.trim() === '' ? styles.modalNoInput : ''}`} type="text" name='title' value={formData.title} onChange={handleChange} />
                <div className={`${styles.notitle} ${isTitleEmpty ? styles.show : styles.hide}`}>제목을 입력해주세요</div>
              </div>
              <div>
                <div className={styles.selecttitle}>공유범위 <span>*</span></div>
                <Dropdown options={options} />
              </div>
              <div className={styles.buttonbox}>
                <button className={styles.submitButton} onClick={SubmitButton}>생성</button>
                <button className={styles.cancelButton} onClick={closeModal}>닫기</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

const backgroundStyles = {
  white : { backgroundColor: "white" },
  Blacksmoke: { backgroundColor: "black" },
  BlueRed: { backgroundColor: "blue" },
  Daeliseok: { backgroundColor: "whitesmoke" },
  GoldStar: { backgroundColor: "gold" },
  Milkyway: { backgroundColor: "white" },
  Pastel: { backgroundColor: "skyblue" },
  Rainbow: { backgroundColor: "coral" },
  Rainbowvali: { backgroundColor: "purple" },
  Blacklight: { backgroundColor: "black" },
};
export default ToDoListModal;