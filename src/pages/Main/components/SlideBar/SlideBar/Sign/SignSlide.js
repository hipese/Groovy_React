import style from "./SignSlide.module.css";


const SignSlide = () => {
    return (
        <div className={style.SignSlide}>

            <div className={style.btndiv}>
                <button className={style.writeBtn}><strong>전자 결재 작성</strong></button>
            </div>


            <div className={style.btndiv}>
                <button className={style.btn}>전자결제 홈</button>
            </div>

            <div className={style.btndiv}>
                <button className={style.btn}>새결제 진행</button>
            </div>

            <div className={style.btndiv}>
                <button className={style.btn}>결제대기중</button>
            </div>

            <div className={style.btndiv}>
                <button className={style.btn}>진행대기중</button>
            </div>

            <div className={style.btndiv}>
                <button className={style.btn}>진행중문서</button>
            </div>

            <div className={style.btndiv}>
                <button className={style.btn}>완료문서</button>
            </div>


        </div>
    );
};

export default SignSlide;