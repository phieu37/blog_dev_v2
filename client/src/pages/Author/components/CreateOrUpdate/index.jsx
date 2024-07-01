import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import InputMASQ from "../../../../components/UI/Input"
import ButtonMASQ from "../../../../components/UI/Button"
import _ from "lodash"
import { isValidate } from "../../../../utils/validate"
import { handleCheckValidateConfirm } from "../../../../utils/helper"
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { setErrorCreateOrUpdateAuthor, setVisibleModalCreateOrUpdateAuthor } from "../../../../states/modules/author"
import { handleCreateAuthor, handleUpdateAuthor } from "../../../../api/author"
import DatePickerMSQA from "../../../../components/UI/DataPicker"
import moment from "moment"
import dayjs from "dayjs"
import { Button, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import CustomCKEditor from '../../../../components/Ckeditor5';

CreateOrUpdate.prototype = {
  isModalOpen: PropTypes.bool.isRequired,
  isLoadingTable: PropTypes.bool.isRequired,
  configModal: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
}

CreateOrUpdate.defaultProps = {
  isModalOpen: false,
  isLoadingTable: false,
  textBtnConfirm: "OK",
  configModal: {
    title: "Title",
    type: "CREATE",
  },
}

function CreateOrUpdate(props) {
  let { author, configModal } = props
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    name: "",
    email: "",
    bio: "",
    birthday: "",
    // status: "",
    certificate: "",
    date: "",
    avatar: "",
  })
  const visibleModalCreateOrUpdateAuthor = useSelector((state) => state.author.visibleModalCreateOrUpdateAuthor)
  const isLoadingBtnCreateOrUpdateAuthor = useSelector((state) => state.author.isLoadingBtnCreateOrUpdateAuthor)
  const errorCreateOrUpdateAuthor = useSelector((state) => state.author.errorCreateOrUpdateAuthor)
  const dispatch = useDispatch()

  useEffect(() => {
    handleReloadData()
  }, [visibleModalCreateOrUpdateAuthor])

  useEffect(() => {
    dispatch(
      setErrorCreateOrUpdateAuthor({
        name: "",
        email: "",
        bio: "",
        birthday: "",
        // status: "",
        certificate: "",
        date: "",
        avatar: "",
      })
    )
  }, [dataCreateOrUpdate, dispatch])

  useEffect(() => {
    setDataCreateOrUpdate({
      name: author.name,
      email: author.email,
      bio: author.bio,
      birthday: author.birthday,
      // status: author.status,
      certificate: author?.certificate?.name,
      date: author?.certificate?.date,
      avatar: author?.avatar,
    })
  }, [author])

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      name: "",
      email: "",
      bio: "",
      birthday: "",
      // status: "",
      certificate: "",
      date: "",
      avatar: "",
    })
  }

  const handleDateChange = (date, type) => {
    const formattedDate = moment(date.$d).unix()
    setDataCreateOrUpdate({ ...dataCreateOrUpdate, [type]: formattedDate })
  }

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value
    let data = _.cloneDeep(dataCreateOrUpdate)
    data[type] = value
    setDataCreateOrUpdate(data)
  }

  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    setDataCreateOrUpdate(prevData => ({
      ...prevData,
      bio: data
    }));
  }

  const validateBlur = (type) => {
    let validate = isValidate(dataCreateOrUpdate, type, errorCreateOrUpdateAuthor)
    dispatch(setErrorCreateOrUpdateAuthor(validate.error))
    return validate.isError
  }

  const handleConfirmCreateOrUpdateAuthor = () => {
    let dataValidate = dataCreateOrUpdate
    let data = new FormData()
    data.append(`name`, dataCreateOrUpdate.name)
    data.append(`email`, dataCreateOrUpdate.email)
    data.append(`bio`, dataCreateOrUpdate.bio)
    data.append(`birthday`, moment.unix(dataCreateOrUpdate.birthday).format("DD/MM/YYYY"))
    // data.append(`status`, dataCreateOrUpdate.status)
    data.append(`certificate`, dataCreateOrUpdate.certificate)
    data.append(`date`, moment.unix(dataCreateOrUpdate.date).format("DD/MM/YYYY"))

    // Thêm avatar vào FormData nếu avatarFileList không rỗng
    if (avatarFileList.length > 0) {
      const avatarFile = avatarFileList[0] // Chỉ lấy tệp tin đầu tiên nếu có nhiều tệp tin
      data.append(`avatar`, avatarFile.originFileObj)
    }

    if (configModal.type !== "CREATE") {
      dataValidate = {
        name: dataCreateOrUpdate.name,
        email: dataCreateOrUpdate.email,
        bio: dataCreateOrUpdate.bio,
        birthday: dataCreateOrUpdate.birthday,
        // status: dataCreateOrUpdate.status,
        certificate: dataCreateOrUpdate.certificate.name,
        date: dataCreateOrUpdate.certificate?.date,
        avatar: dataCreateOrUpdate.avatar,
      }
    }

    // console.log([...data]);
    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateAuthor)
    dispatch(setErrorCreateOrUpdateAuthor(validate.dataError))
    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateAuthor(data))
      } else {
        dispatch(handleUpdateAuthor(data, author._id))
      }
    }
  }

  const [avatarFileList, setAvatarFileList] = useState([])

  const handleAvatarUpload = (info) => {
    let fileList = [...info.fileList]
    fileList = fileList.slice(-1) // Giới hạn chỉ chọn một tệp tin
    setAvatarFileList(fileList)

    // Xử lý khi tệp tin đã được chọn
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url // Lưu trữ URL của tệp tin tải lên
      }
      return file
    })

    // Chuyển đổi tệp tin thành dạng Blob hoặc File và lưu vào state
    const avatarFile = fileList[0] // Lấy tệp tin đầu tiên nếu có
    if (avatarFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: avatarFile.type })
        avatarFile.originFileObj = new File([blob], avatarFile.name, { type: avatarFile.type })
        setAvatarFileList([avatarFile]) // Cập nhật avatarFileList với tệp tin đã được chuyển đổi
      }
      reader.readAsArrayBuffer(avatarFile.originFileObj)
    }
  }

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateAuthor}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateAuthor(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Họ và tên *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập họ và tên..."}
            onChange={(e) => handleChangeInput(e, "name")}
            onBlur={() => validateBlur("name")}
            value={dataCreateOrUpdate.name}
            error={errorCreateOrUpdateAuthor.name}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập email..."}
            onChange={(e) => handleChangeInput(e, "email")}
            onBlur={() => validateBlur("email")}
            value={dataCreateOrUpdate.email}
            error={errorCreateOrUpdateAuthor.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Tiểu sử</div>
          <CustomCKEditor
            data={dataCreateOrUpdate.bio || ''}
            onChange={handleCKEditorChange}
            // value={dataCreateOrUpdate.bio}
            error={errorCreateOrUpdateAuthor.bio}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Ngày sinh *</div>
          <DatePickerMSQA
            placeholder={"Chọn ngày sinh..."}
            onChange={(e) => handleDateChange(e, "birthday")}
            // onBlur={() => validateBlur("birthday")}
            value={dataCreateOrUpdate.birthday ? dayjs.unix(dataCreateOrUpdate.birthday) : undefined}
            error={errorCreateOrUpdateAuthor.birthday}
          />
        </div>

        {/* <div className={styles.inputWrapper}>
          <div className={styles.label}>Status *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter status..."}
            onChange={(e) => handleChangeInput(e, "status")}
            onBlur={() => validateBlur("status")}
            value={dataCreateOrUpdate.status}
            error={errorCreateOrUpdateAuthor.status}
          />
        </div> */}

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Chứng chỉ *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập chứng chỉ..."}
            onChange={(e) => handleChangeInput(e, "certificate")}
            onBlur={() => validateBlur("certificate")}
            value={dataCreateOrUpdate.certificate}
            error={errorCreateOrUpdateAuthor.certificate}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Ngày cấp *</div>
          <DatePickerMSQA
            placeholder={"Chọn ngày cấp..."}
            onChange={(e) => handleDateChange(e, "date")}
            onBlur={() => validateBlur("date")}
            value={dataCreateOrUpdate.date ? dayjs.unix(dataCreateOrUpdate.date) : undefined}
            error={errorCreateOrUpdateAuthor.date}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Ảnh đại diện</div>
          <Upload
            beforeUpload={() => false}
            onChange={handleAvatarUpload}
            fileList={avatarFileList}
          // error={errorCreateOrUpdateAuthor.avatar}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {/* {errorCreateOrUpdateAuthor.avatar && <span className={styles.error}>{errorCreateOrUpdateAuthor.avatar}</span>} */}
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={"Lưu"}
            loading={isLoadingBtnCreateOrUpdateAuthor}
            onClick={() => handleConfirmCreateOrUpdateAuthor()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </div>
    </ModalGeneral>
  )
}

export default CreateOrUpdate
