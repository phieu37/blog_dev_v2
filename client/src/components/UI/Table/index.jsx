import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import { Pagination, Table } from 'antd';
import PropTypes from "prop-types";

TableMASQ.prototype = {
  columns: PropTypes.array.isRequired,  // Mảng các cột của bảng
  dataSource: PropTypes.array.isRequired, // Dữ liệu nguồn của bảng
  loading: PropTypes.bool.isRequired, // Trạng thái loading của bảng
  rowKey: PropTypes.string.isRequired,  // Key của mỗi hàng
  onChange: PropTypes.func.isRequired // Callback khi có sự thay đổi
}

TableMASQ.defaultProps = {
  columns: [],
  dataSource: [],
  loading: false,
  rowKey: '_id',
  onChange: () => { }
}

function TableMASQ(props) {
  let { columns, dataSource, loading, rowKey, pagination, onChangeCurrentPage, onChange } = props
  // console.log('🚀 ~ TableMASQ ~ pagination:', pagination)

  return (
    <div className={styles.tableWrap}>
      <Table
        className={`table-custom ${styles.table}`} // Gắn class cho Table từ Ant Design và class từ styles.module.scss
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}  // Tắt phân trang mặc định của Ant Design
        onChange={onChange}
        rowKey={rowKey}
      />

      {/* Phân trang */}
      <div className={styles.paginationWrap}>
        {/* Hiển thị thông tin về số lượng bản ghi */}
        <span className={styles.textPagination}>
          {/* Hiển thị số lượng bản ghi từ */}
          <span>Đang hiển thị {(pagination.perPage * (pagination.currentPage - 1)) + 1} đến</span>
          {/* Hiển thị số lượng bản ghi đến */}
          <span> {pagination.totalPage > (pagination.perPage * pagination.currentPage) ?
            pagination.perPage * pagination.currentPage : pagination.totalPage}
          </span>
          {/* Hiển thị tổng số lượng bản ghi */}
          <span> trong {pagination.totalPage} mục</span>
        </span>

        {/* Component Pagination từ Ant Design */}
        <Pagination
          current={pagination.currentPage}    // Trang hiện tại
          total={pagination.totalPage || 0} // Tổng số lượng bản ghi
          pageSize={pagination.perPage}       // Số lượng bản ghi trên mỗi trang
          onChange={onChangeCurrentPage}      // Callback khi chuyển trang
        />
      </div>
    </div>
  );
}

export default TableMASQ
