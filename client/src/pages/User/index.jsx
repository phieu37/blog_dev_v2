
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import TableCustom from '../../components/UI/Table'
import InputMASQ from "../../components/UI/Input";
import ButtonMASQ from "../../components/UI/Button";
import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../assets/images/icon/table/edit_12x12.svg";
import IconRepeatTable from "../../assets/images/icon/table/repeat_16x16.svg";
// import SwitchMASQ from "../../components/UI/Switch";
import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusUser, getListUser, handleDeleteUser, resetPasswordUser } from "../../api/user";
import { setIdUser, setVisibleModalChangePassword, setVisibleModalChangeStatus, setVisibleModalCreateOrUpdateUser, setVisibleModalDeleteUser } from "../../states/modules/user";
import _ from "lodash";
import UserImg from '../../assets/images/user/avatar_default.jpg';
import ChangePassword from './components/ChangePassword';
import ModalDefault from '../../components/Modal';

function User() {
  // lấy thông tin người dùng hiện tại từ Redux store(từ state authUser trong reducer auth)
  const authUser = useSelector(state => state.auth.authUser);
  const visibleModalChangeStatus = useSelector(state => state.user.visibleModalChangeStatus);

  const [userId, setUserId] = useState(null);
  const [userStatus, setUserStatus] = useState(false);
  const [contentModalChangeStatus, setContentModalChangeStatus] = useState('');

  const openModalChangeStatus = (e, user) => {
    setUserId(user._id)
    setUserStatus(e)
    setContentModalChangeStatus(<span>Bạn có chắc chắn muốn {e ? <b>mở khóa</b> : <b>khóa</b>} account <div><b>{user.name}</b>?</div></span>)
    dispatch(setVisibleModalChangeStatus(true))
  }

  const handleConfirmChangeStatus = () => {
    if (userId) {
      dispatch(changeStatusUser(userId, userStatus ? 1 : 0))
    }
  }

  // mảng chứa các cấu hình cho từng cột trong bảng dữ liệu
  const columns = [
    {
      title: 'Họ và tên',
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
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (field) => <span>{field || "Đang cập nhật"}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '120px',
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => <Switch
        checked={text}
        onChange={(e) => openModalChangeStatus(e, record)}
      />
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '110px',
      render: (field, record) => (
        <>
          {authUser.id === record.id && (
            <div className={styles.btnAction}>
              <Tooltip title="Sửa">
                <div onClick={() => handleEdit(record)} className={styles.btnWrap}>
                  <img src={IconEditTable} alt="icon-edit" />
                </div>
              </Tooltip>
              <Tooltip title="Đổi mật khẩu">
                <div onClick={() => handleShowConfirmResetPassword(record)} className={styles.btnWrap}>
                  <img src={IconRepeatTable} alt="icon-repeat" />
                </div>
              </Tooltip>
              <Tooltip title="Xóa">
                <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
                  <img src={IconDeleteTable} alt="icon-delete" />
                </div>
              </Tooltip>
            </div>
          )}
        </>
      ),
    },
  ];

  // lấy state từ Redux store(các giá trị state của slice user)
  const users = useSelector(state => state.user.users); // Lấy danh sách user
  const isLoadingTableUser = useSelector(state => state.user.isLoadingTableUser); // Lấy trạng thái loading
  const paginationListUser = useSelector(state => state.user.paginationListUser); // Lấy thông tin phân trang
  const visibleModalDeleteUser = useSelector(state => state.user.visibleModalDeleteUser); // Lấy trạng thái hiển thị modal xác nhận xóa
  const visibleModalResetPassword = useSelector(state => state.user.visibleModalResetPassword); // Lấy trạng thái hiển thị modal xác nhận xóa

  // tạo ra các state cục bộ trong functional component
  const [user, setUser] = useState({}); // lưu thông tin user được chọn để sửa/xóa
  const [configModal, setConfigModal] = useState({  // lưu cấu hình của modal tạo/cập nhật
    title: 'Tạo mới người dùng',
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
      title: "Tạo mới người dùng",
      type: "CREATE"
    })
  }
  // Dispatch action hiển thị modal cập nhật user và cấu hình kiểu, tiêu đề của modal
  // đồng thời set user được chọn vào state user
  const handleEdit = (user) => {
    let userSelect = _.cloneDeep(user)
    setUser(userSelect)
    dispatch(setVisibleModalCreateOrUpdateUser(true))
    setConfigModal({
      title: "Cập nhật người dùng",
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

  const handleShowConfirmResetPassword = (user) => {
    let userSelect = _.cloneDeep(user)
    setUser(userSelect)
    dispatch(setVisibleModalChangePassword(true))
    dispatch(setIdUser(user._id))
  }

  // const handleConfirmResetPassword = () => {
  //   dispatch(resetPasswordUser(user._id))
  // }

  const handleToggleVisibleModalChangePassword = () => {
    dispatch(setVisibleModalChangePassword(!visibleModalResetPassword));
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
            <span className={styles.title}>Tổng số mục ({paginationListUser.totalPage})</span>
            <div className={styles.btnWrap}>
              <div className={styles.btnWrapIcon}>
                <PlusOutlined />
              </div>
              <div>
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
          </div>

          {/*  ô input để tìm kiếm và các bộ lọc khác */}
          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputMASQ
                placeholder="Tìm kiếm theo họ và tên, email hoặc số điên thoại..."
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

        {/* Modal tạo/cập nhật */}
        <CreateOrUpdate
          user={user}
          configModal={configModal}
        />

        {/* modal xác nhận xóa */}
        <ModalConfirm
          isModalOpen={visibleModalDeleteUser}
          title={`Xóa ${user.name}?`}
          description={`Bạn có chắc chắn muốn xóa ${user.name}? Hành động của bạn không thể hoàn tác.`}
          onClose={() => dispatch(setVisibleModalDeleteUser(false))}
          onConfirm={() => handleConfirmDeleteUser()}
        />

        {/* Modal thay đổi status */}
        <ModalConfirm
          isModalOpen={visibleModalChangeStatus}
          title={`Xác nhận trạng thái`}
          description={contentModalChangeStatus}
          onClose={() => dispatch(setVisibleModalChangeStatus(false))}
          onConfirm={() => handleConfirmChangeStatus()}
        />

        {/* change password */}
        <ModalDefault
          isModalOpen={visibleModalResetPassword}
          title={`Đổi mật khẩu`}
          description={`Bạn có chắc chắn muốn đổi mật khẩu ${user.name}? `}
          handleOk={() => handleToggleVisibleModalChangePassword()}
          handleCancel={() => handleToggleVisibleModalChangePassword()}
        >
          <ChangePassword
            closeModal={() => handleToggleVisibleModalChangePassword()}
          />
        </ModalDefault>

      </div>
    </MainLayout >
  );
}

export default User;
