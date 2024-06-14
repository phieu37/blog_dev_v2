import {createModel} from "./base";

export const Role = createModel("Role", "roles", {
    name: {
        type: String,
        required: true,
    }
});
