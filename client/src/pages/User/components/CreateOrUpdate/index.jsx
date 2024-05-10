import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
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
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// CreateOrUpdate.prototype = {
//   isModalOpen: PropTypes.bool.isRequired,
//   configModal: PropTypes.object.isRequired,
//   onClose: PropTypes.func,
//   onConfirm: PropTypes.func,
// }

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
    password: '',
    confirmPassword: '',
    avatar: ''
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
      password: '',
      confirmPassword: '',
      avatar: ''
    }));
  }, [dataCreateOrUpdate, dispatch])

  useEffect(() => {
    setDataCreateOrUpdate({
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user?.avatar,
    })
  }, [user])

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      avatar: ''
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
    let data = new FormData();
    data.append(`name`, dataCreateOrUpdate.name);
    data.append(`email`, dataCreateOrUpdate.email);
    data.append(`phone`, dataCreateOrUpdate.phone);

    // Thêm avatar vào FormData nếu avatarFileList không rỗng
    if (avatarFileList.length > 0) {
      const avatarFile = avatarFileList[0]; // Chỉ lấy tệp tin đầu tiên nếu có nhiều tệp tin
      data.append(`avatar`, avatarFile.originFileObj);
    }

    if (configModal.type !== "CREATE") {
      dataValidate = {
        name: dataCreateOrUpdate.name,
        email: dataCreateOrUpdate.email,
        phone: dataCreateOrUpdate.phone,
        avatar: dataCreateOrUpdate?.avatar,
      }
    } else {
      data.append(`password`, dataCreateOrUpdate.password);
    }

    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateUser);
    dispatch(setErrorCreateOrUpdateUser(validate.dataError));
    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateUser(data))
      } else {
        dispatch(handleUpdateUser(data, user._id))
      }
    }
  }

  const [avatarFileList, setAvatarFileList] = useState([]);

  const handleAvatarUpload = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // Giới hạn chỉ chọn một tệp tin

    // Xử lý khi tệp tin đã được chọn
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url; // Lưu trữ URL của tệp tin tải lên
      }
      return file;
    });
    setAvatarFileList(fileList);

    // Chuyển đổi tệp tin thành dạng Blob hoặc File và lưu vào state
    const avatarFile = fileList[0]; // Lấy tệp tin đầu tiên nếu có
    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: avatarFile.type });
        avatarFile.originFileObj = new File([blob], avatarFile.name, { type: avatarFile.type });
        setAvatarFileList([avatarFile]); // Cập nhật avatarFileList với tệp tin đã được chuyển đổi
      };
      reader.readAsArrayBuffer(avatarFile.originFileObj);
    }
  };

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateUser}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateUser(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Name *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter name..."}
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
            placeholder={"Enter email..."}
            onChange={(e) => handleChangeInput(e, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataCreateOrUpdate.email}
            error={errorCreateOrUpdateUser.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Phone *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter phone..."}
            onChange={(e) => handleChangeInput(e, 'phone')}
            onBlur={() => validateBlur('phone')}
            value={dataCreateOrUpdate.phone}
            error={errorCreateOrUpdateUser.phone}
          />
        </div>

        {
          configModal.type === "CREATE" ?
            <div className={styles.inputWrapper}>
              <div className={styles.label}>Password *</div>
              <InputMASQ
                type={"password"}
                placeholder={"Enter password..."}
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
              <div className={styles.label}>Confirm password *</div>
              <InputMASQ
                type={"password"}
                placeholder={"Enter password..."}
                onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                onBlur={() => validateBlur('confirmPassword')}
                value={dataCreateOrUpdate.confirmPassword}
                error={errorCreateOrUpdateUser.confirmPassword}
              />
            </div> : ''
        }

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

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Avatar</div>
          <Upload
            beforeUpload={() => false}
            onChange={handleAvatarUpload}
            fileList={avatarFileList}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {errorCreateOrUpdateUser.avatar && <span className={styles.error}>{errorCreateOrUpdateUser.avatar}</span>}
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Save'}
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
