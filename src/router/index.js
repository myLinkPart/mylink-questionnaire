import Vue from "vue";
import VueRouter from "vue-router";
import Satisfaction from "@views/satisfaction/index.vue";
import Preference from "@views/preference.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "satisfaction",
        component: Satisfaction,
        meta: {
            titleZh: "MyLink 问卷调查",
            titleEn: "MyLink Welcome Offers",
            titleTw: "MyLink 迎新禮遇",
        },
    },
    {
        path: "/preference",
        name: "preference",
        component: Preference,
        meta: {
            titleZh: "MyLink 迎新礼遇",
            titleEn: "MyLink Welcome Offers",
            titleTw: "MyLink 迎新禮遇",
        },
    },
];


const router = new VueRouter({
    routes,
});

export default router;
