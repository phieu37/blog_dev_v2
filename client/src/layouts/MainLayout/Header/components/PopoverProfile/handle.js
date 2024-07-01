import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {removeAuthToken} from "../../../../../utils/localStorage.js";
import {startRequestGetMeFail} from "../../../../../states/modules/auth/index.js";
import {getMe} from "../../../../../api/auth/index.js";
import {
  changePassword,
  setErrorChangePassword,
  setErrorInfoUser
} from "../../../../../states/modules/profile/index.js";

export default function Handle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowInformation, setIsShowInformation] = useState(false);
  const authUser = useSelector(state => state.auth.authUser);
  const errorInformation = useSelector(state => state.profile.errorInformation);
  const errorChangePassword = useSelector(state => state.profile.errorChangePassword);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const handleConfirmLogout = () => {
    removeAuthToken();
    dispatch(startRequestGetMeFail())
    navigate('/');
  }

  const handleResetError = () => {
    if (errorInformation.name.length !== 0 || errorInformation.name ) {
      dispatch(setErrorInfoUser({
        name: '',
        email: ''
      }))
    }

    if (
      errorChangePassword.currentPassword.length !== 0 ||
      errorChangePassword.password.length !== 0 ||
      errorChangePassword.confirmPassword.length !== 0
    ) {
      dispatch(setErrorChangePassword({
        currentPassword: '',
        password: '',
        confirmPassword: '',
      }))
      dispatch(setErrorInfoUser({
        name: '',
        email: ''
      }))
    }
  }

  const handleShowProfile = () => {
    handleResetError();
    dispatch(changePassword({
      currentPassword: '',
      password: '',
      confirmPassword: '',
    }));
    dispatch(getMe());
    setIsShowInformation(true)
  }

  return {
    isShowInformation, setIsShowInformation, authUser,
    handleConfirmLogout, handleShowProfile, handleResetError,
    isLoggedIn,
  }
}
