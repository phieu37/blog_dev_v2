import {useEffect, useState} from "react";
import _ from "lodash";
import {handleCheckValidateConfirm} from "../../../../../../../utils/helper.js";
import {setErrorInformation} from "../../../../../../../states/modules/profile";
import { updateInformation} from "../../../../../../../api/profile/index.js";
import {useDispatch, useSelector} from "react-redux";
import auth from "../../../../../../../states/modules/auth/index.js";

export default function Handle(props) {
  const {handleResetError} = props;
  const [dataInformation, setDataInformation] = useState({
    name: '',
    phone: '',
  });

  const errorInformation = useSelector(state => state.profile.errorInformation);
  const isLoadingBtnInformation = useSelector(state => state.profile.isLoadingBtnInformation);
  const authUser = useSelector(state => state.auth.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      setDataInformation({
        name: authUser.name,
        phone: authUser.phone,
      })
    }
  }, [authUser])

  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(dataInformation);
    data[type] = value
    setDataInformation(data)
  }

  const handleKeyDown = () => {
    handleResetError()
  }

  const handleConfirmUpdateInformation = () => {
    let validate = handleCheckValidateConfirm(dataInformation, errorInformation, 'profile');
    if (!validate.isError) {
      dispatch(updateInformation(dataInformation))
    } else {
      dispatch(setErrorInformation(validate.dataError))
    }
  }

  return {
    dataInformation, errorInformation, isLoadingBtnInformation,
    handleChangeInput, handleConfirmUpdateInformation, handleKeyDown
  }
}
