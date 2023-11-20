import React from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './List';
import Write from './Write';
import Detail from './Detail';
import SendMail from './SendMail';
import MailToMe from './MailToMe';
import Waste from './Waste';

function Email() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/write" element={<Write />} />
                <Route path="/detail/:seq" element={<Detail />} />
                <Route path="/sent" element={<SendMail />} />
                <Route path="/tome" element={<MailToMe />} />
                <Route path="/waste" element={<Waste />} />
            </Routes>
        </div>
    )
}

export default Email;