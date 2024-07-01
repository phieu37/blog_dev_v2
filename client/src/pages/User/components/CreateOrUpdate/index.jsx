import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import './styles.scss';
import InputMASQ from "../../../../components/UI/Input";
import ButtonMASQ from "../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCreateOrUpdateUser,
  setVisibleModalCreateOrUpdateUser
} from "../../../../states/modules/user";
import { handleCreateUser, handleUpdateUser } from "../../../../api/user";
import { Switch } from 'antd';
import { STATUS_USER } from '../../../../utils/constains';
// import { Button, Upload } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

CreateOrUpdate.defaultProps = {
  isModalOpen: false,
  textBtnConfirm: 'OK',
  configModal: {
    title: 'Title',
    type: 'CREATE',
  }
}

function CreateOrUpdate(props) {
  let { user, configModal } = props
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    name: '',
    email: '',
    phone: '',
    // password: '',
    // confirmPassword: '',
    // avatar: '',
    status: STATUS_USER['ACTIVE']
    // status: ''
  })
  const visibleModalCreateOrUpdateUser = useSelector(state => state.user.visibleModalCreateOrUpdateUser);
  const isLoadingBtnCreateOrUpdateUser = useSelector(state => state.user.isLoadingBtnCreateOrUpdateUser);
  const errorCreateOrUpdateUser = useSelector(state => state.user.errorCreateOrUpdateUser);
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateUser])

  useEffect(() => {
    dispatch(setErrorCreateOrUpdateUser({
      name: '',
      email: '',
      phone: '',
      // password: '',
      // confirmPassword: '',
      status: STATUS_USER['ACTIVE']
      // status: ''
      // avatar: ''
    }));
  }, [dataCreateOrUpdate, dispatch])

  useEffect(() => {
    setDataCreateOrUpdate({
      name: user.name,
      email: user.email,
      phone: user.phone,
      // avatar: user?.avatar,
      status: user.status,
    })
  }, [user])

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      name: '',
      email: '',
      phone: '',
      // password: '',
      // confirmPassword: '',
      // avatar: ''
      status: STATUS_USER['ACTIVE']
      // status: ''
    })
  }

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataCreateOrUpdate);
    data[type] = value;
    setDataCreateOrUpdate(data);
  }

  const validateBlur = (type) => {
    let validate = isValidate(dataCreateOrUpdate, type, errorCreateOrUpdateUser);
    dispatch(setErrorCreateOrUpdateUser(validate.error));
    return validate.isError;
  }

  const handleConfirmCreateOrUpdateUser = () => {
    let dataValidate = dataCreateOrUpdate;
    // console.log('🚀 ~ handleConfirmCreateOrUpdateUser ~ dataValidate:', dataValidate)
    let data = new FormData();
    data.append(`name`, dataCreateOrUpdate.name);
    data.append(`email`, dataCreateOrUpdate.email);
    data.append(`phone`, dataCreateOrUpdate.phone);
    data.append(`status`, dataCreateOrUpdate.status);

    if (configModal.type !== "CREATE") {
      dataValidate = {
        name: dataCreateOrUpdate.name,
        email: dataCreateOrUpdate.email,
        phone: dataCreateOrUpdate.phone,
        status: dataCreateOrUpdate.status,
      }
    } else {
      data.append(`password`, dataCreateOrUpdate.password);
    }

    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateUser);
    dispatch(setErrorCreateOrUpdateUser(validate.dataError));
    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        // dispatch(handleCreateUser(data))
        dispatch(handleCreateUser(dataValidate))
      } else {
        // dispatch(handleUpdateUser(data, user._id))
        dispatch(handleUpdateUser(dataValidate, user._id))
      }
    }
  }

  const handleChangeSwitch = (isChecked, type) => {
    // handleReloadError();
    let data = _.cloneDeep(dataCreateOrUpdate);
    data[type] = isChecked ? STATUS_USER['ACTIVE'] : STATUS_USER['INACTIVE']
    setDataCreateOrUpdate(data)
  }

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateUser}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateUser(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Họ và tên *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập tên..."}
            onChange={(e) => handleChangeInput(e, 'name')}
            onBlur={() => validateBlur('name')}
            value={dataCreateOrUpdate.name}
            error={errorCreateOrUpdateUser.name}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập email..."}
            onChange={(e) => handleChangeInput(e, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataCreateOrUpdate.email}
            error={errorCreateOrUpdateUser.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Số điện thoại *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập số điện thoại..."}
            onChange={(e) => handleChangeInput(e, 'phone')}
            onBlur={() => validateBlur('phone')}
            value={dataCreateOrUpdate.phone}
            error={errorCreateOrUpdateUser.phone}
          />
        </div>

        {
          configModal.type === "CREATE" ?
            <div className={styles.inputWrapper}>
              <div className={styles.label}>Mật khẩu *</div>
              <InputMASQ
                type={"password"}
                placeholder={"Nhập mật khẩu..."}
                onChange={(e) => handleChangeInput(e, 'password')}
                onBlur={() => validateBlur('password')}
                value={dataCreateOrUpdate.password}
                error={errorCreateOrUpdateUser.password}
              />
            </div> : ''
        }

        {
          configModal.type === "CREATE" ?
            <div className={styles.inputWrapper}>
              <div className={styles.label}>Xác nhận mật khẩu *</div>
              <InputMASQ
                type={"password"}
                placeholder={"Nhập lại mật khẩu..."}
                onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                onBlur={() => validateBlur('confirmPassword')}
                value={dataCreateOrUpdate.confirmPassword}
                error={errorCreateOrUpdateUser.confirmPassword}
              />
            </div> : ''
        }

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Trạng thái *</div>
          <Switch
            checked={dataCreateOrUpdate.status}
            onChange={(e) => handleChangeSwitch(e, 'status')}
          />
        </div>

        {/* <div className={styles.inputWrapper}>
          <div className={styles.label}>Avatar</div>
          <Upload
            beforeUpload={() => false}
            onChange={handleAvatarUpload}
            fileList={avatarFileList}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {errorCreateOrUpdateUser.avatar && <span className={styles.error}>{errorCreateOrUpdateUser.avatar}</span>}
        </div> */}

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Lưu'}
            loading={isLoadingBtnCreateOrUpdateUser}
            onClick={() => handleConfirmCreateOrUpdateUser()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </div>
      </div>
    </ModalGeneral>
  );
}

export default CreateOrUpdate;
