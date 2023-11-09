
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inactive from './Inactive';
import AccessTime from './AccessTime';
import User from './User';
import Manage from './Manage';

function Admin() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Manage />} />
                <Route path="/inactive" element={<Inactive />} />
                <Route path="/time" element={<AccessTime />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </div>
    )
}

export default Admin;