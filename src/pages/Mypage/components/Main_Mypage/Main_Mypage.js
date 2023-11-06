import style from "./Main_Mypage.module.css"
import MemberInfo from "./MemberInfo/MemberInfo";


const Mypage=()=>{
    return(
        <div className={style.container}>
            <MemberInfo/>
        </div>
    );
}

export default Mypage;