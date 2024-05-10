import React from "react";
import {Empty, Pagination, Table} from "antd";
import styles from './styles.module.scss'
import './styles.scss'
import PropTypes from "prop-types";
import _ from "lodash";

TableDefault.prototype = {
  isPagination: PropTypes.bool
}

TableDefault.defaultProps = {
  isPagination: true
}

function TableDefault(props) {
  let {
    dataSource, columns, pagination, loading,
    onChange, handleSelectPagination, isPagination,
     isFixed, rowKey, rowClassName, extraClassName,
     scroll
  } = props;

  return(
    <div className={`${styles.tableDefaultWrap}`}>
      <Table
        loading={loading}
        className={`main-table mb-[15px] 
            ${!isPagination ? 'no-pagination' : ''} 
            ${isFixed ? 'fixed-cell' : ''} 
            ${extraClassName ? extraClassName : ''} `}
        rowClassName={(record) => {
          if (rowClassName && _.isFunction(rowClassName)) {
            return rowClassName(record) ? 'active-row-table-default' : ''
          }
          return ''
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey={rowKey ? rowKey : 'id'}
        onChange={onChange}
        scroll={scroll ? scroll : { y: isPagination ? 475 : 550, x: 1000 }}
        locale={{
          emptyText: (
              <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Không có dữ liệu"
              />
          ),
      }}
      />
      {
        isPagination ?
          <Pagination
            className={'flex justify-end'}
            current={pagination.currentPage}
            total={pagination.totalRecord}
            pageSize={pagination.perPage}
            onChange={(e) => handleSelectPagination(e)}
            showSizeChanger={false}
          />
        : ''
      }
    </div>
  )
}
export default TableDefault

