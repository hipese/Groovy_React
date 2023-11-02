import style from "./AdminSlide.module.css";

const AdminSlide = () => {
    return (
        <div className={style.AdminSlide}>
            <button className={style.btn}>
            <strong>+</strong> 관리자
          </button>
        </div>
    );
};

export default AdminSlide;