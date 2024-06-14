import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss'
import { Col, Row } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPosts } from '../../api/post';
import { getTotalAuthors } from '../../api/author';
import { getTotalCategories } from '../../api/category';
import { getTotalUsers } from '../../api/user';
import { PERMISSIONS } from '../../utils/constains';
import { hasPermission } from '../../utils/helper';

function Home() {
  const dispatch = useDispatch();

  const totalUsers = useSelector(state => state.user.totalUsers);
  const totalPosts = useSelector(state => state.post.totalPosts);
  const totalAuthors = useSelector(state => state.author.totalAuthors);
  const totalCategories = useSelector(state => state.category.totalCategories);

  // dispatch các action lấy dữ liệu khi component được mount
  useEffect(() => {
    dispatch(getTotalUsers({}));
    dispatch(getTotalAuthors({}));
    dispatch(getTotalCategories({}));
    dispatch(getTotalPosts({}));
  }, [dispatch]);

  return (
    <MainLayout>
      <div className={styles.dashboardWrap}>
        <div className={styles.overviewWrap}>
          <Row gutter={20}>

            {hasPermission([PERMISSIONS.SUPER_ADMIN]) && (
              <Col xs={6} sm={6} md={6} lg={6} xl={6} >
                <div className={styles.itemWrap}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div className={styles.personalWrap}>
                        <div className={styles.labelWrap}>
                          Total Users
                        </div>
                        <div className={styles.numberWrap}>
                          {totalUsers.total || "Admin"}
                        </div>
                      </div>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div className={`${styles.iconWrap} ${styles.iconUser}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 60 48" width="60" height="60">
                          <path fill="currentColor" d="M29.99 30c5.382 0 9.666-4.366 9.666-9.75s-4.364-9.75-9.666-9.75c-5.382 0-9.666 4.366-9.666 9.75C20.24 25.632 24.608 30 29.99 30zm0-15c2.892 0 5.246 2.354 5.246 5.25s-2.358 5.25-5.246 5.25-5.25-2.354-5.25-5.25S27.094 15 29.99 15zM48 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM34.678 33h-9.356C17.962 33 12 38.596 12 45.496 12 46.884 13.19 48 14.662 48h30.674c1.472 0 2.662-1.116 2.662-2.504 0-6.9-5.962-12.496-13.322-12.496zM16.696 43.5c.982-3.446 4.44-6 8.544-6h9.438c4.104 0 7.562 2.554 8.544 6H16.696zM51.74 18h-5.798c-1.2 0-2.332.284-3.362.772.056.494.15.972.15 1.478 0 3.16-1.198 6.02-3.108 8.25h18.722c.916 0 1.656-.788 1.656-1.754C60 21.918 56.306 18 51.74 18zm-34.5 2.25c0-.51.092-.996.15-1.492-1.022-.562-2.146-.758-3.336-.758H8.258C3.698 18 0 21.918 0 26.746c0 .966.74 1.754 1.652 1.754h18.704c-1.914-2.232-3.114-5.09-3.114-8.25zM12 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" />
                        </svg>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            )}
            
            <Col xs={6} sm={6} md={6} lg={6} xl={6} >
              <div className={styles.itemWrap}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>
                        Total Authors
                      </div>
                      <div className={styles.numberWrap}>
                        {totalAuthors.total}
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={`${styles.iconWrap} ${styles.iconChart1}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="60" height="60">
                        <path fill="currentColor" d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z" />
                      </svg>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={styles.itemWrap}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>
                        Total Categories
                      </div>
                      <div className={styles.numberWrap}>
                        {totalCategories.total}
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={`${styles.iconWrap} ${styles.iconChart2}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 22" width="60" height="60">
                        <path fill="currentColor" d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z" />
                      </svg>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6} xl={6} >
              <div className={styles.itemWrap}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>
                        Total Post
                      </div>
                      <div className={styles.numberWrap}>
                        {totalPosts.total}
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={`${styles.iconWrap} ${styles.iconMoney}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 80 90" width="60" height="60">
                        <path fill="currentColor" d="M76,2H16c-2.2,0-4,1.8-4,4v80c0,2.2,1.8,4,4,4h60c2.2,0,4-1.8,4-4V6C80,3.8,78.2,2,76,2z M72,82H20V10h52 V82z M28.5,65c0-2.2,1.8-4,4-4h27c2.2,0,4,1.8,4,4s-1.8,4-4,4h-27C30.3,69,28.5,67.2,28.5,65z M29.1,46c0-2.2,1.8-4,4-4h26.3 c2.2,0,4,1.8,4,4s-1.8,4-4,4H33.1C30.9,50,29.1,48.2,29.1,46z M29.1,27c0-2.2,1.8-4,4-4h26.3c2.2,0,4,1.8,4,4s-1.8,4-4,4H33.1 C30.9,31,29.1,29.2,29.1,27z"></path>
                      </svg>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
