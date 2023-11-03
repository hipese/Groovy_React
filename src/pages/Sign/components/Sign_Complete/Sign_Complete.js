import React, { useState } from 'react';
import Org_Chart from '../../../Org_Chart/components/Org_Chart_Modal/Org_Chart';



const Sign_Complete = () => {

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