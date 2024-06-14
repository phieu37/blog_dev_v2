import {Role} from "@/app/models";

export default async function () {
    const ROLE_NAME = "super_admin";
    const role = {
        name: ROLE_NAME,
    };

    await Role.findOneAndUpdate({name: role.name}, {$set: role}, {upsert: true});
}
