import React, { useEffect, useState } from "react";
import ImageUploadMSQA from "../../../../components/UI/ImageUpload";
import styles from './styles.module.scss'
import ButtonMASQ from "../../../../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatarProfile } from "../../../../api/profile";
import { setErrorAuth } from "../../../../states/modules/auth";
import { Image } from "antd";
// import User from '../../../../assets/images/user/avatar_default.jpg';

function EditAvatar() {
  const authUser = useSelector(state => state.auth.authUser);
  const dispatch = useDispatch();
  const [avatarFileList, setAvatarFileList] = useState([]);

  useEffect(() => {
    dispatch(
      setErrorAuth({
        avatar: "",
      })
    )
  }, [dispatch]);

  useEffect(() => {
    if (authUser.avatar) {
      setAvatarFileList([authUser.avatar]);
    }
  }, [authUser]);

  const handleAvatarUpload = (fileList) => {
    const firstFile = fileList.length > 0 ? [fileList[0]] : [];
    setAvatarFileList(firstFile);
  };

  const handleConfirmSaveAvatar = () => {
    if (avatarFileList.length === 0) {
      // Không có ảnh mới được tải lên, không cần thực hiện lưu
      return;
    }

    const avatarFile = avatarFileList[0]; // Lấy ảnh đầu tiên nếu có nhiều ảnh
    const formData = new FormData();
    formData.append("avatar", avatarFile.originFileObj);

    // gọi API để cập nhật avatar
    dispatch(updateAvatarProfile(formData));
  };

  return (
    <div className={styles.btnWrap}>
      <ImageUploadMSQA
        defaultFileList={avatarFileList}
        onChange={handleAvatarUpload}
        listType="picture-circle"
      />
      <div>
        <ButtonMASQ
          onClick={handleConfirmSaveAvatar}
          style={{
            padding: "0",
            marginTop: "24px",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          textBtn={'Save'}
        />
      </div>

      {/* Hiển thị ảnh nếu người dùng đã có sẵn ảnh */}
      {/* {avatarFileList.length > 0 && (
        <div>
          <h3>Current Avatar:</h3>
          <Image width={100} src={avatarFileList[0]} />
        </div>
      )} */}
    </div>
  );
}

export default EditAvatar;
