
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inactive from './Inactive';
import Position from './Position';
import Dept from './Dept';
import Manage from './Manage';
import Password from './Password';

function Admin() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Manage />} />
                <Route path="/password" element={<Password />} />
                <Route path="/inactive" element={<Inactive />} />
                <Route path="/position" element={<Position />} />
                <Route path="/dept" element={<Dept />} />
            </Routes>
        </div>
    )
}

export default Admin;