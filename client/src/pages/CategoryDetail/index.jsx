import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import ListMASQ from '../../components/UI/List';
import styles from "./styles.module.scss"
import { Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetCategoryDetail } from '../../api/category';
import AuthorImg from '../../assets/images/user/avatar_default.jpg'

function CategoryDetail() {
  const {categoryId} = useParams()
  const categoryDetail = useSelector(state => state.categoryDetail.categoryDetail)
  const ditpatch = useDispatch()

  useEffect(() => {
    if(categoryId) {
      ditpatch(handleGetCategoryDetail(categoryId))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  const renderActions = () => [
    <Space key="list-vertical-star-o">
      <EyeOutlined />Xem thêm
    </Space>,
  ];

  const renderExtra = (item) => (
    <img
      style={{ width: 200, height: 200, objectFit: 'cover' }}
      alt="thumbnail"
      src={item.thumbnail|| AuthorImg}
    />
  );

  return (
    <MainLayout>
      <div className={styles.postManagementWrap}>
        <ListMASQ
          data={categoryDetail?.posts || []}
          pageSize={3}
          renderActions={renderActions}
          renderExtra={renderExtra}
          titleProp={(item) => (item?.title)}
          avatarProp={(item) => (item?.author?.avatar || AuthorImg)}
          descriptionProp={(item) => (item?.author?.name)}
          />
      </div>
    </MainLayout>
  )
}

export default CategoryDetail;
