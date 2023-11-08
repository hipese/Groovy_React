import React from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './List';
import Write from './Write';
import Update from './Update';
import Detail from './Detail';
import SendMail from './SendMail';
import TempMail from './TempMail';
import MailToMe from './MailToMe';
import Spam from './Spam';

function Email() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/write" element={<Write />} />
                <Route path="/update/:seq" element={<Update />} />
                <Route path="/detail/:seq" element={<Detail />} />
                <Route path="/sent" element={<SendMail />} />
                <Route path="/tome" element={<MailToMe />} />
                <Route path="/temp" element={<TempMail />} />
                <Route path="/spam" element={<Spam />} />
            </Routes>
        </div>
    )
}

export default Email;