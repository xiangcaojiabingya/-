export default [

    {
        //养老缴费历史查询
        path: "/PensionPayment",
        name: "PensionPayment",
        component: () => import("@/views/PensionPayment"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    {
        //工伤人员基本信息查询
        path: "/InjuredPersonsInfo",
        name: "InjuredPersonsInfo",
        component: () => import("@/views/InjuredPersonsInfo.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    {
        //工伤缴费历史查询
        path: "/IndustrialInjuryPayment",
        name: "IndustrialInjuryPayment",
        component: () => import("@/views/IndustrialInjuryPayment"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    {
        //个人参保信息查询
        path: "/IndividualInsurance",
        name: "IndividualInsurance",
        component: () => import("@/views/IndividualInsurance.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    }
]