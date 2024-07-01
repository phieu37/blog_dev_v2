import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import InputMASQ from "../../../../components/UI/Input";
import ButtonMASQ from "../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCreateOrUpdateCategory,
  setVisibleModalCreateOrUpdateCategory
} from "../../../../states/modules/category";
import { handleCreateCategory, handleUpdateCategory } from "../../../../api/category";

CreateOrUpdate.defaultProps = {
  isModalOpen: false,
  isLoadingTable: false,
  textBtnConfirm: 'OK',
  configModal: {
    title: 'Title',
    type: 'CREATE',
  }
}

function CreateOrUpdate(props) {
  let { category, configModal } = props
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    name: '',
    description: '',
  })
  const visibleModalCreateOrUpdateCategory = useSelector(state => state.category.visibleModalCreateOrUpdateCategory);
  const isLoadingBtnCreateOrUpdateCategory = useSelector(state => state.category.isLoadingBtnCreateOrUpdateCategory);
  const errorCreateOrUpdateCategory = useSelector(state => state.category.errorCreateOrUpdateCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateCategory])

  useEffect(() => {
    dispatch(setErrorCreateOrUpdateCategory({
      name: '',
      description: '',
    }));
  }, [dataCreateOrUpdate, dispatch])

  // Cập nhật state với các thông tin mới
  useEffect(() => {
    setDataCreateOrUpdate({
      name: category.name,
      description: category.description,
    });
  }, [category]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      name: '',
      description: '',
    })
  }

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataCreateOrUpdate);
    data[type] = value;
    setDataCreateOrUpdate(data);
  }

  const validateBlur = (type) => {
    let validate = isValidate(dataCreateOrUpdate, type, errorCreateOrUpdateCategory);
    dispatch(setErrorCreateOrUpdateCategory(validate.error));
    return validate.isError;
  }

  const handleConfirmCreateOrUpdateCategory = () => {
    let dataValidate = dataCreateOrUpdate;
    let data = new FormData();
    data.append(`name`, dataCreateOrUpdate.name);
    data.append(`description`, dataCreateOrUpdate.description);

    if (configModal.type !== "CREATE") {
      dataValidate = {
        name: dataCreateOrUpdate.name,
        description: dataCreateOrUpdate.description,
      }
    }

    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateCategory);
    dispatch(setErrorCreateOrUpdateCategory(validate.dataError));
    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateCategory(dataValidate))
      } else {
        dispatch(handleUpdateCategory(dataValidate, category._id))
      }
    }
  }

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateCategory}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateCategory(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Tên danh mục *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập tên danh mục..."}
            onChange={(e) => handleChangeInput(e, 'name')}
            onBlur={() => validateBlur('name')}
            value={dataCreateOrUpdate.name}
            error={errorCreateOrUpdateCategory.name}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Mô tả *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập mô tả..."}
            onChange={(e) => handleChangeInput(e, 'description')}
            onBlur={() => validateBlur('description')}
            value={dataCreateOrUpdate.description}
            error={errorCreateOrUpdateCategory.description}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Lưu'}
            loading={isLoadingBtnCreateOrUpdateCategory}
            onClick={() => handleConfirmCreateOrUpdateCategory()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </div>
      </div>
    </ModalGeneral>
  );
}

export default CreateOrUpdate;
