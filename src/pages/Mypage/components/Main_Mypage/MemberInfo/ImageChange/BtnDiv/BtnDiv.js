
import axios from "axios";
import style from "./BtnDiv.module.css"
import { useContext } from "react";
import { MemberContext } from "../../../../../../Groovy/Groovy";


const BtnDiv = ({cfile,onClose}) => {

    const members=useContext(MemberContext);

    const handleImageChange = () => {
        console.log(cfile);
        const formData = new FormData();
        formData.append("cfile", cfile);

        axios.post("/api/member", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(resp => {
            console.log(resp.data);
            members.setProfile_scr(resp.data);

            onClose(); 
        }).catch(error => {
            console.error(error);
        });


    }

    return (
        <div className={style.container}>
            <button onClick={handleImageChange} className={style.btn}>확인</button>
            <button onClick={() => { onClose() }} className={style.btn} >취소</button>
        </div>
    );
}

export default BtnDiv;