import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {setErrorResetPassword} from "../../../states/modules/auth/index.js";
import {handleCheckValidateConfirm} from "../../../utils/helper.js";
import {resetPassword} from "../../../api/auth/index.js";

export default function Handle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataResetPassword, setDataResetPassword] = useState({
    token: '',
    password: '',
    confirmPassword: ''
  });
  const errorResetPassword = useSelector(state => state.auth.errorResetPassword);
  const isLoadingBtnResetPassword = useSelector(state => state.auth.isLoadingBtnResetPassword);
  const location = useSelector(state => state.app.location);

  useEffect(() => {
    dispatch(setErrorResetPassword({
      password: '',
      confirmPassword: ''
    }))
  }, [dispatch])

  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(dataResetPassword);
    data[type] = value
    setDataResetPassword(data)
  }

  const handleKeyDown = (event) => {
    if (errorResetPassword.password.length !== 0 || errorResetPassword.confirmPassword.length !== 0 ) {
      dispatch(setErrorResetPassword({
        password: '',
        confirmPassword: ''
      }))
    }

    if (event.key === 'Enter') {
      handleConfirmResetPassword()
    }
  }

  const handleConfirmResetPassword = () => {
    let validate = handleCheckValidateConfirm(dataResetPassword, errorResetPassword);
    dispatch(setErrorResetPassword(validate.dataError))
    if (!validate.isError) {
      dispatch(resetPassword({...dataResetPassword, token: location.query.token}));
    }
  }

  return {
    navigate, dataResetPassword, errorResetPassword, isLoadingBtnResetPassword,
    handleChangeInput, handleKeyDown, handleConfirmResetPassword
  }
}
