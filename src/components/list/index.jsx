import { memo, useEffect, useState } from 'react';
import useDebounce from '../../hooks/debouncehook';
import searchIcon from '../../assets/Vector.svg';
import style from './list.module.css';
import AccordianList from '../../common/accordion';

const List = ({
  listData,
  onEdit,
  onDelete,
  openAccordian,
  copylist,
  setListData,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebounce(searchValue, 300);

  useEffect(() => {
    if (debounceValue) {
      console.log(debounceValue);
      const searchValue = debounceValue.toLowerCase();
      if (searchValue) {
        const filtered = Object.keys(copylist).reduce((acc, key) => {
          acc[key] = {
            ...copylist[key],
            data: copylist[key].data.filter((task) =>
              task.title.toLowerCase().includes(searchValue)
            ),
          };
          return acc;
        }, {});
        setListData(filtered);
      }
    } else {
      setListData(copylist);
    }
  }, [debounceValue]);

  return (
    <>
      <div className={style.list_module_search_div}>
        <div className={style.search_icon_top_div}>
          <img
            className={style.search_icon_image}
            src={searchIcon}
            alt="searxh_icon"
            width={15}
            height={15}
          />
        </div>
        <input
          className={style.search_input_field}
          id="search"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <AccordianList
          openAccordian={openAccordian}
          listData={listData}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </>
  );
};
export default memo(List);
