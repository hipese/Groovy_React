
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './List';
import Write from './Write';
import Update from './Update';
import Detail from './Detail';
import ComBoard from './ComBoard';
import ComFreeBoard from './ComFreeBoard';
import DeptBoard from './DeptBoard';
import DeptFreeBoard from './DeptFreeBoard';

function Board() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/write" element={<Write />} />
                <Route path="/update/:seq" element={<Update />} />
                <Route path="/detail/:seq" element={<Detail />} />
                <Route path="/com" element={<ComBoard />} />
                <Route path="/comfree" element={<ComFreeBoard />} />
                <Route path="/dept" element={<DeptBoard />} />
                <Route path="/deptfree" element={<DeptFreeBoard />} />
            </Routes>
        </div>
    )
}

export default Board;