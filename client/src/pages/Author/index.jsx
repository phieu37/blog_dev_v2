
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import TableCustom from '../../components/UI/Table'
import InputMASQ from "../../components/UI/Input";
import ButtonMASQ from "../../components/UI/Button";
import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../assets/images/icon/table/edit_12x12.svg";
// import SwitchMASQ from "../../components/UI/Switch";
import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getListAuthor, handleDeleteAuthor } from "../../api/author";
import { setVisibleModalCreateOrUpdateAuthor, setVisibleModalDeleteAuthor } from "../../states/modules/author";
import _ from "lodash";
import AuthorImg from '../../assets/images/user/avatar_default.jpg';
// import Filter from './components/Filter';
// import BtnFilter from "../../components/ButtonFilter";
import { PlusOutlined } from '@ant-design/icons';
import { formatDate } from '../../utils/helper';
import { Tooltip } from 'antd';
// import parse from 'html-react-parser'

function Author() {
  // lấy thông tin người dùng hiện tại từ Redux store(từ state authAuthor trong reducer auth)
  const authAuthor = useSelector(state => state.auth.authAuthor);
  // mảng chứa các cấu hình cho từng cột trong bảng dữ liệu
  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',  // Tên trường dữ liệu tương ứng trong mỗi bản ghi
      key: 'name',        // key duy nhất để xác định cột
      render: (field, record) =>  // field(giá trị của trường dữ liệu), record(toàn bộ dữ liệu của bản ghi)
        <div className={styles.nameWrap}>
          <div className={styles.imgWrap}>
            <img src={record.avatar || AuthorImg} alt="img" />
          </div>
          {/* <span>{field}</span> */}
          <span>{record.name}</span>
        </div>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (field) => <span>{field || "Đang cập nhật"}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    // {
    //   title: 'Bio',
    //   dataIndex: 'bio',
    //   key: 'bio',
    //   render: (field) => <span className={styles.limitedHeight}>{parse(field) || "Đang cập nhật"}</span>,
    //   defaultSortOrder: '',
    //   showSorterTooltip: false,
    //   width: '350px',
    //   // sorter: true,
    // },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (field) => <span>{field ? formatDate(field * 1000) : "Đang cập nhật"}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      // sorter: true,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (field) => <span>{field === 1 ? 'Active' : 'Inactive' || "Đang cập nhật"}</span>,
    //   defaultSortOrder: '',
    //   showSorterTooltip: false,
    //   sorter: true,
    // },
    {
      title: 'Chứng chỉ',
      dataIndex: 'certificate',
      key: 'name',
      render: (field) => <span>{field?.name}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      // sorter: true,
    },
    {
      title: 'Ngày cấp',
      dataIndex: 'certificate',
      key: 'date',
      render: (field) => <span>{field?.date ? formatDate(field.date * 1000) : "Đang cập nhật"}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      align: 'center',
      width: '110px',
      // sorter: true,
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '110px',
      render: (field, record) => (
        <>
          {
            // kiểm tra quyền sửa/xóa chỉ hiển thị nếu trùng id
            // authAuthor.id !== record.id ?
            <div className={styles.btnAction}>
              <Tooltip title="Sửa">
                <div onClick={() => handleEdit(record)} className={styles.btnWrap}>
                  <img src={IconEditTable} alt="icon-edit" />
                </div>
              </Tooltip>
              <Tooltip title="Xóa">
                <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
                  <img src={IconDeleteTable} alt="icon-delete" />
                </div>
              </Tooltip>
            </div>
          }
        </>

      ),
    },
  ];

  // lấy state từ Redux store(các giá trị state của slice author)
  const authors = useSelector(state => state.author.authors); // Lấy danh sách author
  // console.log('🚀 ~ Author ~ authors:', authors)
  const isLoadingTableAuthor = useSelector(state => state.author.isLoadingTableAuthor); // Lấy trạng thái loading
  const paginationListAuthor = useSelector(state => state.author.paginationListAuthor); // Lấy thông tin phân trang
  const visibleModalDeleteAuthor = useSelector(state => state.author.visibleModalDeleteAuthor); // Lấy trạng thái hiển thị modal xác nhận xóa

  // tạo ra các state cục bộ trong functional component
  const [author, setAuthor] = useState({}); // lưu thông tin author được chọn để sửa/xóa
  const [configModal, setConfigModal] = useState({  // lưu cấu hình của modal tạo/cập nhật
    title: 'Tạo mới tác giả',
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
    dispatch(getListAuthor(dataFilter))
  }, [dataFilter, dispatch])

  // Dispatch action hiển thị modal tạo author và cấu hình kiểu, tiêu đề của modal
  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateAuthor(true))
    setConfigModal({
      title: "Tạo mới tác giả",
      type: "CREATE"
    })
  }
  // Dispatch action hiển thị modal cập nhật author và cấu hình kiểu, tiêu đề của modal
  // đồng thời set author được chọn vào state author
  const handleEdit = (author) => {
    let authorSelect = _.cloneDeep(author)
    setAuthor(authorSelect)
    dispatch(setVisibleModalCreateOrUpdateAuthor(true))
    setConfigModal({
      title: "Cập nhật tác giả",
      type: "UPDATE"
    })
  }

  // Dispatch action hiển thị modal xác nhận xóa author và set author được chọn vào state author
  const handleShowConfirmDelete = (author) => {
    let authorSelect = _.cloneDeep(author)
    setAuthor(authorSelect)
    dispatch(setVisibleModalDeleteAuthor(true))
  }

  // Dispatch action xác nhận xóa author
  const handleConfirmDeleteAuthor = () => {
    dispatch(handleDeleteAuthor(author._id))
  }

  // Hàm xử lý khi author thay đổi trang hiện tại
  const changeCurrentPage = (page) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.page = page;
    setDataFilter(newDataFilter);
  }

  // Hàm xử lý khi author tìm kiếm
  const handleSearch = (e) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.keySearch = e.target.value;
    setDataFilter(newDataFilter);
  }

  // Hàm xử lý khi author thay đổi cách sắp xếp trong bảng
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

  // Hàm xử lý khi author thay đổi trạng thái lọc
  // const handleChangeStatus = (value) => {
  //   setDataFilter({ ...dataFilter, status: value.toString() });
  // }

  return (
    <MainLayout>
      <div className={styles.authorManagementWrap}>
        <div className={styles.mainWrap}>
          {/* tiêu đề và nút tạo */}
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>Tổng số mục ({paginationListAuthor.totalPage})</span>
            <div className={styles.btnWrap}>
              <div className={styles.btnWrapIcon}>
                <PlusOutlined />
              </div>
              <ButtonMASQ
                onClick={() => handleCreate()}
                style={{
                  minWidth: "120px",
                }}
                textBtn={'Thêm mới'}
              >
              </ButtonMASQ>
            </div>
          </div>

          {/*  ô input để tìm kiếm và các bộ lọc khác */}
          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputMASQ
                placeholder="Tìm kiếm theo họ và tên hoặc email..."
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
                  statusAuthor={dataFilter.status}
                  onChangeStatus={handleChangeStatus}
                />
              }
            /> */}
          </div>

          {/* Bảng hiển thị danh sách người dùng, với các cột và dòng dữ liệu tương ứng */}
          <TableCustom
            loading={isLoadingTableAuthor}
            columns={columns}
            dataSource={authors || []}
            rowKey={'_id'}
            pagination={paginationListAuthor}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        {/* Modal xuất hiện khi author muốn tạo/cập nhật */}
        <CreateOrUpdate
          author={author}
          configModal={configModal}
        />

        {/* modal xác nhận xóa người dùng */}
        <ModalConfirm
          // loading={isLoadingBtnDeleteAuthor}
          isModalOpen={visibleModalDeleteAuthor}
          title={`Xóa ${author.name}?`}
          description={`Bạn có chắc chắn muốn xóa ${author.name}? Hành động của bạn không thể hoàn tác.`}
          onClose={() => dispatch(setVisibleModalDeleteAuthor(false))}
          onConfirm={() => handleConfirmDeleteAuthor()}
        />
      </div>
    </MainLayout >
  );
}

export default Author;
