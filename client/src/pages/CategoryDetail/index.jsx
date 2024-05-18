import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import ListMASQ from '../../components/UI/List';
import styles from './styles.module.scss';
import { Space } from 'antd';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetCategoryDetail } from '../../api/category';
import AuthorImg from '../../assets/images/user/avatar_default.jpg';

function CategoryDetail() {
  const { categoryId } = useParams();
  const categoryDetail = useSelector(state => state.categoryDetail.categoryDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryId) {
      dispatch(handleGetCategoryDetail(categoryId));
    }
  }, [categoryId, dispatch]);

  const handleActions = () => [
    <Space key="list-vertical-star-o">
      10<EyeOutlined />Lượt xem
    </Space>,
    <Space key="list-vertical-star-o">
      10<LikeOutlined />Like
    </Space>,
  ];

  const handleExtra = (item) => {
    return (
      <img
        style={{ width: 200, height: 200, objectFit: 'cover' }}
        alt="thumbnail"
        src={item.thumbnail || AuthorImg}
      />
    )
  };

  return (
    <MainLayout>
      <div className={styles.postManagementWrap}>
        <ListMASQ
          data={categoryDetail?.posts || []}
          content={(item) => item?.content}
          pageSize={3}
          actions={handleActions}
          extra={handleExtra}
          title={(item) => item?.title}
          // title={(item) => (
          //   <Link to={`/posts/${item._id}`}>{item.title}</Link>
          // )}
          avatar ={(item) => item?.author?.avatar || AuthorImg}
          description={(item) => item?.author?.name}
          getItemUrl={(item) => `/posts/${item._id}`}
          // getItemUrl={() => {}}
          onClick={()=>{}}
        />
      </div>
    </MainLayout>
  );
}

export default CategoryDetail;
