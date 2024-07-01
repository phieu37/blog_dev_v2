import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import parse from 'html-react-parser';
import MainLayout from "../../layouts/MainLayout"
import styles from "./styles.module.scss"
import { handleGetPostDetail } from "../../api/post"
import './styles.scss';
import moment from "moment"
import AuthorImg from '../../assets/images/user/avatar_default.jpg';
import ButtonMASQ from "../../components/UI/Button"

function Post() {
  const { postId } = useParams()
  const ditpatch = useDispatch()
  const navigate = useNavigate()
  const postDetail = useSelector(state => state.postDetail.postDetail)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (postId) {
      ditpatch(handleGetPostDetail(postId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ditpatch, postId])

  const handleCancel = () => {
    if (isLoggedIn) {
      navigate('/posts');
    } else {
      navigate('/');
    }
  };

  // Thêm thuộc tính data-language vào thẻ <pre> và lớp CSS giả :after
  const contentRef = useRef(null);

  useEffect(() => {
    const enhanceCodeBlocks = () => {
      if (postDetail) {
        const preElements = contentRef.current?.querySelectorAll('pre');
        preElements?.forEach(pre => {
          const codeElement = pre.querySelector('code');
          if (codeElement) {
            const languageClass = Array.from(codeElement.classList).find(className => className.startsWith('language-'));
            if (languageClass) {
              const language = languageClass.replace('language-', '');
              pre.setAttribute('data-language', language);
            }
          }
        });
      }
    };
  
    enhanceCodeBlocks();
  }, [postDetail]);

  return (
    <MainLayout>
      <div className={styles.postDetailWrap}>
        <div className={styles.headerMainWrap}>
          <ButtonMASQ
            onClick={() => handleCancel()}
            style={{
              minWidth: "120px",
            }}
            textBtn={'Quay lại'}
          >
          </ButtonMASQ>
        </div>

        {
          postDetail ? <div className={styles.postManagementWrap}>
            <div className={styles.mainWrap}>
              <h1 className={styles.title}>--- {postDetail.title} ---</h1>

              <div className={styles.authorTop}>
                <img className={styles.authorImage} src={postDetail.author.avatar || AuthorImg} />
                <h3 className={styles.authorName}>{postDetail.author.name}</h3>
              </div>

              <div className={styles.content}>
                {/* 2/3 */}
                {/* <div className={styles.post}>
                  <img className={styles.thumbnail} src={postDetail.thumbnail || AuthorImg} />
                </div> */}
                {/* 1/3 */}
                <div className={`${styles.authorCategories}`}>
                  <div>
                    <h2>Thông tin tác giả: </h2>
                    <div className={styles.author}>
                      <div className={styles.contentTwo}>
                        <h3 className={styles.authorName}><span className={styles.authorSpan}>* Tác giả: </span>{postDetail.author.name}</h3>
                        <h3 className={styles.authorEmail}><span className={styles.authorSpan}>* Email: </span>{postDetail.author.email}</h3>
                        <h3 className={styles.authorBirthday}><span className={styles.authorSpan}>* Sinh ngày: </span>{moment(moment.unix(postDetail.author.birthday)).format("DD/MM/YYYY")}</h3>
                        <h3>
                          <div className={styles.authorSpan}>* Tiểu sử: </div>
                          <div className={styles.authorBio}>
                            {/* {parse(postDetail.author.bio)} */}
                            {typeof postDetail.author.bio === 'string' ? parse(postDetail.author.bio) : postDetail.author.bio}
                          </div>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2>Danh mục: </h2>
                    {postDetail.categories.map(category => (
                      <div key={category._id} className={styles.categories}>
                        <h3 className={styles.categoriesName}>* {category.name}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.separator}></div>

              <div ref={contentRef} className={styles.authorBio}>
                {parse(postDetail.content)}
              </div>

            </div>
          </div> : "Không tìm thấy bài viết"
        }
      </div>
    </MainLayout>
  )
}

export default Post
