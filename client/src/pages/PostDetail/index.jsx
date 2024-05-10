import React, { useEffect } from "react"
import MainLayout from "../../layouts/MainLayout"
import styles from "./styles.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { handleGetPostDetail } from "../../api/post"
import moment from "moment"
import parse from 'html-react-parser';

function Post() {
  const { postId } = useParams()
  const postDetail = useSelector(state => state.postDetail.postDetail)
  const ditpatch = useDispatch()

  useEffect(() => {
    if (postId) {
      ditpatch(handleGetPostDetail(postId))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainLayout>
      {
        postDetail ? <div className={styles.postManagementWrap}>
          <div className={styles.mainWrap}>
            <h1 className={styles.title}>---{postDetail.title}---</h1>

            <div className={styles.authorTop}>
              <img className={styles.authorImage} src={postDetail.author.avatar} />
              <h3 className={styles.authorName}>{postDetail.author.name}</h3>
            </div>

            <div className={styles.content}>
              {/* 2/3 */}
              <div className={styles.post}>
                <img className={styles.thumbnail} src={postDetail.thumbnail} />
              </div>
              {/* 1/3 */}
              <div className={`${styles.authorCategories}`}>

                <h2>Thông tin tác giả: </h2>
                <div className={styles.author}>

                  <div className={styles.contentTwo}>
                    <h3 className={styles.authorName}><span className={styles.authorSpan}>* Tác giả: </span>{postDetail.author.name}</h3>
                    <h3 className={styles.authorEmail}><span className={styles.authorSpan}>* Email: </span>{postDetail.author.email}</h3>
                    <h3 className={styles.authorBirthday}><span className={styles.authorSpan}>* Sinh ngày: </span>{moment(moment.unix(postDetail.author.birthday)).format("DD/MM/YYYY")}</h3>
                    <h3>
                      <div className={styles.authorSpan}>* Tiểu sử: </div>
                      <div className={styles.authorBio}>
                        {postDetail.author.bio}
                      </div>
                    </h3>
                  </div>
                </div>

                <div className={styles.separator}></div>

                <h2>Danh mục: </h2>
                {postDetail.categories.map(category => (
                  <div key={category._id} className={styles.categories}>
                    <h3 className={styles.categoriesName}>* {category.name}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.authorBio}>
              {parse(postDetail.content)}
            </div>

          </div>
        </div> : "Không tìm thấy bài viết"
      }

    </MainLayout>
  )
}

export default Post
