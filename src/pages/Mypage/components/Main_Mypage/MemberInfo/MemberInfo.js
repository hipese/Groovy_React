import style from "./MemberInfo.module.css"
import img from "./assets/쥐돌이.png"


const MemberInfo = () => {

    const handleUpdate=()=>{

    }


    return (
        <div className={style.contanier}>
            <div className={style.memberInfo}>


                <div className={style.infoHeader}>

                    <div className={style.imagebox}>
                        <img src={img} alt="" />
                        이미지 넣어라
                    </div>

                    <div className={style.contentsbox}>
                        정보1(이름 메일주소)
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        전화번호 출력
                    </div>

                    <div className={style.btndiv}>
                        <button onClick={handleUpdate}>수정</button>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        부서이름 출력
                    </div>

                    <div className={style.btndiv}>
                        <button onClick={handleUpdate}>수정</button>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        직책 출력
                    </div>
                    <div className={style.btndiv}>
                        <button onClick={handleUpdate}>수정</button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default MemberInfo;