import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import InputMASQ from "../../../components/UI/Input";
import _ from 'lodash';
import ButtonMASQ from "../../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { isValidate } from "../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "antd";
// import Social from "./components/Social";
import { login } from "../../../api/auth";

function Login() {
  const navigate = useNavigate(); // điều hướng qua các route khác nhau

  const dispatch = useDispatch(); // gửi action đến store của Redux để thay đổi state

  const [dataLogin, setDataLogin] = useState({  // tạo state cho dữ liệu đăng nhập 
    email: '',
    password: ''
  })
  const [errorDataLogin, setErrorDataLogin] = useState({  // tạo state cho thông tin lỗi
    email: '',
    password: ''
  })
  const [checkRemember, setCheckRemember] = useState(false);  // tạo state cho checkbox

  // lấy state từ store của Redux
  const isLoadingBtnLogin = useSelector(state => state.auth.isLoadingBtnLogin);
  const isAuthSuccess = useSelector(state => state.auth.isAuthSuccess);

  // lỗi từ lần đăng nhập trước được xóa khi người dùng bắt đầu nhập dữ liệu mới
  useEffect(() => {
    handleResetError();
  }, [dataLogin])

  // đăng nhập thành công điều hướng đến trang chính
  useEffect(() => {
    if (isAuthSuccess) {
      navigate('/home')
    }
  }, [isAuthSuccess, navigate])

  // xóa thông tin lỗi trong errorDataLogin, đặt lại giá trị errorDataLogin thành rỗng
  const handleResetError = () => {
    setErrorDataLogin({
      email: '',
      password: ''
    });
  }

  // cập nhật dữ liệu khi người dùng nhập vào trường input
  // valueInput: đại diện cho sự kiện nhập liệu
  // type: đại diện cho loại trường dữ liệu(email, password)
  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value; // chứa giá trị hiện tại của trường nhập liệu
    let data = _.cloneDeep(dataLogin); // tạo bản sao để không làm thay đổi trực tiếp trạng thái của dataLogin
    data[type] = value; // Cập nhật giá trị của trường dữ liệu bằng giá trị mới value
    setDataLogin(data); // Cập nhật trạng thái của dataLogin bằng đối tượng dữ liệu mới data
  }

  // kiểm tra tính hợp lệ của dữ liệu khi trường input mất focus (blur)
  // dataLogin: Dữ liệu đăng nhập hiện tại
  // type: trường dữ liệu cần kiểm tra(email/password)
  // errorDataLogin: Các lỗi đã được xác định cho các trường dữ liệu đăng nhập
  const validateBlur = (type) => {
    let validate = isValidate(dataLogin, type, errorDataLogin);
    // Cập nhật trạng thái lỗi(errorDataLogin) với các lỗi mới được trả về từ hàm isValidate
    setErrorDataLogin(validate.error); 
    return validate.isError; // Trả về một giá trị boolean cho biết có lỗi hay không
  }

  // xác nhận đăng nhập sau khi dữ liệu được kiểm tra tính hợp lệ
  const handleConfirmLogin = () => {
    let validate = handleCheckValidateConfirm(dataLogin, errorDataLogin);
    setErrorDataLogin(validate.dataError);  // Cập nhật trạng thái lỗi
    if (!validate.isError) {    // Nếu không có lỗi gửi yêu cầu đăng nhập
      dispatch(login(dataLogin));
    }
  }

  // xác nhận đăng nhập khi người dùng nhấn phím "Enter"
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmLogin()
    }
  }

  // xử lý sự kiện khi người dùng nhấn vào ô kiểm "Remember me"
  const handleClickCheckBox = (e) => {
    setCheckRemember(e.target.checked);
  }

  return (
    <AuthLayout title={'Welcome back'}>
      <div className={styles.loginWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter email..."}
            onChange={(e) => handleChangeInput(e, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataLogin.email}
            error={errorDataLogin.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Password *</div>
          <InputMASQ
            type={'password'}
            placeholder={'******'}
            value={dataLogin.password}
            onChange={(e) => handleChangeInput(e, 'password')}
            onBlur={() => validateBlur('password')}
            onKeyDown={(e) => handleKeyDown(e)}
            error={errorDataLogin.password}
          />
        </div>

        <div className={styles.btnUtilitiesWrap}>
          <div className={`${styles.remember} input-checkbox-style`}>
            <Checkbox
              className={styles.checkBox}
              checked={checkRemember}
              onClick={(e) => handleClickCheckBox(e)}
            >
              <span>Remember me</span>
            </Checkbox>
          </div>

          {/* <div
            onClick={() => navigate('/forgot-password')}
            className={styles.btnForgetPassword}
          >
            Forgot password
          </div> */}
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Login'}
            loading={isLoadingBtnLogin}
            onClick={() => handleConfirmLogin()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </div>

        {/* <div className={styles.btnSwitchWrap}>
          <div className={styles.btnRegister}>
            {"Don't have an account? "}
            <span className={styles.textRegister} onClick={() => navigate('/register')}>
              Signup now
            </span>
          </div>
        </div> */}

        {/* <Social /> */}
      </div>
    </AuthLayout>
  );
}

export default Login;
