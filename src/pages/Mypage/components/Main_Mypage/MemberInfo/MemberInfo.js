import style from "./MemberInfo.module.css"



const MemberInfo=()=>{
    return(
        <div className={style.contanier}>
            <div className={style.memberInfo}>
                맴버의 기본 정보를 정보를 가저온다.
            </div>
        </div>
    );
}

export default MemberInfo;