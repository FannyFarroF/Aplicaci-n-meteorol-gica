import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "material-icons/iconfont/material-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

createApp(App)
    .use(store)
    .use(router)
    .use("axios", axios)
    .mount("#app");