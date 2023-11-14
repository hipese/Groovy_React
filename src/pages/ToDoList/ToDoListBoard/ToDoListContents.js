import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; 
import styles from "./ToDoListBoard.module.css";

function DragDropList() {
  const [items, setItems] = useState(["JavaScript", "SCSS", "HTML5", "Awesome DnD", "Follow me"]);
  const [newItem, setNewItem] = useState("");

  const handleOnDragEnd = (result) => { 
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  const handleAddItem = () => { 
    if (newItem) { // newItem이 비어 있지 않은 경우에만 추가
      setItems(oldItems => [...oldItems, newItem]);
      setNewItem(""); // 입력 필드 초기화
    }
  };

  return (
    <div className={styles.tdlcontents}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppableList">
          {(provided) => (
            <ol className={styles.tdlol}>
              <li className={styles.tdlinput}>
                <div className={styles.tdllisttitle}>1번 Seq</div>
                  <ul className={styles.tdlul} {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                       <Draggable key={`item-${index}`} draggableId={`item-${index}`} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.tdlli} >
                              {item}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                  <div className={styles.tdllistadd}>
                    <input
                    className={styles.tdllistinput} type="text"
                      value={newItem}
                      onChange={e => setNewItem(e.target.value)} // 입력 시 newItem 상태 업데이트
                      onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                      placeholder="Add items in list"
                    />
                    <button className={styles.tdllistaddedbtn} type='button'
                      onClick={handleAddItem}>                   
                      List Add
                    </button>
                  </div>
              </li>
              <div className={styles.newcard}>
                <div className={styles.newlistadd}>
                  <button className={styles.newlistaddbtn}><strong>+</strong> Add a list</button>
                </div>
              </div>
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DragDropList;