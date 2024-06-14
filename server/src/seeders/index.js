import {db} from "../configs";
import roleSeeder from "./role.seeder";
import adminSeeder from "./admin.seeder";

async function seed() {
    try {
        await db.connect();
        console.log("Initializing data...");

        await roleSeeder();
        await adminSeeder();

        console.log("Data has been initialized!");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seed();
