
import axios from "axios";
import style from "./BtnDiv.module.css"


const BtnDiv = ({ cfile, onClose }) => {

    console.log(cfile);
    const handleImageChange = () => {

        const formData = new FormData();
        formData.append("cfile", cfile);

        axios.post("/api/member/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(resp => {
            console.log(resp.data);
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