import { memo } from 'react';
import backButton from '../../assets/Turn BackPage Button.svg';
import './header.css';
interface HeaderProps {
  isShowNavigation: boolean;
  moveNavigation: () => void;
  headerText: string;
}


const Header: React.FC<HeaderProps>  = ({ isShowNavigation, moveNavigation, headerText }) => {
  return (
    <>
      <div className="header-top-div">
        {isShowNavigation && (
          <div className="back-button-div" onClick={() => moveNavigation()}>
            <img width={27} height={23} src={backButton} alt="back_button" />
          </div>
        )}
        <h3>{headerText}</h3>
      </div>
    </>
  );
};
export default memo(Header);
