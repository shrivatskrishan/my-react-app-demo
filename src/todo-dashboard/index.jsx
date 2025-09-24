import React, { useCallback, useEffect, useState } from 'react';
import Header from '../common/header';
import addTodoList from '../assets/primary.svg';
import style from './todoDashboard.module.css';
import TodoListForm from '../components/add-form';
import List from '../components/list';

const PaymentStatus = {
  TODO: 'TO-DO APP',
  ADDTODO: 'Add Task',
  EDITODO: 'Edit Task',
};
let copyListData = {};
const TodoList = () => {
  const [isShowNavigation, setIsShowNavigation] = useState(false);
  const [isAddTodoListShow, setIsAddTodoListShow] = useState(true);
  const [headerText, setHeaderText] = useState(PaymentStatus.TODO);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdite] = useState(false);
  const [createCopy, setCreateCopy] = useState(false);

  const [listData, setListData] = useState({
    inProgress: { header: 'In Progress', isOpen: true, data: [] },
    pending: { header: 'Pending', isOpen: false, data: [] },
    completed: { header: 'Completed', isOpen: false, data: [] },
  });

  const openAccordian = useCallback((key) => {
    setListData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isOpen: !prev[key].isOpen,
      },
    }));
  }, []);

  useEffect(() => {
    if (createCopy) {
      copyListData = { ...listData };
      setCreateCopy(false);
    }
  }, [listData, createCopy]);

  const backNavigation = () => {
    setIsShowNavigation(false);
    setHeaderText(PaymentStatus.TODO);
    setIsAddTodoListShow(true);
    setIsEdite(false);
    setEditData(null);
  };
  const showHide = () => {
    setIsShowNavigation((prev) => !prev);
    setIsAddTodoListShow((prev) => !prev);
  };

  const openTodoList = () => {
    showHide();
    setHeaderText(PaymentStatus.ADDTODO);
  };

  const onDelete = useCallback((item, key) => {
    setListData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        data: prev[key].data.filter((itemData) => itemData.id !== item?.id), // remove item by id
      },
    }));
    setCreateCopy(true);
  }, []);

  const onEdit = useCallback((item) => {
    setEditData(item);
    setIsEdite((prev) => !prev);
    showHide();
    setHeaderText(PaymentStatus.EDITODO);
  }, []);
  const submitForm = useCallback((item, key) => {
    setListData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        data: [...prev[key].data, item],
      },
    }));

    backNavigation();
    setCreateCopy(true);
  }, []);

  const saveEditeValue = useCallback(
    (currentKey, targetKey, id, itemToMove) => {
      setListData((prev) => {
        if (currentKey === targetKey) {
          const updatedData = prev[currentKey].data.map((item) =>
            item.id === id ? { ...item, ...itemToMove } : item
          );

          return {
            ...prev,
            [currentKey]: {
              ...prev[currentKey],
              data: updatedData,
            },
          };
        } else {
          const updatedCurrent = prev[currentKey].data.filter(
            (item) => item.id !== id
          );
          const updatedTarget = [...prev[targetKey].data, { ...itemToMove }];

          return {
            ...prev,
            [currentKey]: {
              ...prev[currentKey],
              data: updatedCurrent,
            },
            [targetKey]: {
              ...prev[targetKey],
              data: updatedTarget,
            },
          };
        }
      });
      backNavigation();
      setCreateCopy(true);
    },
    []
  );

  return (
    <>
      <Header
        isShowNavigation={isShowNavigation}
        headerText={headerText}
        moveNavigation={backNavigation}
      />
      {isAddTodoListShow && (
        <>
          {' '}
          <List
            setListData={setListData}
            copylist={copyListData}
            openAccordian={openAccordian}
            onDelete={onDelete}
            onEdit={onEdit}
            listData={listData}
          />
          <div
            onClick={() => openTodoList()}
            className={style?.footer_imgae_div}
          >
            <img src={addTodoList} alt="add_todo_image" />
          </div>
        </>
      )}

      {!isAddTodoListShow && (
        <TodoListForm
          saveEditeValue={saveEditeValue}
          isEdit={isEdit}
          editData={editData}
          submitForm={submitForm}
          backNavigation={backNavigation}
        />
      )}
    </>
  );
};
export default TodoList;
