import deleteIcon from '../../assets/Trash.svg';
import editIcon from '../../assets/vector-10.svg';
import style from './accordion.module.css';
import { colorCode } from '../../helper/utils';
export type StatusType = 'inProgress' | 'pending' | 'completed';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  status: StatusType;
}

export interface ListSection {
  header: string;
  isOpen: boolean;
  data: TodoItem[];
}

export type ListData = Record<StatusType, ListSection>;
interface AccordianListProps {
  listData: ListData;
  onEdit: (item: TodoItem, key: StatusType) => void;
  onDelete: (item: TodoItem, key: StatusType) => void;
  openAccordian: (key: StatusType) => void;
}

const AccordianList:React.FC<AccordianListProps> = ({ listData, onEdit, onDelete, openAccordian }) => {
  return (
    <>
      <div>
        {Object.keys(listData)?.map((itemkey) =>{
           const item = itemkey as StatusType;
           return  (
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
        )
        }
        )}
      </div>
    </>
  );
};

export default AccordianList;
