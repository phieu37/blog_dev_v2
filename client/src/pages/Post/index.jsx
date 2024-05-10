
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import TableCustom from '../../components/UI/Table'
import InputMASQ from "../../components/UI/Input";
import ButtonMASQ from "../../components/UI/Button";
import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../assets/images/icon/table/edit_12x12.svg";
import IconDetailTable from "../../assets/images/icon/show_password.svg";
// import SwitchMASQ from "../../components/UI/Switch";
import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getListPost, handleDeletePost } from "../../api/post";
import {
  setVisibleModalCreateOrUpdatePost, setVisibleModalDeletePost,
  // setDataFilter 
} from "../../states/modules/post";
import _ from "lodash";
// import Filter from './components/Filter';
// import BtnFilter from "../../components/ButtonFilter";
import { PlusOutlined } from '@ant-design/icons';
import { getListAuthor } from '../../api/author';
import { getListCategory } from '../../api/category';
import AuthorImg from '../../assets/images/user/avatar_default.jpg';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import parse from 'html-react-parser'

function Post() {
  // lấy thông tin người dùng hiện tại từ Redux store(từ state authPost trong reducer auth)
  const authAuthor = useSelector(state => state.auth.authAuthor);
  const navigate = useNavigate()
  // mảng chứa các cấu hình cho từng cột trong bảng dữ liệu
  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '100px',
      render: (field, record) =>
        <div className={styles.nameWrap}>
          <div className={styles.imgWrap}>
            <img src={record.thumbnail || AuthorImg} alt="" />
          </div>
        </div>,
      defaultSortOrder: '',
      showSorterTooltip: false,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (field) => <span>{field || "Đang cập nhật"}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (field) => <span className={styles.limitedHeight}>{parse(field) || "Đang cập nhật"}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      width: '300px',
      // sorter: true,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'name',
      render: (field) => <span>{field.name || "Đang cập nhật"}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'Category',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories) => (
        <div>
          {categories.map(category => <div key={category._id}>* {category.name}</div>) || "Đang cập nhật"}
        </div>
      ),
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '120px',
      render: (field, record) => (
        <>
          {
            authAuthor.id === record.id ?
              <div className={styles.btnAction}>
                <Tooltip title="Edit">
                  <div onClick={() => handleEdit(record)} className={styles.btnWrap}>
                    <img src={IconEditTable} alt="icon-edit" />
                  </div>
                </Tooltip>
                {
                  authAuthor.id === record.id &&
                  <div className={styles.btnWrap}>
                    <Tooltip title="Delete">
                      <div onClick={() => handleShowConfirmDelete(record)}>
                        <img src={IconDeleteTable} alt="icon-delete" />
                      </div>
                    </Tooltip>
                  </div>
                }
                {
                  <Tooltip title="DetailContent">
                    {/* <div onClick={() => navigate('/posts/:postId')} className={styles.btnWrap}> */}
                    <div onClick={() => navigate(`/posts/${record._id}`)} className={styles.btnWrap}>
                      <img className={styles.btnWrapImg} src={IconDetailTable} alt="icon-delete" />
                    </div>
                  </Tooltip>
                }
              </div> : ''
          }
        </>
      ),
    },
  ];

  // lấy state từ Redux store(các giá trị state của slice post)
  const posts = useSelector(state => state.post.posts); // Lấy danh sách post
  // console.log('🚀 ~ Post ~ posts:', posts)
  const isLoadingTablePost = useSelector(state => state.post.isLoadingTablePost); // Lấy trạng thái loading
  const paginationListPost = useSelector(state => state.post.paginationListPost); // Lấy thông tin phân trang
  const visibleModalDeletePost = useSelector(state => state.post.visibleModalDeletePost); // Lấy trạng thái hiển thị modal xác nhận xóa

  // tạo ra các state cục bộ trong functional component
  const [post, setPost] = useState({}); // lưu thông tin post được chọn để sửa/xóa
  const [configModal, setConfigModal] = useState({  // lưu cấu hình của modal tạo/cập nhật
    title: 'Create post',
    type: 'CREATE'
  })

  const [dataFilter, setDataFilter] = useState({  // lưu các thông tin để lọc và phân trang
    keySearch: '',
    status: '',
    perPage: 5,
    page: 1,
    order: null,
    column: null
  })

  // gửi các action đến Redux store
  const dispatch = useDispatch();

  // gửi yêu cầu lấy danh sách user mỗi khi dataFilter thay đổi
  useEffect(() => {
    dispatch(getListPost(dataFilter))
  }, [dataFilter, dispatch])

  // Dispatch action hiển thị modal tạo post và cấu hình kiểu, tiêu đề của modal
  const handleCreate = () => {
    setPost({})
    dispatch(setVisibleModalCreateOrUpdatePost(true))
    setConfigModal({
      title: "Create post",
      type: "CREATE"
    })
    dispatch(getListAuthor({
      perPage: 100,
      page: 1,
    }))
    dispatch(getListCategory({
      perPage: 100,
      page: 1,
    }))
  }
  // Dispatch action hiển thị modal cập nhật post và cấu hình kiểu, tiêu đề của modal
  // đồng thời set post được chọn vào state post
  const handleEdit = (post) => {
    let postSelect = _.cloneDeep(post)
    setPost(postSelect)
    dispatch(setVisibleModalCreateOrUpdatePost(true))
    setConfigModal({
      title: "Update post",
      type: "UPDATE"
    })
    dispatch(getListAuthor({
      perPage: 100,
      page: 1,
    }))
    dispatch(getListCategory({
      perPage: 100,
      page: 1,
    }))
  }

  // Dispatch action hiển thị modal xác nhận xóa post và set post được chọn vào state post
  const handleShowConfirmDelete = (post) => {
    let postSelect = _.cloneDeep(post)
    setPost(postSelect)
    dispatch(setVisibleModalDeletePost(true))
  }

  // Dispatch action xác nhận xóa post
  const handleConfirmDeletePost = () => {
    dispatch(handleDeletePost(post._id))
  }

  // Hàm xử lý khi post thay đổi trang hiện tại
  const changeCurrentPage = (page) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.page = page;
    setDataFilter(newDataFilter);
  }

  // Hàm xử lý khi post tìm kiếm
  const handleSearch = (e) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.keySearch = e.target.value;
    setDataFilter(newDataFilter);
  }

  // Hàm xử lý khi post thay đổi cách sắp xếp trong bảng
  const onChange = (pagination, filters, sorter) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.order = null;
    newDataFilter.column = null;
    if (sorter.order && sorter.field) {
      newDataFilter.order = sorter.order === "ascend" ? "desc" : "asc";
      newDataFilter.column = sorter.field;
    }
    setDataFilter(newDataFilter);
  };

  // Hàm xử lý khi post thay đổi trạng thái lọc
  // const handleChangeStatus = (value) => {
  //   setDataFilter({ ...dataFilter, status: value.toString() });
  // }

  return (
    <MainLayout>
      <div className={styles.postManagementWrap}>
        <div className={styles.mainWrap}>
          {/* tiêu đề và nút tạo */}
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>Total pages ({paginationListPost.totalPage})</span>
            <div className={styles.btnWrap}>
              <div className={styles.btnWrapIcon}>
                <PlusOutlined />
              </div>
              <ButtonMASQ
                onClick={() => handleCreate()}
                style={{
                  minWidth: "120px",
                }}
                textBtn={'Create'}
              >
              </ButtonMASQ>
            </div>
          </div>

          {/*  ô input để tìm kiếm và các bộ lọc khác */}
          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputMASQ
                placeholder="Search by title or author or category"
                value={dataFilter.keySearch}
                onChange={(e) => handleSearch(e)}
              />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path
                    d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                    fill="#3D4667" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h12v12H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {/* Nút để mở các bộ lọc khác nhau */}
            {/* <BtnFilter
              content={
                <Filter
                  statusPost={dataFilter.status}
                  onChangeStatus={handleChangeStatus}
                />
              }
            /> */}
          </div>

          {/* Bảng hiển thị danh sách người dùng, với các cột và dòng dữ liệu tương ứng */}
          <TableCustom
            loading={isLoadingTablePost}
            columns={columns}
            dataSource={posts || []}
            rowKey={'_id'}
            pagination={paginationListPost}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        {/* Modal xuất hiện khi post muốn tạo/cập nhật */}
        <CreateOrUpdate
          post={post}
          configModal={configModal}
        />

        {/* modal xác nhận xóa người dùng */}
        <ModalConfirm
          isModalOpen={visibleModalDeletePost}
          title={`Delete ${post.name}?`}
          description={`Are you sure you want to delete ${post.name}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalDeletePost(false))}
          onConfirm={() => handleConfirmDeletePost()}
        />
      </div>
    </MainLayout >
  );
}

export default Post;
