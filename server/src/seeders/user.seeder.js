import {generatePassword} from "@/utils/helpers";
import {User} from "@/app/models";
// import { DEFAULT_AVATAR_PATH } from "@/configs";

export default async function userSeeder() {
    let EMAIL = process.env.SUPER_ADMIN_EMAIL;
    let PASSWORD = process.env.SUPER_ADMIN_PASSWORD;
    if (!EMAIL || !PASSWORD) {
        EMAIL = "admin@zent.vn";
        PASSWORD = "Zent@123.edu.vn";
        console.warn("---------------------------------------------------------------");
        console.warn('"Super Admin" is not configured. Using the default account:');
        console.warn(`Email: ${EMAIL}`);
        console.warn(`Password: ${PASSWORD}`);
        console.warn("---------------------------------------------------------------");
    }
    const superAdmin = {
        name: "Super Admin",
        email: EMAIL,
        // avatar: DEFAULT_AVATAR_PATH,
        password: generatePassword(PASSWORD),
    };

    await User.findOneAndUpdate(
        {email: superAdmin.email},
        {$set: superAdmin},
        {upsert: true}
    );
}
