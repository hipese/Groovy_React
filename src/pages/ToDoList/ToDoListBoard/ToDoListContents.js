import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; 
import styles from "./ToDoListBoard.module.css";
import { MemberContext } from "../../Groovy/Groovy";
import axios from 'axios';

function DragDropList({ parent_seq }) {
  const members = React.useContext(MemberContext);
  const [items, setItems] = useState([]);
  const [itemsByTitle, setItemsByTitle] = useState({});
  const [newTitle, setNewTitle] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newDbTitle, setNewDbTitle] = useState([]);
  const [newListAdded, setNewListAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 드래그가 종료되었을 때
  const handleOnDragEnd = async (result) => {
    const { destination, source } = result; // 드래그가 시작된 위치와 종료된 위치
    if (!destination) return; // 드래그가 종료된 위치가 없으면 종료 -> 제자리면 종료
    if (destination.droppableId === source.droppableId && destination.index === source.index) return; // 드래그가 종료된 위치가 시작된 위치와 같으면 종료
    
    const sourceListID = source.droppableId.split('-')[1]; // 드래그가 시작된 위치의 droppableId 
    const destinationListID = destination.droppableId.split('-')[1]; // 드래그가 종료된 위치의 droppableId

    let newItemsByTitle = { ...itemsByTitle }; // itemsByTitle을 복사해서 새로운 객체를 만듦
    if (sourceListID === destinationListID) { // 드래그가 시작된 위치와 종료된 위치가 같으면
      const items = Array.from(newItemsByTitle[sourceListID]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      items.forEach((item, index) => (item.order = index + 1));
      newItemsByTitle[sourceListID] = items;
    } else { // 드래그가 시작된 위치와 종료된 위치가 다르면
      const sourceItems = Array.from(newItemsByTitle[sourceListID]); // 드래그가 시작된 위치의 items
      const [removedItem] = sourceItems.splice(source.index, 1); // 드래그가 시작된 위치의 items에서 드래그가 시작된 위치의 index에 해당하는 item을 삭제
      const destItems = Array.from(newItemsByTitle[destinationListID]); // 드래그가 종료된 위치의 items
      destItems.splice(destination.index, 0, removedItem); // 드래그가 종료된 위치의 items에서 드래그가 종료된 위치의 index에 해당하는 위치에 삭제한 item을 삽입
      // 쉽게 말해서 드래그가 시작된 위치의 item을 삭제하고 드래그가 종료된 위치의 index에 해당하는 위치에 삽입

      sourceItems.forEach((item, index) => (item.order = index + 1)); // 드래그가 시작된 위치의 items의 order를 재설정
      destItems.forEach((item, index) => (item.order = index + 1)); // 드래그가 종료된 위치의 items의 order를 재설정

      newItemsByTitle[sourceListID] = sourceItems; // 새로운 객체의 시작된 위치의 items를 재설정
      newItemsByTitle[destinationListID] = destItems; // 새로운 객체의 종료된 위치의 items를 재설정
    }
    setItemsByTitle(newItemsByTitle); // itemsByTitle을 새로운 객체로 재설정해줘서 화면을 다시 렌더링


    try {
      const response = await axios.put(`/api/tdlcontents/order`, newItemsByTitle[destinationListID]); // DB에 저장된 items의 순서를 변경
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleInputChange = (titleseq, value) => { // Contents쪽 input에 입력되는 값
    setNewItem(prevItaems => ({ ...prevItaems, [titleseq]: value }));
  };

  const handleAddTitle = async () => { // Title을 추가해서 DB에 저장하는 함수
    if (newTitle) {
      const response = await axios.post(`/api/tdltitle`, ({ id: members.member.id, title: newTitle, parent_seq: parent_seq }));
      getTitles();
      setNewTitle("");
    }
  }
  const getTitles = async () => { // DB에 저장된 Title을 불러오는 함수
    const response = await axios.get(`/api/tdltitle/${parent_seq}`, { params: { parent_seq: parent_seq } });
    setNewDbTitle(response.data);
    setIsLoading(false);
  }
  useEffect(() => { // Title을 불러오는 함수를 실행
    getTitles();
  }, [parent_seq]);
  const handleAddTitleAndToggle = async () => { // Title을 추가하고 창을 닫는 함수 
    await handleAddTitle();
    toggleListAdded();
  };
  const handleBackgroundClick = (e) => { // Title을 추가하는 창을 제외한 다른 곳을 클릭했을 때 창을 닫는 함수
    if (!e.target.closest(`.${styles.newlistadd2}`) && newListAdded) {
      toggleListAdded();
    }
  };
  useEffect(() => { // Title을 추가하는 창을 제외한 다른 곳을 클릭했을 때 창을 닫는 함수를 실행
    document.addEventListener('mousedown', handleBackgroundClick);
    return () => {
      document.removeEventListener('mousedown', handleBackgroundClick);
    }
  }, [newListAdded]);

  const handleDeleteTitle = async (titleseq) => { // Title을 삭제하는 함수
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");

    if (!isConfirmed) return;
    else {
      const response = await axios.delete(`/api/tdltitle/${titleseq}`, { params: { seq: titleseq } });
      getTitles();
    }
  }

  /////////////////////////////////여기까지가 Title쪽 함수들 /////////////////////////////////

  const handleAddContents = async (titleseq) => { // Contents를 추가해서 DB에 저장하는 함수
    if (newItem[titleseq]) {
      const order = itemsByTitle[titleseq] ? itemsByTitle[titleseq].length + 1 : 1;
      const response = await axios.post(`/api/tdlcontents`, ({ id: members.member.id, contents: newItem[titleseq], order:order, parent_seq: titleseq }));
      getContents(titleseq);
      setNewItem(prevItaems => ({ ...prevItaems, [titleseq]: "" }));
    }
  };
  const getContents = async (titleseq) => { // DB에 저장된 Contents를 불러오는 함수
    if (titleseq) {
      const response = await axios.get(`/api/tdlcontents/${titleseq}`, { params: { parent_seq: titleseq } });
      const sortedItems = response.data.sort((a, b) => a.order - b.order);
      setItems(sortedItems);
      setItemsByTitle(prevItem => ({ ...prevItem, [titleseq]: sortedItems }))
    } else {
      setItems([]);
    }
  }
  useEffect(() => { // DB에 저장된 Contents를 불러오는 함수를 실행
    if(newDbTitle.length > 0) {
      getContents(newDbTitle[0].seq);
    }
  }, [newDbTitle]);
  const toggleListAdded = () => { // Title을 추가하는 창을 열고 닫는 함수
    setNewListAdded(!newListAdded);
  };

  const handleDeleteContents = async (titleseq, contentsseq) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");

    if (!isConfirmed) return;

    try {
      // 항목 삭제
      await axios.delete(`/api/tdlcontents`, { params: { seq: contentsseq } });

      // 현재 리스트에서 삭제된 항목 이후의 모든 항목들의 order 업데이트
      const updatedItems = itemsByTitle[titleseq].filter(item => item.seq !== contentsseq)
        .map((item, index) => ({ ...item, order: index + 1 }));

      // 새로운 order 값으로 상태 업데이트
      setItemsByTitle(prevItems => ({ ...prevItems, [titleseq]: updatedItems }));

      // DB에 order 업데이트 요청
      await axios.put(`/api/tdlcontents/order`, updatedItems);
    } catch (error) {
      console.error('Error in deleting contents:', error);
    }
  };
  /////////////////////////////////여기까지가 Contents쪽 함수들 /////////////////////////////////

  // 로딩중일 때 보여줄 화면 렌더링 및 title과 contents를 불러오는 함수
  const fetchData = async () => {
    try {
      setIsLoading(true);
      await getTitles();
      await fetchAllContents();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      const hideSpinner = () => {
        setIsLoading(false);
      };
      setTimeout(hideSpinner, 1000);
    }
  };
  useEffect(() => {
    fetchData();
  }, [parent_seq]);
  const fetchAllContents = async () => {
    if (newDbTitle.length > 0) {
      const promises = newDbTitle.map(title => getContents(title.seq));
      await Promise.all(promises);
    }
  };
  useEffect(() => {
    fetchAllContents();
  }, [newDbTitle]);

  return isLoading ? (
    <div className={styles.loadcontainer}>
      <div className={styles.loading}></div>
    </div>
    ) : (
    <div className={styles.tdlcontents}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
              <ol className={styles.tdlol}>
                {newDbTitle.map((title, index) => {
                    return (
                      <li key={index} className={styles.tdlinput}>
                        <div className={styles.tdllisttitle}>{title.title} <button onClick={() => handleDeleteTitle(title.seq)}>x</button></div>
                          <Droppable droppableId={`droppable-${title.seq}`} key={title.seq} type={`list-${title.seq}`}>
                            {(provided) => (
                              <ul className={styles.tdlul} {...provided.droppableProps} ref={provided.innerRef}>
                                {itemsByTitle[title.seq]?.map((item, itemIndex) => (
                                  <Draggable key={`title-${title.seq}-item-${itemIndex}`} draggableId={`title-${title.seq}-item-${itemIndex}`} index={itemIndex}>
                                    {(provided) => (
                                      <li ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={styles.tdlli} >
                                        {item.contents}
                                        <button onClick={() => handleDeleteContents(title.seq, item.seq)} className={styles.libtn}>x</button>
                                      </li>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </ul>
                            )}
                          </Droppable>
                          <div className={styles.tdllistadd}>
                            <input
                            className={styles.tdllistinput} type="text"
                              value={newItem[title.seq] || ""}
                              onChange={e => handleInputChange(title.seq, e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter') { handleAddContents(title.seq); }}}
                              placeholder="Add items in list"
                            />
                            <button className={styles.tdllistaddedbtn} type='button'
                              onClick={() => handleAddContents(title.seq)}>                   
                              List Add
                            </button>
                          </div>
                      </li>
                    );
                  })} 
                {/* 여기는 새롭게 추가하거나 ? Title을 추가하거나 하는 창 */}
                <div className={styles.newcard}>
                  {newListAdded ? (
                    <div className={styles.newlistadd2}>
                      <input
                        className={styles.tdllistinput} type="text"
                          value={newTitle}
                          onChange={e => setNewTitle(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { handleAddTitleAndToggle(); }}}
                          placeholder="Add List Title"
                      />
                      <button className={styles.tdllistaddedbtn} type='button'
                        onClick={() => {handleAddTitleAndToggle();}}>                   
                        List Add
                      </button>
                    </div>
                  ) : (
                    <div className={styles.newlistadd}>
                      <button className={styles.newlistaddbtn} onClick={toggleListAdded}>
                        <strong>+</strong> Add a list
                      </button>
                    </div>
                  )}
                </div>
              </ol>
        </DragDropContext>
      </div>
    );
  }

export default DragDropList;