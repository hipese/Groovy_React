import { useEffect, useState } from "react"
import style from "./MemberInfo.module.css"
import img from "./assets/쥐돌이.png"
import axios from "axios";


const MemberInfo = () => {

    const [isEdit, setEdit] = useState(false);

    const [member, setMember] = useState({});

    // 수정시 데이터를 임시로 저장하는 변수
    const [backUpMember, setBackUpMember] = useState({});
    

    useEffect(() => {
        axios.get("/api/member").then(resp => {
            console.log(resp.data);
            setMember(resp.data)
            setBackUpMember(resp.data);
        });
    }, []);

    const handleUpdate = () => {

    }
    
    // 수정 변경 취소시 데이터를 되돌리는 코드
    const handCancel=()=>{

        setMember(backUpMember);


        setEdit(false);
    }

    return (
        <div className={style.contanier}>
            <div className={style.memberInfo}>


                <div className={style.infoHeader}>

                    <div className={style.imagebox}>
                        <img src={img} alt="" /> 
                    {/* {member.profile_image}  */}
                    </div>

                    <div className={style.contentsbox}>

                        <div>
                            {member.name}
                        </div>

                        <div>
                            {member.email}
                        </div>

                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {member.contact}
                    </div>

                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={handleUpdate}>수정</button>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {member.group_name}
                    </div>

                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={handleUpdate}>수정</button>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {member.position}
                    </div>
                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={handleUpdate}>수정</button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default MemberInfo;