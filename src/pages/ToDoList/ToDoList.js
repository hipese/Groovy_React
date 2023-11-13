import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ToDoListMain from "./ToDoListMain/ToDoListMain";
import ToDoListBoard from "./ToDoListBoard/ToDoListBoard";
import ToDoListCalendar from "./ToDoListCalendar/ToDoListCalendar";
import ToDoListTeam from "./ToDoListTeam/ToDoListTeam";

const ToDoListM = () => {
  return (
    <ToDoListMain />
  );
};
const ToDoListB = () => {
  return (
    <ToDoListBoard />
  );
};
const ToDoListC = () => {
  return (
    <ToDoListCalendar />
  );
}
const ToDoListT = () => {
  return (
    <ToDoListTeam />
  );
}

const ToDoList = () => {
  return (
    <Routes>
      <Route path="/" element={<ToDoListM />} />
      <Route path="/ToDoListBoard" element={<ToDoListB />} />
      <Route path="/ToDoListCalendar" element={<ToDoListC />} />
      <Route path="/ToDoListTeam" element={<ToDoListT />} />
    </Routes>
  );
};

export default ToDoList;