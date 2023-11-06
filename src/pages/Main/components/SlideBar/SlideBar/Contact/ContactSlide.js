import style from "./ContactSlide.module.css";

const ContactSlide = () => {

    return (
        <div>
            <div className={style.mainbtn_container}>
                <button className={style.mainbtn}>
                    <strong>회사 주소록</strong>
                </button>
            </div>
            <div className={style.subbtn_container}>
                <div className={style.subbtn_wrapper}>
                    <button className={style.subbtn}>
                        즐겨찾기
                    </button>
                </div>
                <div className={style.subbtn_wrapper}>
                    <button className={style.subbtn}>
                        소속 주소록
                    </button>
                </div>
                <div className={style.subbtn_wrapper}>
                    <button className={style.subbtn}>
                        외부 주소록
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactSlide;