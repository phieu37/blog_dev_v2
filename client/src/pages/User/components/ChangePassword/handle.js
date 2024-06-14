import _ from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetPasswordUser } from "../../../../api/user"

export default function Handle() {
  const dispatch = useDispatch()
  const idUser = useSelector(state => state.user.idUser)
  console.log('Current User ID:', idUser);
  const visibleModalResetPassword = useSelector(state => state.user.visibleModalResetPassword)
  const [dataChangePassword, setDataChangePassword] = useState({
    password: '',
    confirm_password: '',
  })

  useEffect(() => {
    setDataChangePassword({
      password: '',
      confirmPassword: '',
    })
  }, [visibleModalResetPassword]);

  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(dataChangePassword)
    data[type] = value;
    setDataChangePassword(data)
  }

  const handleConfirmChange = () => {
    console.log(`Resetting password for user ID: ${idUser}`);
    dispatch(resetPasswordUser(idUser, dataChangePassword))
  }

  return {
    dataChangePassword,
    handleChangeInput,
    handleConfirmChange
  }
}
