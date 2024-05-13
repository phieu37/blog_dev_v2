import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";


ImageUploadMSQA.propTypes = {
  defaultFileList: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

ImageUploadMSQA.defaultProps = {
  defaultFileList: [],
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ImageUploadMSQA({ defaultFileList, onChange, listType }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState(defaultFileList);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange && onChange(newFileList);
  };

  return (
    <div className={styles.avatarWrap}>
      <Upload
        className={styles.upload}
        listType={listType}
        fileList={fileList}
        beforeUpload={() => false}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <PlusOutlined />
            <div className={styles.uploadPlus}>Upload</div>
          </div>
        )}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default ImageUploadMSQA;
