import {generatePassword} from "@/utils/helpers";
import {Admin, Role} from "@/app/models";
import {STATUS_ACTIVE} from "@/configs";

export default async function () {
    let EMAIL = process.env.SUPER_ADMIN_EMAIL;
    let PASSWORD = process.env.SUPER_ADMIN_PASSWORD;
    if (!EMAIL || !PASSWORD) {
        EMAIL = "admin@gmail.com";
        PASSWORD = "Phieu37163@";
        console.warn("---------------------------------------------------------------");
        console.warn('"Super Admin" is not configured. Using the default account:');
        console.warn(`Email: ${EMAIL}`);
        console.warn(`Password: ${PASSWORD}`);
        console.warn("---------------------------------------------------------------");
    }
    const role = await Role.findOne({name: "super_admin"});
    if (!role) {
        return console.warn("\"Role\" is not exist.");
    }
    const superAdmin = {
        name: "Super Admin",
        email: EMAIL,
        password: generatePassword(PASSWORD),
        role_ids: [role._id],
        status: STATUS_ACTIVE.ACTIVE,
    };

    await Admin.findOneAndUpdate(
        {email: superAdmin.email},
        {$set: superAdmin}, 
        {upsert: true}
    );
}
