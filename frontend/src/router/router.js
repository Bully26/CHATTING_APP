import { createRouter,createWebHashHistory } from "vue-router";
import user from "../components/center.vue"
import login from "../components/login.vue"

const server=createRouter(
    {
        history:createWebHashHistory(),
        routes:[
            {path:"/",    component:login},
            {path:"/user",component:user}
        ]
    }
)

export default server;