
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
import { getListUser, handleDeleteUser } from "../../api/user";
import { setVisibleModalCreateOrUpdateUser, setVisibleModalDeleteUser } from "../../states/modules/user";
import _ from "lodash";
import UserImg from '../../assets/images/user/avatar_default.jpg';
// import Filter from './components/Filter';
// import BtnFilter from "../../components/ButtonFilter";
import { PlusOutlined } from '@ant-design/icons';

function User() {
  // lấy thông tin người dùng hiện tại từ Redux store(từ state authUser trong reducer auth)
  const authUser = useSelector(state => state.auth.authUser);
  // mảng chứa các cấu hình cho từng cột trong bảng dữ liệu
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',  // Tên trường dữ liệu tương ứng trong mỗi bản ghi
      key: 'name',        // key duy nhất để xác định cột
      render: (field, record) =>  // field(giá trị của trường dữ liệu), record(toàn bộ dữ liệu của bản ghi)
        <div className={styles.nameWrap}>
          <div className={styles.imgWrap}>
            <img src={record.avatar || UserImg} alt="" />
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
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (field) => <span>{field || "Đang cập nhật"}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '80px',
      render: (field, record) => (
        <>
          {
            // kiểm tra quyền sửa/xóa chỉ hiển thị nếu trùng id
            // authUser.id !== record.id ?
            authUser.id === record.id ?
              <div className={styles.btnAction}>
                <div onClick={() => handleEdit(record)} className={styles.btnWrap}>
                  <img src={IconEditTable} alt="icon-edit" />
                </div>
                {
                  // authUser.id !== record.id ?
                  authUser.id === record.id ?
                    <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
                      <img src={IconDeleteTable} alt="icon-delete" />
                    </div> : ''
                }
              </div> : ''
          }
        </>

      ),
    },
  ];

  // lấy state từ Redux store(các giá trị state của slice user)
  const users = useSelector(state => state.user.users); // Lấy danh sách user
  const isLoadingTableUser = useSelector(state => state.user.isLoadingTableUser); // Lấy trạng thái loading
  const paginationListUser = useSelector(state => state.user.paginationListUser); // Lấy thông tin phân trang
  const visibleModalDeleteUser = useSelector(state => state.user.visibleModalDeleteUser); // Lấy trạng thái hiển thị modal xác nhận xóa

  // tạo ra các state cục bộ trong functional component
  const [user, setUser] = useState({}); // lưu thông tin user được chọn để sửa/xóa
  const [configModal, setConfigModal] = useState({  // lưu cấu hình của modal tạo/cập nhật
    title: 'Create user',
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
    dispatch(getListUser(dataFilter))
  }, [dataFilter, dispatch])

  // Dispatch action hiển thị modal tạo user và cấu hình kiểu, tiêu đề của modal
  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateUser(true))
    setConfigModal({
      title: "Create user",
      type: "CREATE"
    })
  }
  // Dispatch action hiển thị modal cập nhật user và cấu hình kiểu, tiêu đề của modal
  // đồng thời set user được chọn vào state user
  const handleEdit = (user) => {
    console.log('🚀 ~ handleEdit ~ user:', user)
    let userSelect = _.cloneDeep(user)
    setUser(userSelect)
    dispatch(setVisibleModalCreateOrUpdateUser(true))
    setConfigModal({
      title: "Update user",
      type: "UPDATE"
    })
  }

  // Dispatch action hiển thị modal xác nhận xóa user và set user được chọn vào state user
  const handleShowConfirmDelete = (user) => {
    let userSelect = _.cloneDeep(user)
    setUser(userSelect)
    dispatch(setVisibleModalDeleteUser(true))
  }

  // Dispatch action xác nhận xóa user
  const handleConfirmDeleteUser = () => {
    dispatch(handleDeleteUser(user._id))
  }

  // Hàm xử lý khi user thay đổi trang hiện tại
  const changeCurrentPage = (page) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.page = page;
    setDataFilter(newDataFilter);
  }

  // Hàm xử lý khi user tìm kiếm
  const handleSearch = (e) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.keySearch = e.target.value;
    setDataFilter(newDataFilter);
  }

  // Hàm xử lý khi user thay đổi cách sắp xếp trong bảng
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

  // Hàm xử lý khi user thay đổi trạng thái lọc
  // const handleChangeStatus = (value) => {
  //   setDataFilter({ ...dataFilter, status: value.toString() });
  // }

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          {/* tiêu đề và nút tạo */}
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>Total pages ({paginationListUser.totalPage})</span>
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
                placeholder="Search by name, email or phone"
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
                  statusUser={dataFilter.status}
                  onChangeStatus={handleChangeStatus}
                />
              }
            /> */}
          </div>

          {/* Bảng hiển thị danh sách người dùng, với các cột và dòng dữ liệu tương ứng */}
          <TableCustom
            loading={isLoadingTableUser}
            columns={columns}
            dataSource={users || []}
            rowKey={'_id'}
            pagination={paginationListUser}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        {/* Modal xuất hiện khi user muốn tạo/cập nhật */}
        <CreateOrUpdate
          user={user}
          configModal={configModal}
        />

        {/* modal xác nhận xóa người dùng */}
        <ModalConfirm
          isModalOpen={visibleModalDeleteUser}
          title={`Delete ${user.name}?`}
          description={`Are you sure you want to delete ${user.name}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalDeleteUser(false))}
          onConfirm={() => handleConfirmDeleteUser()}
        />
      </div>
    </MainLayout >
  );
}

export default User;
