import React from 'react';
import {Button, Input} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "../../../../../../../assets/images/icons/light/warning.svg";
import Handle from "./handle.js";

export default function Information(props) {
  const {
    dataInformation, errorInformation, isLoadingBtnInformation,
    handleChangeInput, handleConfirmUpdateInformation, handleKeyDown
  } = Handle(props);
  (dataInformation)
  return (
    <div>
      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Tên tài khoản <span className={'required'}>*</span>
        </div>
        <Input
          className={`main-input ${errorInformation && errorInformation.name.length > 0 ? 'error-input' : ''}`}
          placeholder={'Nhập tên tài khoản'}
          value={dataInformation.name}
          onChange={(e) => handleChangeInput(e, 'name')}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {
          errorInformation && errorInformation.name.length > 0 ?
            <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto" />
            </div>
              {errorInformation.name}
          </span> : ''
        }
      </div>
      <div className={`input-wrap`}>
        <div className={'label-wrap'}>Số điện thoại</div>
        <Input
          className={`main-input`}
          placeholder={'Nhập số diện thoại'}
          value={dataInformation.phone}
          onChange={(e) => handleChangeInput(e, 'phone')}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {
          errorInformation && errorInformation.phone?.length > 0 ?
            <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto" />
            </div>
              {errorInformation.phone}
          </span> : ''
        }
      </div>

      <div className={`flex justify-end`}>
        <Button
          loading={isLoadingBtnInformation}
          type="primary"
          size={'large'}
          className={`main-btn-primary !w-auto`}
          block
          onClick={() => handleConfirmUpdateInformation()}
        >Lưu thông tin
        </Button>
      </div>
    </div>
  )
}
