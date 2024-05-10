import React, { useState } from 'react';
import { Button } from 'antd';
import PropTypes from "prop-types";
import styles from './styles.module.scss';

// kiểm tra kiểu dữ liệu của các props được truyền vào
ButtonMASQ.prototype = {
  onClick: PropTypes.func.isRequired,
  textBtn: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
}

// giá trị mặc định cho các props nếu chúng không được truyền vào
ButtonMASQ.defaultProps = {
  textBtn: 'OK',
  style: {},
  loading: false,
  disabled: false,
  onClick: () => { }
}

function ButtonMASQ(props) {
  // tạo state isHovered để theo dõi trạng thái hover của nút
  const [isHovered, setIsHovered] = useState(false);

  // object colorMappings để ánh xạ màu nền hover với màu nền ban đầu của nút
  const colorMappings = {
    '#2B3847': '#374B63',
    '#2F4858': '#374B63',
    '#6B7F8D': '#A1A7B3',
    '#D5DADD': '#E3EBEF',
    '#EBEDF3': '#F5F8FF',
    '#FFF': '#F8F8F8'
  };

  // Màu nền mặc định
  const defaultBackgroundColor = '#2B3847';
  const initialBackground = props.style.background || props.style.backgroundColor || defaultBackgroundColor;

  const style = {
    ...props.style,
    background: isHovered ? colorMappings[initialBackground] || initialBackground : initialBackground,
    backgroundColor: isHovered ? colorMappings[initialBackground] || initialBackground : initialBackground
  };

  return (
    <div className={styles.btnWrap}>
      <Button
        disabled={props.disabled}
        loading={props.loading}
        className={styles.btn}
        style={style || ''}
        onClick={() => props.onClick()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {props.textBtn}
      </Button>
    </div>
  );
}

export default ButtonMASQ
