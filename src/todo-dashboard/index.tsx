import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../common/header';
import addTodoList from '../assets/primary.svg';
import style from './todoDashboard.module.css';
import TodoListForm from '../components/add-form';
import List from '../components/list';

enum PaymentStatus {
  TODO = 'TO-DO APP',
  ADDTODO = 'Add Task',
  EDITODO = 'Edit Task',
}
interface TodoItem {
  id: string;
  title: string;
  description?: string;
  status:string;
  creationDate:string
  [key: string]: any; // For extra dynamic fields
}

interface SectionData {
  header: string;
  isOpen: boolean;
  data: TodoItem[];
}

interface ListData {
  inProgress: SectionData;
  pending: SectionData;
  completed: SectionData;
}

interface ListProps {
  setListData: React.Dispatch<React.SetStateAction<ListData>>;
  copylist: ListData;
  openAccordian: (key: keyof ListData) => void;
  onDelete: (item: TodoItem, key: keyof ListData) => void;
  onEdit: (item: TodoItem) => void;
  listData: ListData;
}

interface TodoListFormProps {
  saveEditeValue: (
    currentKey: keyof ListData,
    targetKey: keyof ListData,
    id: string,
    itemToMove: TodoItem
  ) => void;
  isEdit: boolean;
  editData: TodoItem | null;
  submitForm: (item: TodoItem, key: keyof ListData) => void;
  backNavigation: () => void;
}


const TodoList: React.FC = () => {
  const [isShowNavigation, setIsShowNavigation] = useState<boolean>(false);
  const [isAddTodoListShow, setIsAddTodoListShow] = useState<boolean>(true);
  const [headerText, setHeaderText] = useState<PaymentStatus>(PaymentStatus.TODO);
  const [editData, setEditData] = useState<TodoItem | null>(null);
  const [isEdit, setIsEdite] = useState<boolean>(false);
  const [createCopy, setCreateCopy] = useState<boolean>(false);

  const [listData, setListData] = useState<ListData>({
    inProgress: { header: 'In Progress', isOpen: true, data: [] },
    pending: { header: 'Pending', isOpen: false, data: [] },
    completed: { header: 'Completed', isOpen: false, data: [] },
  });
    const copyListDataRef = useRef<ListData>(listData);

  const openAccordian = useCallback((key: keyof ListData):void => {
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
      copyListDataRef.current = { ...listData };
      // copyListData = { ...listData };
      setCreateCopy(false);
    }
  }, [listData, createCopy]);

  const backNavigation = ():void  => {
    setIsShowNavigation(false);
    setHeaderText(PaymentStatus.TODO);
    setIsAddTodoListShow(true);
    setIsEdite(false);
    setEditData(null);
  };
  const showHide = ():void => {
    setIsShowNavigation((prev) => !prev);
    setIsAddTodoListShow((prev) => !prev);
  };

  const openTodoList = ():void => {
    showHide();
    setHeaderText(PaymentStatus.ADDTODO);
  };

  const onDelete = useCallback((item:TodoItem, key :keyof ListData):void  => {
    setListData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        data: prev[key].data.filter((itemData) => itemData.id !== item?.id), // remove item by id
      },
    }));
    setCreateCopy(true);
  }, []);

  const onEdit = useCallback((item:TodoItem):void => {
    setEditData(item);
    setIsEdite((prev) => !prev);
    showHide();
    setHeaderText(PaymentStatus.EDITODO);
  }, []);
  const submitForm = useCallback((item: TodoItem, key: keyof ListData):void => {
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
    (currentKey: keyof ListData, targetKey: keyof ListData, id: string, itemToMove: TodoItem):void => {
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
          <List
            setListData={setListData}
            copylist={copyListDataRef.current}
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
