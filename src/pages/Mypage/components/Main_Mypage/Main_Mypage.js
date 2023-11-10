import style from "./Main_Mypage.module.css"
import MemberInfo from "./MemberInfo/MemberInfo";
import MypageIndex from "./MypageIndex/MypageIndex";


const Mypage = () => {
    return (
        <div className={style.container}>
            <div className={style.index}>
                  <MypageIndex/>
            </div>
            <div className={style.contents}>
                <MemberInfo />
            </div>

        </div>
    );
}

export default Mypage;