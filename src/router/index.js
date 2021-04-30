import Vue from "vue";
import VueRouter from "vue-router";
import Satisfaction from "@views/satisfaction/index.vue";
import Preference from "@views/preference/index.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "satisfaction",
        component: Satisfaction,
        meta: {
            titleZh: "Link你的心声",
            titleEn: "Listen to Your Voice",
            titleTw: "Link你的心聲",
        },
    },
    {
        path: "/preference",
        name: "preference",
        component: Preference,
        meta: {
            titleZh: "用量查询你话事",
            titleEn: "Style Usage Enquiry Card",
            titleTw: "用量查詢你話事",
        },
    },
];


const router = new VueRouter({
    routes,
});

export default router;
