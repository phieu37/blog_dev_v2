import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import './styles.scss'
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {goToPageSuccess, setLocation} from "../../states/modules/app";

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
};

AuthLayout.defaultProps = {
  title: ''
}

function AuthLayout(props) {
  const { children, title } = props;
  const goToPage = useSelector(state => state.app.goToPage);
  // const location = useSelector(state => state.app.location);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // kiểm tra thay đổi thông tin về đường dẫn hiện tại và trước đó
  // cập nhật thông tin về đường dẫn và điều hướng đến ỦRL mới
  // useEffect(() => {
  //   if (location.pathName !== location.prevPathName) {
  //     dispatch(setLocation({  
  //       pathName: location.pathName,
  //       payload: location.payload,
  //       prevPathName: location.pathName,
  //     }));
  //     navigate(location.pathName);
  //   }
  // }, [location, navigate, dispatch]);

  useEffect(() => {
    if (goToPage.path && !goToPage.redirected) {
        dispatch(goToPageSuccess());
        navigate(goToPage.path);
    }
}, [goToPage, navigate, dispatch]);


  return (
    <div className={styles.layoutAuthWrap}>
      <div className={styles.mainWrap}>
        <div className={styles.form}>
          <div className={styles.headerWrap}>
            <div className={styles.boxHeaderWrap}>
              <span className={styles.title}>{ title }</span>
            </div>
          </div>
          { children }
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
