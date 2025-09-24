import deleteIcon from '../../assets/Trash.svg';
import editIcon from '../../assets/vector-10.svg';
import style from './accordion.module.css';
import { colorCode } from '../../helper/utils';

const AccordianList = ({ listData, onEdit, onDelete, openAccordian }) => {
  return (
    <>
      <div>
        {Object.keys(listData)?.map((item) => (
          <div className={style.accordian_top_div} key={`index_${item}`}>
            <div
              onClick={() => openAccordian(item)}
              className={style.accordion_header_div}
            >
              {listData[item]?.header} {`(${listData[item]?.data?.length})`}
            </div>
            {listData[item]?.isOpen && (
              <>
                {listData[item]?.data?.map((itemData) => (
                  <div key={itemData?.id}>
                    <div className={style.accordian_card_top_div}>
                      <div className={style.accordian_titel_top_div}>
                        <div className={style.accordion_titel_div}>
                          <div className={style.accordian_sort_titel_div}>
                            {itemData?.title?.charAt(0).toUpperCase()}
                          </div>
                          <div className={style.accor_titel_div}>
                            {itemData?.title}
                          </div>
                        </div>

                        <div className={style.status_top_div}>
                          <div
                            className={style.status_div}
                            style={{
                              backgroundColor: colorCode[itemData?.status],
                            }}
                          ></div>
                          <div>{itemData?.status}</div>
                        </div>
                      </div>
                      <div className={style?.task_dis_div}>
                        {itemData?.description}
                      </div>
                      <div className={style.creat_butt_top_div}>
                        <div className={style?.creation_date_div}>
                          {itemData?.creationDate?.toDateString()}
                        </div>
                        <div className={style?.button_div}>
                          <div className={style?.edit_icon_div}>
                            <img
                              onClick={() => onEdit(itemData, item)}
                              src={editIcon}
                              alt={'edit_icon'}
                            />
                          </div>
                          <div>
                            <img
                              onClick={() => onDelete(itemData, item)}
                              src={deleteIcon}
                              alt={'delete_icon'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AccordianList;
