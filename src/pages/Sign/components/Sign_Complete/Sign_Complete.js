import React, { useState } from 'react';
import Org_Chart from '../../../Org_Chart/components/Org_Chart_Modal/Org_Chart';




const Sign_Complete = () => {


    // 모달을 키거나 끌때 필요한 놈
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };


    return (
        <div>
            <button onClick={toggleModal}>모달 열기</button>
            <Org_Chart isOpen={isModalOpen} close={toggleModal}/>
        </div>
    );
}
export default Sign_Complete;