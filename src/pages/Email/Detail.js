import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = () => {
    const { seq } = useParams();
    const [Mail, setMail] = useState({});
    const [receip, setReceip] = useState({});
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get(`/api/mails/${seq}`).then((resp) => {
            setMail(resp.data);
        });
        axios.get(`/api/mails/mem/${seq}`).then((resp) => {
            setReceip(resp.data);
        });
    }, [seq]);

    useEffect(() => {
        axios.get(`/api/mailFile/${seq}`).then((resp) => {
            setFiles(resp.data);
        });
    }, [seq]);

    const handleDownload = (sysName) => {
        axios.get(`/api/mailFile/download/${sysName}`, {
            responseType: 'blob',
        })
            .then((response) => {
                const file = new Blob([response.data], { type: response.headers['content-type'] });
                const fileURL = URL.createObjectURL(file);

                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', sysName);
                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
                URL.revokeObjectURL(fileURL);
            })
            .catch((error) => {
            });
    };

    return (
        <div className={style.mailContainer}>
            <div className={style.mail}>
                <div className={style.title}>{Mail.title}</div>
                <div className={style.sender}>받는 사람: {Mail.name} {Mail.email}</div>
                <div className={style.receipient}>작성자: {receip.name} {receip.email}</div>
                <div className={style.date}>{Mail.write_date}</div>
                <hr />
                {files.length > 0 && (
                    <><div className={style.file}>
                        첨부 파일 :
                        <div className={style.files}>
                            {files.map((file) => (
                                <p key={file.file_seq}>
                                    |{" "}
                                    <span
                                        style={{ color: "blue", cursor: "pointer" }}
                                        onClick={() => handleDownload(file.sys_name)}
                                    >
                                        {file.ori_name}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                        <hr></hr>
                    </>
                )}
                <div className={style.contents}>{Mail.contents}</div>
                <div align="end" className={style.buttons}>
                    <Link to="/groovy/mail">
                        <button>Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Detail;
