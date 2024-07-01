import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Modal} from 'antd';
import ButtonMASQ from "../../Button";

ModalConfirm.defaultProps = {
  isModalOpen: false,
  title: 'Xóa %record name%?',
  description: 'Bạn có chắc chắn muốn xóa %record name%? Hành động của bạn không thể hoàn tác.',
  textBtnConfirm: 'Đồng ý',
  textBtnCancel: 'Hủy',
  loadingBtnConfirm: false,
  type: 'DEFAULT'
}

function ModalConfirm(props) {
  return (
    <Modal
      open={props.isModalOpen}
      footer={false}
      className={`general-dialog-wrap`}
      closable={false}
    >
      <div className={styles.headerDialogWrap}>
        {
          props.type === 'DEFAULT' ?
            <span className={styles.title}>Xác nhận</span> : ''
        }
        <div
          onClick={() => props.onClose()}
          className={`${styles.btnClose} cursor-pointer`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.707 1.293a1 1 0 0 0-1.414 0L6 4.586 2.707 1.293a1 1 0 0 0-1.414 1.414L4.586 6 1.293 9.293a1 1 0 1 0 1.414 1.414L6 7.414l3.293 3.293a1 1 0 0 0 1.414-1.414L7.414 6l3.293-3.293a1 1 0 0 0 0-1.414Z"
              fill="#212121"/>
          </svg>
        </div>
      </div>

      <div className={styles.mainDialog}>
        <span className={styles.titleMainDialog}>{props.title}</span>
        <div className={styles.descriptionMainDialog}>{props.description}</div>
      </div>

      <div className={styles.btnWrap}>
        {
          props.textBtnConfirm.length > 0 ?
            <ButtonMASQ
              textBtn={props.textBtnConfirm}
              onClick={() => props.onConfirm()}
              loading={props.loadingBtnConfirm}
            />
            : ''
        }

        <ButtonMASQ
          textBtn={props.textBtnCancel}
          onClick={() => props.onClose()}
          style={{
            background: "#6B7F8D"
          }}
        />
      </div>
    </Modal>
  );
}

export default ModalConfirm
