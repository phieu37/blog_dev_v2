import React from "react"
import { DatePicker } from "antd"
import PropTypes from "prop-types"
import styles from "./styles.module.scss"
import "./styles.scss"

DatePickerMSQA.propTypes = {
  value: PropTypes.object,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  indexIconPrefix: PropTypes.string,
  format: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  allowClear: PropTypes.bool,
  isShowError: PropTypes.bool,
}

DatePickerMSQA.defaultProps = {
  value: undefined,
  error: "",
  format: "DD/MM/YYYY",
  placeholder: "Enter date",
  indexIconPrefix: "left",
  allowClear: false,  // Không cho phép xóa giá trị
  isShowError: true, 
  onChange: () => { },
  onFocus: () => { },
  onBlur: () => { },
}

function DatePickerMSQA(props) {
  return (
    <div
      className={`
        ${styles.inputWrap} 
      `}
    >
      <DatePicker
        format="DD/MM/YYYY" // Định dạng ngày tháng hiển thị trên DatePicker
        placeholder={props.placeholder}
        allowClear={props.allowClear}
        onChange={(e) => props.onChange(e)}
        onBlur={(e) => props.onBlur(e)}
        value={props.value}
        className={`input-custom ${props.error ? "inputError" : ""}`} // Thêm class inputError nếu có lỗi
      />
      {
        props.error && props.isShowError ?
          <div className={styles.error}>{props.error}</div> : ""
      }
    </div>
  )
}

export default DatePickerMSQA
