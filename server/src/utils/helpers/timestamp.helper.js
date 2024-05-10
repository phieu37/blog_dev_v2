import moment from "moment";

// Hàm chuyển đổi ngày thành timestamp
export function convertToTimestamp(value, helpers) {
    const timestamp = moment(value, "DD/MM/YYYY", true).unix();
    if (isNaN(timestamp)) {
        return helpers.error("any.format");
    }
    return timestamp;
}
