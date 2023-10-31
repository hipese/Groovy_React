import style from './DashBoard.module.css';
const Worksection = () => {
    return(
        <div className={style.worksection}>
            asd
        </div>
    )
}

const Signsection = () => {
    return (
        <div className={style.signsection}>
            sign
        </div>
    )
}

const Calandarsection = () => {
    return (
        <div className={style.calandarsection}>
            calandar
        </div>
    )
}

const DashBoard=()=>{
    return(
        <div className={style.innerpad}>
            <Worksection></Worksection>
            <Signsection></Signsection>
            <Calandarsection></Calandarsection>

        </div>
    )
}

export default DashBoard;