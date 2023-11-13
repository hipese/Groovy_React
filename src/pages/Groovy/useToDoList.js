import { useState, useEffect } from 'react';
import axios from 'axios';

export const useToDoList = () => {
    const [todoList, setTodoList] = useState([]);
    
  const toggleStar = async (id) => {
    const updatedList = todoList.map((todo, index) => {
      if (index === id) {
        return { ...todo, isActive: !todo.isActive };
      }
      return todo;
    });
    setTodoList(updatedList);

    const selectedTodo = updatedList[id];

    // isActive가 true로 설정된 경우 서버에 데이터 보내기
    if (selectedTodo.isActive) {
      const dataToSend = { parent_seq: selectedTodo.seq, id: selectedTodo.id };
      try {
        await axios.post("/api/tdlbookmark", dataToSend);
      } catch (error) {
        console.error("Error sending data to server:", error);
      }
    }
    else {
        try {
            await axios.delete(`/api/tdlbookmark/${selectedTodo.seq}`);
        } catch (error) {
            console.error("Error deleting data from server:", error);
        }
    }
  };

    const getTodoList = async () => {
        try {
            const res = await axios.get("/api/tdList");
            let updatedTodoList = res.data.map(todo => ({ ...todo, isActive: false }));

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

    return { todoList, setTodoList, toggleStar ,ListAdded };
}
