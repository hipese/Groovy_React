
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './List';
import Write from './Write';
import Detail from './Detail';

function Board() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/write" element={<Write />} />
                <Route path="/detail/:seq" element={<Detail />} />
            </Routes>
        </div>
    )
}

export default Board;