import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import _ from "lodash";
import {setErrorForgotPassword} from "../../../states/modules/auth/index.js";
import {handleCheckValidateConfirm} from "../../../utils/helper.js";
import {forgotPassword} from "../../../api/auth/index.js";
import {useDispatch, useSelector} from "react-redux";

export default function Handle() {
  const navigate = useNavigate();
  const [dataForgotPassword, setDataForgotPassword] = useState({
    email: ''
  });
  const errorForgotPassword = useSelector(state => state.auth.errorForgotPassword);
  const isLoadingBtnForgotPassword = useSelector(state => state.auth.isLoadingBtnForgotPassword);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setErrorForgotPassword({email: ''}))
  }, [dispatch])

  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(dataForgotPassword);
    data[type] = value
    setDataForgotPassword(data)
  }

  const handleKeyDown = (event) => {
    if (errorForgotPassword.email.length !== 0) {
      dispatch(setErrorForgotPassword({email: ''}))
    }

    if (event.key === 'Enter') {
      handleConfirmForgotPassword()
    }
  }

  const handleConfirmForgotPassword = () => {
    let validate = handleCheckValidateConfirm(dataForgotPassword, errorForgotPassword);
    dispatch(setErrorForgotPassword(validate.dataError))
    if (!validate.isError) {
      dispatch(forgotPassword(dataForgotPassword))
    }
  }

  return {
    navigate, dataForgotPassword, errorForgotPassword, isLoadingBtnForgotPassword,
    handleChangeInput, handleKeyDown, handleConfirmForgotPassword
  }
}
