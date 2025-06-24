//set up a redux store, manages authentication state

import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth";
const store = configureStore({
    reducer: {
        auth: authReducer,
    }, //tells initial and final state of user login status
});

export default store;