import React, { useEffect, useState } from 'react';
import CustomCKEditor from '../../../../components/Ckeditor5';
import styles from "./styles.module.scss";
import InputMASQ from "../../../../components/UI/Input";
import ButtonMASQ from "../../../../components/UI/Button";
import _ from "lodash";
// import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setErrorCreateOrUpdatePost } from "../../../../states/modules/post";
import { handleCreatePost, handleUpdatePost } from "../../../../api/post";
import { Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function CreatePost(props) {
  let { post, config, onSave } = props
  const visibleModalCreateOrUpdatePost = useSelector(state => state.post.visibleModalCreateOrUpdatePost);
  const isLoadingBtnCreateOrUpdatePost = useSelector(state => state.post.isLoadingBtnCreateOrUpdatePost);
  const errorCreateOrUpdatePost = useSelector(state => state.post.errorCreateOrUpdatePost);
  const dispatch = useDispatch();
  const authors = useSelector(state => state.author.authors);
  const categoriess = useSelector(state => state.category.categories);
  const [avatarFileList, setAvatarFileList] = useState([]);
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    title: '',
    content: '',
    thumbnail: '',
    author: null,
    categories: [],
  })

  useEffect(() => {
    dispatch(setErrorCreateOrUpdatePost({
      title: '',
      content: '',
      thumbnail: '',
      author: null,
      categories: []
    }));
  }, [dataCreateOrUpdate, dispatch])

  useEffect(() => {
    setDataCreateOrUpdate({
      title: post.title,
      content: post.content,
      thumbnail: post?.thumbnail,
      author: post.author,
      categories: post?.categories?.map(category => category._id),
    })
  }, [post])

  useEffect(() => {
    if (!visibleModalCreateOrUpdatePost) {
      handleReloadData();
    }
  }, [visibleModalCreateOrUpdatePost])

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      title: '',
      content: '',
      thumbnail: '',
      author: null,
      categories: [],
    })
  }

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataCreateOrUpdate);
    data[type] = value;
    setDataCreateOrUpdate(data);
  }

  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    setDataCreateOrUpdate(prevData => ({
      ...prevData,
      content: data
    }));
  }

  const handleConfirmCreateOrUpdatePost = () => {
    let dataValidate = dataCreateOrUpdate;
    let data = new FormData();
    data.append(`title`, dataCreateOrUpdate.title);
    data.append(`content`, dataCreateOrUpdate.content);
    data.append(`author_id`, dataCreateOrUpdate.author._id);

    // Thêm các _id của categories vào FormData
    if (Array.isArray(dataCreateOrUpdate.categories)) {
      dataCreateOrUpdate.categories.forEach(categoryId => {
        data.append('category_ids[]', categoryId);
      });
    }

    // Thêm avatar vào FormData nếu avatarFileList không rỗng
    if (avatarFileList.length > 0) {
      const avatarFile = avatarFileList[0]
      data.append(`thumbnail`, avatarFile.originFileObj)
    }

    if (config.type !== "CREATE") {
      dataValidate = {
        title: dataCreateOrUpdate.title,
        content: dataCreateOrUpdate.content,
        thumbnail: dataCreateOrUpdate.thumbnail,
        author: dataCreateOrUpdate.author._id,
        categories: dataCreateOrUpdate.categories.map(category => category._id),
      }
    }

    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdatePost);
    dispatch(setErrorCreateOrUpdatePost(validate.dataError));
    if (!validate.isError) {
      if (config.type === "CREATE") {
        dispatch(handleCreatePost(data))
        onSave();
      } else {
        dispatch(handleUpdatePost(data, post._id))
        onSave();
      }
    }
  }

  const handleCancel = () =>{
    onSave();
  }

  const handleAvatarUpload = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // Giới hạn chỉ chọn một tệp tin
    setAvatarFileList(fileList);

    // Xử lý khi tệp tin đã được chọn
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url; // Lưu trữ URL của tệp tin tải lên
      }
      return file;
    });

    // Chuyển đổi tệp tin thành dạng Blob hoặc File và lưu vào state
    const avatarFile = fileList[0];
    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: avatarFile.type });
        avatarFile.originFileObj = new File([blob], avatarFile.name, { type: avatarFile.type });
        setAvatarFileList([avatarFile]);
      };
      reader.readAsArrayBuffer(avatarFile.originFileObj);
    }
  };

  const options = authors?.map((author) => ({
    label: author.name,
    value: author._id,
  }));

  const handleChangeAuthors = (value) => {
    const newData = _.cloneDeep(dataCreateOrUpdate)
    setDataCreateOrUpdate({
      ...newData,
      author: {
        ...newData.author,
        _id: value
      }
    })
  };

  const optionsMultiple = categoriess?.map((category) => ({
    label: category.name,
    value: category._id,
  }));


  const handleChangeCategorys = (value) => {
    const newData = _.cloneDeep(dataCreateOrUpdate)
    setDataCreateOrUpdate({
      ...newData,
      categories: value
    })
  };

  return (
    <div className={styles.postManagementWrap}>
      <div className={styles.mainModalWrap}>

        <div className={styles.wrapperAuthorCategory}>
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Ảnh bìa</div>
            <Upload
              beforeUpload={() => false}
              onChange={handleAvatarUpload}
              fileList={avatarFileList}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>

          {/* <div className={styles.inputWrapper}> */}
            <ButtonMASQ
              textBtn={'Hủy'}
              loading={isLoadingBtnCreateOrUpdatePost}
              onClick={() => handleCancel()}
              disable={false}
              style={{
                minWidth: "120px",
                marginRight:"10px",
                marginTop:"-40px"
              }}
            />
            <ButtonMASQ
              textBtn={'Lưu'}
              loading={isLoadingBtnCreateOrUpdatePost}
              onClick={() => handleConfirmCreateOrUpdatePost()}
              disable={false}
              style={{
                minWidth: "120px",
                marginRight:"10px",
                marginTop:"-40px"
              }}
            />
          {/* </div> */}
        </div>

        <div className={styles.wrapperAuthorCategory}>
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Tác giả *</div>
            <Select
              placeholder={"Chọn tác giả..."}
              style={{ width: '50%' }}
              allowClear
              value={dataCreateOrUpdate.author?._id}
              onChange={handleChangeAuthors}
              options={options}
            // error={errorCreateOrUpdatePost.author?._id}
            />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.label}>Danh mục *</div>
            <Select
              placeholder={"Chọn danh mục..."}
              mode="multiple"
              style={{ width: '50%' }}
              allowClear
              value={dataCreateOrUpdate.categories}
              onChange={handleChangeCategorys}
              // onBlur={() => validateBlur('categories')}
              options={optionsMultiple}
            // error={errorCreateOrUpdatePost.categories}
            />
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Tiêu đề *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập tiêu đề..."}
            onChange={(e) => handleChangeInput(e, 'title')}
            // onBlur={() => validateBlur('title')}
            value={dataCreateOrUpdate.title}
          // error={errorCreateOrUpdatePost.title}
          />
        </div>

        <div >
          <div className={styles.inputWrapperContent}>
            <div className={styles.label}>Nội dung *</div>
          </div>
          <CustomCKEditor
            // onMouseDown={(e) => e.preventDefault()}
            data={dataCreateOrUpdate.content || ''}
            onChange={handleCKEditorChange}
            errors={errorCreateOrUpdatePost.content}
          />
          {/* {errorCreateOrUpdatePost.content && <div className={styles.error}>{errorCreateOrUpdatePost.content}</div>} */}
        </div>


      </div>
    </div>
  );
}

export default CreatePost;
