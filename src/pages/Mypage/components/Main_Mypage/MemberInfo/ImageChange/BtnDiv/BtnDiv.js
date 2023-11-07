
import axios from "axios";
import style from "./BtnDiv.module.css"


const BtnDiv = ({fileName,onClose}) => {
    
    console.log(fileName);
    const handleImageChange=()=>{
        axios.get(`/api/member/${fileName}`).then(resp=>{
            console.log(resp);
        })
    }

    return (
        <div className={style.container}>
            <button onClick={handleImageChange} className={style.btn}>확인</button>
            <button onClick={() => {onClose()}}  className={style.btn} >취소</button>
        </div>
    );
}

export default BtnDiv;