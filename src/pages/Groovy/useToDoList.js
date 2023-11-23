import { useState, useEffect } from 'react';
import axios from 'axios';

export const useToDoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [tdlbg, setTdlbg] = useState([]);
    
  const toggleStar = async (id) => { // 즐겨찾기 버튼을 누르면 isActive가 true로 설정된다.
    const updatedList = todoList.map((todo, index) => {
      if (index === id) {
        return { ...todo, isActive: !todo.isActive };
      }
      return todo;
    });
    setTodoList(updatedList);

    const selectedTodo = updatedList[id];

    if (selectedTodo.isActive) {// isActive가 true로 설정된 경우 서버에 데이터 보내기
      const dataToSend = { parent_seq: selectedTodo.seq, id: selectedTodo.id };
      try {
        await axios.post("/api/tdlbookmark", dataToSend);
      } catch (error) {
        console.error("Error sending data to server:", error);
      }
    }
    else {
        try { // isActive가 false로 설정된 경우 서버에서 데이터 삭제
            await axios.delete(`/api/tdlbookmark/${selectedTodo.seq}`);
        } catch (error) {
            console.error("Error deleting data from server:", error);
        }
    }
  };

    const getTodoList = async () => { // DB에 저장된 할 일 목록을 가져온다, 즐겨찾기 목록도 가져온다, Background 목록도 가져온다.
        try {
            const res = await axios.get("/api/tdList");
            let updatedTodoList = res.data.map(todo => ({ ...todo, isActive: false }));
          
            const tdlbg = await axios.get("/api/tdlbackground");
            setTdlbg(tdlbg.data); 

            const bookmarksRes = await axios.get("/api/tdlbookmark");
            const bookmarks = bookmarksRes.data;

            updatedTodoList = updatedTodoList.map(todo => {
                const isBookmarked = bookmarks.some(bookmark => bookmark.parent_seq === todo.seq);
                return { ...todo, isActive: isBookmarked };
            });
            setTodoList(updatedTodoList);

        } catch (error) {
            console.error("Error fetching data from server:", error);
        }
    }

    useEffect(() => {
        getTodoList();
    }, []);

    const ListAdded = () => { 
        getTodoList();
    }

    return { todoList, setTodoList, toggleStar, ListAdded, tdlbg, setTdlbg };
}
