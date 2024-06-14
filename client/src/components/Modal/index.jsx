import React from 'react';
import { Modal } from "antd";
import './styles.scss';
import styles from './styles.module.scss'
import Close from "../../assets/images/icons/duotone/times.svg";
import InlineSVG from "react-inlinesvg";

export default function ModalDefault(props) {
  const { isModalOpen, handleOk, handleCancel, children, title, description } = props;
  return (
    <Modal
      className={`general-dialog-wrap`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      width={600}
      centered
      closeIcon={<InlineSVG src={Close} />}
    >
      <div className={styles.headerWrap}>
        <div className={styles.titleMainDialog}>{title}</div>
        <div className={styles.descriptionMainDialog}>{description}</div>
      </div>
      
      <div className={styles.mainWrap}>
        {children}
      </div>
    </Modal>
  );
}
