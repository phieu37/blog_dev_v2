import _ from "lodash";
import {isValidEmail, isValidPassword, isValidPhone} from "../helper.js";

export const isValidateAccount = (data, type, errors, isRequiredField = true) => {
    let error = false
    let dataError = _.cloneDeep(errors);

    switch (type) {
        case 'phone':
            if (data.phone?.length > 0 && !isValidPhone(data.phone)) {
                dataError.phone = 'Số điện thoại không đúng định dạng!';
                error = true;
            } else {
                dataError.phone = '';
            }
            break;
        case 'name':
            if (data.name.length === 0) {
                dataError.name = 'Họ và tên không được để trống!';
                error = true;
            } else if (data.name.length > 50) {
                dataError.name = 'Độ dài không vượt quá 50 kí tự';
                error = true;
            } else {
                dataError.name = '';
            }
            break;
        case 'email':
            if (isRequiredField) {
                if (!data.email || data.email.length === 0) {
                    dataError.email = 'Email không được để trống!';
                    error = true;
                }
            }

            if (data.email) {
                if (data.email.length === 0) {
                    dataError.code = 'Email không được để trống!';
                    error = true;
                } else if (data.email.length > 0 && !isValidEmail(data.email)) {
                    dataError.email = 'Email không đúng định dạng!';
                    error = true;
                } else {
                    dataError.email = '';
                }
            }
            break;
        case 'password':
            if (data.password.length === 0) {
                dataError.password = 'Mật khẩu không được để trống!';
                error = true;
            } else if (!isValidPassword(data.password)) {
                dataError.password = "Mật khẩu phải bao gồm có ít nhất 6 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt!"
                error = true
            } else {
                dataError.password = '';
            }
            break;
        default:
            break;
    }

    return {
        isError: error,
        error: dataError,
    }
}
