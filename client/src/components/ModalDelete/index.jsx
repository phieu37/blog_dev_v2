import React from 'react';
import {Button, Modal} from "antd";
import './styles.scss';
import styles from './styles.module.scss';
import CircleExclamation from "../../assets/images/icons/light/circle-exclamation.svg";
import InlineSVG from "react-inlinesvg";

export default function ModalDeleteDefault(props) {
  const {
    isModalOpen, loading, content, contentBtn,
    handleOk, handleCancel, handleConfirm,
  } = props;
  return(
    <Modal
      className={`general-dialog-wrap`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      closable={false}
      width={400}
      centered
    >
      <div className={styles.mainWrap}>
        <div className={'py-[20px] mb-[5px]'}>
          <InlineSVG className={'fill-orange-60'} src={CircleExclamation} width={70} height="auto" />
        </div>
        <div className={'mb-[20px] text-center'}>
          {content}
        </div>
        <div className={'flex justify-center mb-[20px]'}>
          <Button
            className={`main-btn-close mx-[5px]`}
            size={'large'}
            onClick={() => handleCancel()}
          >Đóng
          </Button>
          <Button
            loading={loading}
            className={`btn-delete mx-[5px]`}
            type={'primary'}
            size={'large'}
            onClick={() => handleConfirm()}
          >
            {contentBtn}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
