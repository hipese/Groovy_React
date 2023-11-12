import React, {useState, useEffect} from 'react';
import styles from './ToDoListModal.module.css';
import axios from 'axios';
import Dropdown from './ToDoListDrop';


const ToDoListModal = ({ showModal, setShowModal, ListAdded }) => {
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState("white");
  const options = ["내 워크스페이스", "팀원 전체"];
  const defaultBackground = 'StarryNight';
  const [formData, setFormData] = useState({
    title: "",
    background: defaultBackground,
    workspace: "내 워크스페이스",
    bgimg: `/TDL/${defaultBackground}.jpg`,
  });

  if (!showModal) return null;
  
  const closeModal = (e) => {
    setShowModal(false);
    setFormData({ title: "", background: "white", workspace: "내 워크스페이스", bgimg: `/TDL/${defaultBackground}.jpg` });
    setIsTitleEmpty(false);
    setSelectedBackground("white");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setIsTitleEmpty(true);
      document.getElementById('titleInput').focus();
      return;
    }
    try {
      await axios.post("/api/tdList", formData);
      ListAdded();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  const selectBackground = (background) => {
    const backgroundUrl = `/TDL/${background}.jpg`;
    setSelectedBackground(background);
    setFormData({
      ...formData,
      bgimg: backgroundUrl,
    });
  }
  const backgroundNames = {
  StarryNight: "별이 빛나는 밤",
  TheGleaners: "이삭 줍는 여인들",
  LibertyLeadingthePeople: "자유를 인도하는 자유의 여신",
  Sunrise: "일출",
  TheSchoolofAthens: "아테네 학당",
  StarryNightOvertheRhone: "론 강가의 별이 빛나는 밤",
  CafeTerraceatNight: "밤의 카페 테라스",
  TheNightWatch: "밤의 감시",
  TheRaftoftheMedusa: "메두사의 뗏목",
  LasMeninas: "라스 메니나스",
};

    return (
    <div id='modalOverlay' className={styles.modalOverlay} onClick={(e) => { if(e.target.id === "modalOverlay") closeModal(); }}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>Create Board</div>
          <div className={styles.modalBody}>
            <div className={styles.tdlHeader}>
              <div className={styles.tdlHeadertitle}>Background</div>
              <div className={styles.backgroundPicker}>
               <ul>
                {['StarryNight', 'TheGleaners', 'LibertyLeadingthePeople', 'Sunrise', 'TheSchoolofAthens', 'StarryNightOvertheRhone', 'CafeTerraceatNight', 'TheNightWatch', 'TheRaftoftheMedusa', 'LasMeninas'].map((background, index) => {
                  const isSelected = selectedBackground === background;
                  return (
                    <li key={index}>
                      <button
                        className={`${styles.backgroundimg} ${isSelected ? styles.backgroundimgSelected : ''}`}
                        type='button'
                        title={backgroundNames[background]}
                        name='bgimg'
                        value={formData.bgimg}
                        onClick={() => selectBackground(background)}
                        style={{
                          backgroundColor: backgroundStyles[background].backgroundColor,
                          backgroundImage: `url(/TDL/${background}.jpg)`,
                          backgroundSize: 'cover'
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
                <Dropdown options={options} name='workspace' value={formData.workspace} onChange={value => handleChange({ target: {name: 'workspace', value}})} />
              </div>
              <div className={styles.buttonbox}>
                <button className={styles.submitButton} onClick={handleSubmit}>생성</button>
                <button className={styles.cancelButton} onClick={closeModal}>닫기</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

const backgroundStyles = {
  StarryNight : { backgroundColor: "white" },
  TheGleaners: { backgroundColor: "black" },
  LibertyLeadingthePeople: { backgroundColor: "blue" },
  Sunrise: { backgroundColor: "whitesmoke" },
  TheSchoolofAthens: { backgroundColor: "gold" },
  StarryNightOvertheRhone: { backgroundColor: "white" },
  CafeTerraceatNight: { backgroundColor: "skyblue" },
  TheNightWatch: { backgroundColor: "coral" },
  TheRaftoftheMedusa: { backgroundColor: "purple" },
  LasMeninas: { backgroundColor: "black" },
};
export default ToDoListModal;