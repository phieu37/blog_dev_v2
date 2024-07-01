
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
import { getListCategory, handleDeleteCategory } from "../../api/category";
import {
  setVisibleModalCreateOrUpdateCategory, setVisibleModalDeleteCategory,
  // setDataFilter 
} from "../../states/modules/category";
import _ from "lodash";
// import Filter from './components/Filter';
// import BtnFilter from "../../components/ButtonFilter";
import {
  // EyeOutlined, 
  PlusOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function Category() {
  const navigate = useNavigate()
  // lấy thông tin người dùng hiện tại từ Redux store(từ state authCategory trong reducer auth)
  const authAuthor = useSelector(state => state.auth.authAuthor);
  // mảng chứa các cấu hình cho từng cột trong bảng dữ liệu
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (field) => <span>{field || "Đang cập nhật"}</span>,
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (field) => <span>{field || "Đang cập nhật"}</span>,
      // defaultSortOrder: '',
      // showSorterTooltip: false,
      // sorter: true,
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '120px',
      render: (field, record) => (
        <>
          {
            <div className={styles.btnAction}>
              <Tooltip title="Sửa">
                <div onClick={() => handleEdit(record)} className={styles.btnWrap}>
                  <img src={IconEditTable} alt="icon-edit" />
                </div>
              </Tooltip>
              {
                <div className={styles.btnWrap}>
                  <Tooltip title="Xóa">
                    <div onClick={() => handleShowConfirmDelete(record)}>
                      <img src={IconDeleteTable} alt="icon-delete" />
                    </div>
                  </Tooltip>
                </div>
              }
              {
                <Tooltip title="Xem chi tiết">
                  <div onClick={() => navigate(`/categories/${record._id}`)} className={styles.btnWrap}>
                    <img className={styles.btnWrapImg} src={IconDetailTable} alt="icon-delete" />
                  </div>
                </Tooltip>
              }
            </div>
          }
        </>

      ),
    },
  ];

  // lấy state từ Redux store(các giá trị state của slice category)
  const categoryss = useSelector(state => state.category.categories); // Lấy danh sách category
  // console.log('🚀 ~ Category ~ categorys:', categorys)
  const isLoadingTableCategory = useSelector(state => state.category.isLoadingTableCategory); // Lấy trạng thái loading
  const paginationListCategory = useSelector(state => state.category.paginationListCategory); // Lấy thông tin phân trang
  const visibleModalDeleteCategory = useSelector(state => state.category.visibleModalDeleteCategory); // Lấy trạng thái hiển thị modal xác nhận xóa

  // tạo ra các state cục bộ trong functional component
  const [category, setCategory] = useState({}); // lưu thông tin category được chọn để sửa/xóa
  const [configModal, setConfigModal] = useState({  // lưu cấu hình của modal tạo/cập nhật
    title: 'Create category',
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
    dispatch(getListCategory(dataFilter))
  }, [dataFilter, dispatch])

  // Dispatch action hiển thị modal tạo category và cấu hình kiểu, tiêu đề của modal
  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateCategory(true))
    setConfigModal({
      title: "Create category",
      type: "CREATE"
    })
  }
  // Dispatch action hiển thị modal cập nhật category và cấu hình kiểu, tiêu đề của modal
  // đồng thời set category được chọn vào state category
  const handleEdit = (category) => {
    let categorySelect = _.cloneDeep(category)
    setCategory(categorySelect)
    dispatch(setVisibleModalCreateOrUpdateCategory(true))
    setConfigModal({
      title: "Update category",
      type: "UPDATE"
    })
  }

  // Dispatch action hiển thị modal xác nhận xóa category và set category được chọn vào state category
  const handleShowConfirmDelete = (category) => {
    let categorySelect = _.cloneDeep(category)
    setCategory(categorySelect)
    dispatch(setVisibleModalDeleteCategory(true))
  }

  // Dispatch action xác nhận xóa category
  const handleConfirmDeleteCategory = () => {
    dispatch(handleDeleteCategory(category._id))
  }

  // Hàm xử lý khi category thay đổi trang hiện tại
  const changeCurrentPage = (page) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.page = page;
    setDataFilter(newDataFilter);
  }

  // Hàm xử lý khi category tìm kiếm
  const handleSearch = (e) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.keySearch = e.target.value;
    setDataFilter(newDataFilter);
  }

  // Hàm xử lý khi category thay đổi cách sắp xếp trong bảng
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

  // Hàm xử lý khi category thay đổi trạng thái lọc
  // const handleChangeStatus = (value) => {
  //   setDataFilter({ ...dataFilter, status: value.toString() });
  // }

  return (
    <MainLayout>
      <div className={styles.categoryManagementWrap}>
        <div className={styles.mainWrap}>
          {/* tiêu đề và nút tạo */}
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>Tổng số mục ({paginationListCategory.totalPage})</span>
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
                placeholder="Tìm kiếm theo tên danh mục..."
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
                  statusCategory={dataFilter.status}
                  onChangeStatus={handleChangeStatus}
                />
              }
            /> */}
          </div>

          {/* Bảng hiển thị danh sách người dùng, với các cột và dòng dữ liệu tương ứng */}
          <TableCustom
            loading={isLoadingTableCategory}
            columns={columns}
            dataSource={categoryss || []}
            rowKey={'_id'}
            pagination={paginationListCategory}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        {/* Modal xuất hiện khi category muốn tạo/cập nhật */}
        <CreateOrUpdate
          category={category}
          configModal={configModal}
        />

        {/* modal xác nhận xóa người dùng */}
        <ModalConfirm
          // loading={isLoadingBtnDeleteCategory}
          isModalOpen={visibleModalDeleteCategory}
          title={`Xóa ${category.name}?`}
          description={`Bạn có chắc chắn muốn xóa danh mục "${category.name}" ? Hành động của bạn không thể hoàn tác.`}
          onClose={() => dispatch(setVisibleModalDeleteCategory(false))}
          onConfirm={() => handleConfirmDeleteCategory()}
        />
      </div>
    </MainLayout >
  );
}

export default Category;
