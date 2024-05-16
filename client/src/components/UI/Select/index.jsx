import React from 'react';
import './styles.scss';
import { Select } from "antd";
import PropTypes from "prop-types";

function SelectMASQ({ onChange, value, options }) {
  return (
    <Select
      placeholder
      className={`select-custom`}
      defaultValue={value}
      onChange={onChange}
      options={options}
    />
  );
}

SelectMASQ.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

SelectMASQ.defaultProps = {
  options: [],
  value: '',
};

export default SelectMASQ;
