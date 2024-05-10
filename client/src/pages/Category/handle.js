// import React, { useEffect, useState } from "react"
// import styles from "./styles.module.scss"
// import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg"
// import IconEditTable from "../../assets/images/icon/table/edit_12x12.svg"
// import SwitchMASQ from "../../components/UI/Switch"
// import { useDispatch, useSelector } from "react-redux"
// import { getListAuthor, handleDeleteAuthor } from "../../api/author"
// import {
//   setVisibleModalCreateOrUpdateAuthor,
//   setVisibleModalDeleteAuthor,
//   setDataFilter,
// } from "../../states/modules/author"
// import _ from "lodash"
// import AuthorImg from "../../assets/images/user/avatar_default.jpg"
// import { formatDate } from "../../utils/helper"

// export default function Handle() {
//   const dataFilter = useSelector((state) => state.author.dataFilter)
//   const authAuthor = useSelector((state) => state.auth.authAuthor)
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (field, record) => (
//         <div className={styles.nameWrap}>
//           <div className={styles.imgWrap}>
//             <img src={record.avatar || AuthorImg} alt="img" />
//           </div>
//           <span>{field}</span>
//         </div>
//       ),
//       defaultSortOrder: "",
//       showSorterTooltip: false,
//       sorter: true,
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       render: (field) => <span>{field || "Đang cập nhật"}</span>,
//       defaultSortOrder: "",
//       showSorterTooltip: false,
//       sorter: true,
//     },
//     {
//       title: "Bio",
//       dataIndex: "bio",
//       key: "bio",
//       render: (field) => <span>{field || "Đang cập nhật"}</span>,
//       defaultSortOrder: "",
//       showSorterTooltip: false,
//       sorter: true,
//     },
//     {
//       title: "Birthday",
//       dataIndex: "birthday",
//       key: "birthday",
//       render: (field) => <span>{field ? formatDate(field * 1000) : "Đang cập nhật"}</span>,
//       defaultSortOrder: "",
//       showSorterTooltip: false,
//       sorter: true,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (field) => <span>{field === 1 ? "Active" : "Inactive" || "Đang cập nhật"}</span>,
//       defaultSortOrder: "",
//       showSorterTooltip: false,
//       sorter: true,
//     },
//     {
//       title: "Certificates",
//       dataIndex: "certificate",
//       key: "name",
//       render: (field) => <span>{field.name}</span>,
//       defaultSortOrder: "",
//       showSorterTooltip: false,
//       sorter: true,
//     },
//     {
//       title: "CertificatesDate",
//       dataIndex: "certificate",
//       key: "date",
//       render: (field) => <span>{field.date ? formatDate(field.date * 1000) : "Đang cập nhật"}</span>,
//       defaultSortOrder: "",
//       showSorterTooltip: false,
//       sorter: true,
//     },
//     {
//       title: "Actions",
//       key: "action",
//       fixed: "right",
//       align: "center",
//       width: "80px",
//       render: (field, record) => (
//         <>
//           {
//             // kiểm tra quyền sửa/xóa chỉ hiển thị nếu trùng id
//             // authAuthor.id !== record.id ?
//             authAuthor.id === record.id ? (
//               <div className={styles.btnAction}>
//                 <div onClick={() => handleEdit(record)} className={styles.btnWrap}>
//                   <img src={IconEditTable} alt="icon-edit" />
//                 </div>
//                 {
//                   // authAuthor.id !== record.id ?
//                   authAuthor.id === record.id ? (
//                     <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
//                       <img src={IconDeleteTable} alt="icon-delete" />
//                     </div>
//                   ) : (
//                     ""
//                   )
//                 }
//                 <div className={`switch-table-style-custom ${styles.btnWrap}`}>
//                   <SwitchMASQ
//                     // disabled={true}
//                     // status={record.status}
//                     status={true}
//                   />
//                 </div>
//               </div>
//             ) : (
//               ""
//             )
//           }
//         </>
//       ),
//     },
//   ]

//   // lấy state từ Redux store(các giá trị state của slice author)
//   const authors = useSelector((state) => state.author.authors) // Lấy danh sách author
//   // console.log('🚀 ~ Author ~ authors:', authors)
//   const isLoadingTableAuthor = useSelector((state) => state.author.isLoadingTableAuthor) // Lấy trạng thái loading
//   const paginationListAuthor = useSelector((state) => state.author.paginationListAuthor) // Lấy thông tin phân trang
//   const visibleModalDeleteAuthor = useSelector((state) => state.author.visibleModalDeleteAuthor) // Lấy trạng thái hiển thị modal xác nhận xóa

//   // tạo ra các state cục bộ trong functional component
//   const [author, setAuthor] = useState({}) // lưu thông tin author được chọn để sửa/xóa
//   const [configModal, setConfigModal] = useState({
//     // lưu cấu hình của modal tạo/cập nhật
//     title: "Create author",
//     type: "CREATE",
//   })
//   // gửi các action đến Redux store
//   const dispatch = useDispatch()

//   // gửi yêu cầu lấy danh sách author mỗi khi dataFilter thay đổi
//   // useEffect(() => {
//   //   dispatch(getListAuthor(dataFilter))
//   // }, [dataFilter, dispatch])
//   useEffect(() => {
//     getListAuthor(dataFilter)
//   }, [dataFilter])

//   // Dispatch action hiển thị modal tạo author và cấu hình kiểu, tiêu đề của modal
//   const handleCreate = () => {
//     dispatch(setVisibleModalCreateOrUpdateAuthor(true))
//     setConfigModal({
//       title: "Create author",
//       type: "CREATE",
//     })
//   }
//   // Dispatch action hiển thị modal cập nhật author và cấu hình kiểu, tiêu đề của modal
//   // đồng thời set author được chọn vào state author
//   const handleEdit = (author) => {
//     let authorSelect = _.cloneDeep(author)
//     setAuthor(authorSelect)
//     dispatch(setVisibleModalCreateOrUpdateAuthor(true))
//     setConfigModal({
//       title: "Update author",
//       type: "UPDATE",
//     })
//   }

//   // Dispatch action hiển thị modal xác nhận xóa author và set author được chọn vào state author
//   const handleShowConfirmDelete = (author) => {
//     let authorSelect = _.cloneDeep(author)
//     setAuthor(authorSelect)
//     dispatch(setVisibleModalDeleteAuthor(true))
//   }

//   // Dispatch action xác nhận xóa author
//   const handleConfirmDeleteAuthor = () => {
//     dispatch(handleDeleteAuthor(author._id))
//   }

//   // Hàm xử lý khi author thay đổi trang hiện tại
//   const changeCurrentPage = (page) => {
//     let newDataFilter = _.cloneDeep(dataFilter)
//     newDataFilter.page = page
//     dispatch(setDataFilter(newDataFilter))
//     // dispatch(getListAuthor(newDataFilter))
//   }

//   // Hàm xử lý khi author tìm kiếm
//   const handleSearch = (e) => {
//     let newDataFilter = _.cloneDeep(dataFilter)
//     newDataFilter.keySearch = e.target.value
//     dispatch(setDataFilter(newDataFilter))
//   }

//   const onChange = (pagination, filters, sorter) => {
//     let newDataFilter = _.cloneDeep(dataFilter)
//     newDataFilter.order = null
//     newDataFilter.column = null
//     if (sorter.order && sorter.field) {
//       newDataFilter.order = sorter.order === "ascend" ? "desc" : "asc"
//       newDataFilter.column = sorter.field
//     }
//     dispatch(setDataFilter(newDataFilter))
//   }

//   // Hàm xử lý khi author thay đổi trạng thái lọc
//   const handleChangeStatus = (value) => {
//     setDataFilter({ ...dataFilter, status: value.toString() })
//   }

//   return {
//     author, setAuthor,
//     dispatch,
//     columns,
//     dataFilter,
//     handleSearch,
//     onChange,
//     handleChangeStatus,
//     authors,
//     isLoadingTableAuthor,
//     paginationListAuthor,
//     visibleModalDeleteAuthor,
//     configModal,
//     handleCreate,
//     handleConfirmDeleteAuthor,
//     changeCurrentPage,
//   }
// }
