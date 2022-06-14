import Vue from "vue";
import VueRouter from "vue-router"


import CommonRouter from "./commonRouter"


Vue.use(VueRouter)


var router = new VueRouter({
    routes: [{ //默认
            path: '/',
            redirect: 'InjuredPersonsInfo'
        },
        ...CommonRouter
    ]
})


export default router;