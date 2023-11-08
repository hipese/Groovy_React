
import axios from "axios";
import style from "./BtnDiv.module.css"


const BtnDiv = ({ cfile, src,setProfile_scr,onClose }) => {

    
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
            setProfile_scr(resp.data);

            console.log(src)
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