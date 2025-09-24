import { useEffect, useState } from 'react';
import Button from '../../common/button/button';
import style from './todolistform.module.css';
import { colorCode, dropDownData } from '../../helper/utils';

const TodoListForm = ({
  backNavigation,
  submitForm,
  editData,
  isEdit,
  saveEditeValue,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('inProgress');
  const [isOpenDropDown, setIsDropDown] = useState(false);

  const cancel = () => {
    backNavigation();
  };
  const submitData = () => {
    const dataCopy = { ...formData };
    if (!dataCopy?.creationDate) {
      dataCopy['creationDate'] = new Date();
    }
    if (!dataCopy.id) {
      dataCopy['id'] = new Date().toString();
    }
    dataCopy['status'] = status;
    submitForm(dataCopy, status);
  };
  const editSubmitData = () => {
    const dataCopy = { ...formData };
    dataCopy['status'] = status;
    saveEditeValue(formData?.status, status, formData?.id, dataCopy);
  };
  useEffect(() => {
    if (formData?.title && formData?.description) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  useEffect(() => {
    if (editData?.title) {
      setFormData({ ...editData });
    }
    if (editData?.status) {
      setStatus(editData?.status);
    }
  }, [editData]);

  const changeFormData = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const statusFn = (item) => {
    setStatus(item?.value);
    setIsDropDown((prev) => !prev);
  };

  return (
    <>
      <div className={style.todo_form_top_div}>
        <input
          value={formData?.title}
          className={style.input_field}
          id="title"
          name="title"
          onChange={(e) => changeFormData(e.target.value, 'title')}
          placeholder="Enter the title"
          type="text"
        />
        <textarea
          value={formData?.description}
          className={style.text_are_field}
          rows="4"
          cols="50"
          id="description"
          name="description"
          onChange={(e) => changeFormData(e.target.value, 'description')}
          placeholder="Enter the description"
        />
        {isEdit && (
          <div className={style?.drop_down_top_div}>
            <div
              className={style?.drop_down_list_top_div}
              onClick={() => setIsDropDown((prev) => !prev)}
            >
              <div
                className={style?.lsit_element_drop_down}
                style={{ backgroundColor: colorCode[status] }}
              ></div>
              <div>{status}</div>
            </div>
            <div className={style.all_drop_list}>
              {isOpenDropDown &&
                dropDownData?.map((item) => (
                  <div
                    key={`item_${item.value}`}
                    className={style?.drop_down_list_top_div}
                    onClick={() => statusFn(item)}
                  >
                    <div
                      className={style?.lsit_element_drop_down}
                      style={{ backgroundColor: colorCode[item.value] }}
                    ></div>
                    <div>{item.label}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className={style.button_top_div}>
          <Button
            isDisabled={false}
            text={'Cancel'}
            type={'secondry'}
            onClick={cancel}
          />
          <Button
            isDisabled={isDisabled}
            text={isEdit ? 'Update' : 'ADD'}
            type={'primary'}
            onClick={isEdit ? editSubmitData : submitData}
          />
        </div>
      </div>
    </>
  );
};
export default TodoListForm;
