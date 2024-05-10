import React from 'react';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import {Button, Flex, Input} from "antd";
import styles from './styles.module.scss';
import IconWarning from "../../../assets/images/icons/light/warning.svg";
import InlineSVG from "react-inlinesvg";
import Handle from "./handle.js";

function Login() {
  const {
    navigate, dataResetPassword, errorResetPassword, isLoadingBtnResetPassword,
    handleChangeInput, handleKeyDown, handleConfirmResetPassword
  } = Handle();

  return (
    <AuthLayout title={'Đặt lại mật khẩu'} description={'Hệ thống quản lý thần số học'}>
      <div className={`input-wrap mt-5`}>
        <Input.Password
          className={`base-input ${errorResetPassword && errorResetPassword.password.length > 0 ? 'error-input' : ''}`}
          placeholder={'Mật khẩu'}
          value={dataResetPassword.password}
          onChange={(e) => handleChangeInput(e, 'password')}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {
          errorResetPassword && errorResetPassword.password.length > 0 ?
            <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto" />
            </div>
              {errorResetPassword.password}
          </span> : ''
        }
      </div>

      <div className={`input-wrap mt-5`}>
        <Input.Password
          className={`base-input ${errorResetPassword && errorResetPassword.confirmPassword.length > 0 ? 'error-input' : ''}`}
          placeholder={'Nhập lại mật khẩu'}
          value={dataResetPassword.confirmPassword}
          onChange={(e) => handleChangeInput(e, 'confirmPassword')}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {
          errorResetPassword && errorResetPassword.confirmPassword.length > 0 ?
            <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto" />
            </div>
              {errorResetPassword.confirmPassword}
          </span> : ''
        }
      </div>

      <Flex vertical gap="small" style={{ width: '100%' }}>
        <Button
          loading={isLoadingBtnResetPassword}
          type="primary"
          size={'large'}
          onClick={() => handleConfirmResetPassword()}
          className={`main-btn-primary`}
          block
        >Đặt lại mật khẩu
        </Button>
      </Flex>

      <div className={styles.forgot}>
        Trở lại trang <span onClick={() => navigate('/login')}>Đăng nhập</span>
      </div>

    </AuthLayout>
  );
}

export default Login;
