import React from "react";
import styles from './styles.module.scss';
import { Button, Input } from "antd";
import './styles.scss';
import Handle from "./handle";

export default function ChangePassword(props) {
  const { closeModal } = props;
  const {
    dataChangePassword,
    handleConfirmChange,
    handleChangeInput
  } = Handle(props)

  return (
    <>
      <div className={styles.inputWrap}>
        <div className={styles.labelWrap}>
          Mật khẩu mới <span className={styles.required}>*</span>
        </div>
        <Input.Password
          placeholder="Nhập mật khẩu"
          value={dataChangePassword.password}
          onChange={(e) => handleChangeInput(e, 'password')}
        />
      </div>

      <div className={styles.inputWrap}>
        <div className={styles.labelWrap}>
          Xác nhận mật khẩu mới <span className={styles.required}>*</span>
        </div>
        <Input.Password
          placeholder="Xác nhận mật khẩu"
          value={dataChangePassword.confirm_password}
          onChange={(e) => handleChangeInput(e, 'confirm_password')}
        />
      </div>

      <div className={styles.buttonWrap}>
        <Button
          className={styles.button}
          onClick={() => closeModal()}
        >
          Đóng
        </Button>

        <Button
          className={styles.button}
          onClick={() => handleConfirmChange()}
        >
          Cập nhật
        </Button>
      </div>
    </>
  )
}
