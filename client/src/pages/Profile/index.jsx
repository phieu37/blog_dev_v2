import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss'
import './styles.scss';
import { Col, Image, Row, Tabs } from "antd";
import User from '../../assets/images/user/avatar_default.jpg';
import EditProfile from "./components/EditProfile";
import Handle from '../../layouts/MainLayout/Header/components/PopoverProfile/handle';
import EditAvatar from './components/EditAvatar';
import { CameraOutlined } from '@ant-design/icons';


function Profile() {
  const { authUser } = Handle();
  const [keyTable, setKeyTable] = useState('1');
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const items = [
    {
      key: '1',
      label: 'Edit profile',
    }
  ];

  const onChange = (key) => {
    setKeyTable(key)
  };

  const handleCameraClick = () => {
    setShowEditAvatar(true);
  };

  return (
    <MainLayout>
      <div className={styles.profileWrap}>
        <Row gutter={20}>
          <Col span={24}>
            <div className={`${styles.profileItem}`}>
              <div className={styles.informationWrap}>

                {showEditAvatar ? (
                  <EditAvatar />
                ) : (
                  <div className={styles.avatarWrap}>
                    <div className={styles.btnChangeImage}>
                      <div className={styles.btnImage}>
                        <Image className={styles.btnImageIcon} src={authUser.avatar || User} alt="" />
                      </div>
                      <div className={styles.btnChangeCamera}>
                        <CameraOutlined className={styles.btnChangeCameraIcon} onClick={handleCameraClick} />
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.infoWrap}>
                  <div className={styles.name}>
                    {authUser.name}
                  </div>
                  <div className={styles.bod}>
                    {authUser.email}
                  </div>
                  <div className={styles.bod}>
                    {authUser.phone}
                  </div>
                </div>

              </div>
              <div className={`${styles.tabWrap} tab-custom`}>
                <Tabs defaultActiveKey={keyTable} items={items} onChange={onChange} />
              </div>
            </div>
          </Col>

          {
            keyTable === '1' ?
              <Col span={24}>
                <EditProfile />
              </Col> : ''
          }
        </Row>
      </div>
    </MainLayout>
  );
}

export default Profile;
