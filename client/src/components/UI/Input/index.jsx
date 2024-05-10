import React, { useState } from "react"
import { Input } from "antd"
import PropTypes from "prop-types"
import styles from "./styles.module.scss"
import "./styles.scss"
import show from "../../../assets/images/icon/show_password.svg"
import hide from "../../../assets/images/icon/hide_password.svg"

// kiểm tra tính hợp lệ của các props được truyền vào
InputMASQ.prototype = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
  isShowError: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  indexIconPrefix: PropTypes.string,
  maxLength: PropTypes.string,
  iconPrefix: PropTypes.string,
  keydown: PropTypes.func,
  onKeyDown: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

// giá trị mặc định cho các props khi không được truyền vào
InputMASQ.defaultProps = {
  type: "text",
  value: "",
  error: "",
  disabled: false,
  isShowError: true,
  placeholder: "Enter input",
  indexIconPrefix: "left",
  maxLength: "",
  iconPrefix: "",
  keydown: () => { },
  onKeyDown: () => { },
  onKeyPress: () => { },
  onPressEnter: () => { },
  onBlur: () => { },
  onFocus: () => { },
  onChange: () => { },
}

// input tùy chỉnh có tính năng: hiển thị, ẩn mật khẩu, xử lý sự kiện, hiển thị lỗi khi có
function InputMASQ(props) {
  // passwordVisible lưu trữ trạng thái hiện tại của mật khẩu, mặc định là false
  const [passwordVisible, setPasswordVisible] = useState(false)

  // thay đổi trạng thái của passwordVisible từ true sang false và ngược lại
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible)
  }
  return (
    <div
      className={`
        ${styles.inputWrap} 
        // xác định vị trí của icon và tùy chỉnh kiểu hiển thị của input
        ${props.iconPrefix && props.indexIconPrefix === "left" ?
          styles.inputPreFixWrap : styles.inputPreFixRightWrap}
        ${props.type === "password" ? styles.inputPassword : ""} 
      `}
    >
      <Input
        disabled={props.disabled}
        type={props.type === "password" && !passwordVisible ? "password" : "text"}
        className={`input-custom ${props.error ? "inputError" : ""}`} // Nếu props.error tồn tại, class "inputError" sẽ được thêm vào 
        style={{ fontFeatureSettings: "normal", color: "#000000" }}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        onKeyDown={(e) => props.onKeyDown(e)}
        onKeyPress={(e) => props.onKeyPress(e)}
        onPressEnter={(e) => props.onPressEnter(e)}
        onFocus={(e) => props.onFocus(e)}
        onBlur={(e) => props.onBlur(e)}
        value={props.value}
        prefix={props.prefix}
        maxLength={props.maxLength}
      />
      {
        // input để nhập password, thay đổi icon theo trạng thái của passwordVisible
        props.type === "password" ?
          <div
            className={styles.visiblePassword}
            onClick={() => togglePassword()}
          >
            <img src={passwordVisible ? show : hide} alt="" />
          </div> : ""
      }
      {
        props.iconPrefix ?
          <span className={styles.iconPrefix}>{props.iconPrefix}</span> : ""
      }
      {
        // có props.error và isShowError =true hiển thị thông báo lỗi
        props.error && props.isShowError ?
          <span className={styles.error}>{props.error}</span> : ""
      }
    </div>
  )
}

export default InputMASQ
