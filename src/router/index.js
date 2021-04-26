import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@views/home.vue";
import CouponList from "@views/couponList.vue";
import Popup from "@views/popup.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            titleZh: "MyLink 问卷调查",
            titleEn: "MyLink Welcome Offers",
            titleTw: "MyLink 迎新禮遇",
        },
    },
    {
        path: "/couponList",
        name: "couponList",
        component: CouponList,
        meta: {
            titleZh: "MyLink 迎新礼遇",
            titleEn: "MyLink Welcome Offers",
            titleTw: "MyLink 迎新禮遇",
        },
    },
    {
        path: "/popup",
        name: "popup",
        component: Popup,
        meta: {
            titleZh: "MyLink 迎新礼遇",
            titleEn: "MyLink Welcome Offers",
            titleTw: "MyLink 迎新禮遇",
        },
    }
];


const router = new VueRouter({
    routes,
});

export default router;
