import React, { useEffect } from 'react';
import { Space } from 'antd';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';
import DefaultLayout from '../../layouts/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import './styles.scss';
import AuthorImg from '../../assets/images/user/avatar_default.jpg';
import ListMASQ from '../../components/UI/List';
import { getListPost } from '../../api/post';

function NoLogin() {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const paginationListPost = useSelector(state => state.post.paginationListPost);
  useEffect(() => {
    dispatch(getListPost({}));
  }, [dispatch]);

  const handleActions = () => [
    <Space key="list-vertical-star-o">
      10<EyeOutlined />Lượt xem
    </Space>,
    // <Space key="list-vertical-star-o">
    //   10<LikeOutlined />Like
    // </Space>,
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
    <>
      <DefaultLayout>
        <div className={styles.postManagementWrap}>
          <div className={styles.mainWrap}>
            <div className={styles.headerMainWrap}>
              <span className={styles.title}>Tổng số mục ({paginationListPost.totalPage})</span>
            </div>
            <ListMASQ
              className="item-separator"
              data={posts || []}
              content={(item) => item?.content}
              pageSize={3}
              actions={handleActions}
              extra={handleExtra}
              title={(item) => item?.title}
              avatar={(item) => item?.author?.avatar || AuthorImg}
              description={(item) => item?.author?.name}
              getItemUrl={(item) => `/posts/${item._id}`}
              onClick={() => { }}
            />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

export default NoLogin;
