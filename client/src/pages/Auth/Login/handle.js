import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {setErrorLogin} from "../../../states/modules/auth/index.js";
import {handleCheckValidateConfirm} from "../../../utils/helper.js";
import {login} from "../../../api/auth/index.js";

export default function Handle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [datFormLogin, setDatFormLogin] = useState({
    email: '',
    password: ''
  })
  const errorLogin = useSelector(state => state.auth.errorLogin);
  const isLoadingBtnLogin = useSelector(state => state.auth.isLoadingBtnLogin);

  useEffect(() => {
    dispatch(setErrorLogin({
      email: '',
      password: ''
    }))
  }, [dispatch])

  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(datFormLogin);
    data[type] = value
    setDatFormLogin(data)
  }

  const handleKeyDown = (event) => {
    if (errorLogin.email.length !== 0 || errorLogin.password.length !== 0 ) {
      dispatch(setErrorLogin({
        email: '',
        password: ''
      }))
    }

    if (event.key === 'Enter') {
      handleConfirmLogin()
    }
  }

  const handleConfirmLogin = () => {
    let validate = handleCheckValidateConfirm(datFormLogin, errorLogin, 'login');
    dispatch(setErrorLogin(validate.dataError))
    if (!validate.isError) {
      dispatch(login(datFormLogin))
    }
  }

  return {
    navigate, datFormLogin, errorLogin, isLoadingBtnLogin,
    handleChangeInput, handleKeyDown, handleConfirmLogin
  }
}
