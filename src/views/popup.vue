<template>
    <div class="popup" ref="popupWidth">
        <div class="top_content" :class="{ paddingTop_: status === 'new' }">
            <h1 class="title" v-if="status === 'new'">
                {{ $t("pop.获得礼包") }}
            </h1>
            <p class="see" @click="toList" v-if="status === 'new'">
                {{ $t("pop.查看全部") }}
            </p>
            <div class="top_banner" v-if="status === 'register'">
                <img :src="require('../../static/img/pop_top.png')" alt="" />
                <div class="tip">
                    <h1>{{ $t("pop.tip1") }}</h1>
                    <h1>{{ $t("pop.tip2") }}</h1>
                </div>
            </div>
        </div>
        <div class="pop_content">
            <div
                class="coupon_content"
                :class="{ register_top: status === 'register' }"
                v-if="status === 'new'"
            >
                <div
                    class="coupon_box"
                    v-for="(item, index) in couponList"
                    :key="index"
                >
                    <Coupon :couponItem="item" :status="status"></Coupon>
                </div>
            </div>
        </div>
        <div class="btn" v-if="status === 'register'">
            <Button :text="$t('pop.注册')" round @click="toRegister"></Button>
        </div>
    </div>
</template>

<script>
import { Button } from "vant";
import Coupon from "@c/coupon.vue";
import { getParam } from "@common/handle.js";

export default {
    name: "popup",
    components: {
        Coupon,
        Button,
    },
    data() {
        return {
            couponList: [],
            languageObj: {
                'sc': 'zh-CN',
                'tc': 'zh-TW',
                'en': 'en-US'
            }
        };
    },
    computed: {
        status() {
            return getParam("token") ? "new" : "register";
        },
    },
    created() {
        console.log("地址", window.location.href);
        if (!getParam("token")) {
            return;
        }
        this.$post("ticket_racing/pullNewuser/offline_register", {}, { 
            Authorization: `Bearer ${getParam("token")}`,
            'Accept-Language': this.languageObj[this.languageType()] || 'zh-CN'
        }).then((res) => {
            if (+res.header.resultCode === 0) {
                this.couponList = res.body.data;
            }
        });
    },
    mounted() {
        const width = this.$refs.popupWidth.clientWidth;
        this.$refs.popupWidth.style.height = `${width * 1.25}px`;
        console.log("弹窗的宽度", width);
        console.log('弹窗的高度', this.$refs.popupWidth.style.height, this.$refs.popupWidth.clientHeight);
    },
    methods: {
        toList() {
            window.location.href = "cmcchkhsh://ticketList";
        },
        toRegister() {
            window.location.href = "openhkhshlogin://";
        },
        languageType() {
            return sessionStorage.getItem("lang");
        },
    },
};
</script>

<style lang="scss" scoped>
.popup {
    background: #7653fc;
    width: 100%;
    position: relative;
    .van-popup {
        width: 90%;
        background-color: transparent;
    }
    .paddingTop_ {
        padding-top: 80px * $scale;
        padding-bottom: 60px * $scale;
    }
    .pop_content {
        padding-bottom: 24px * $scale;
    }
    .title {
        color: #fff;
        font-size: 0.18rem;
        text-align: center;
        line-height: 60px * $scale;
    }
    p.see {
        color: #fff;
        font-size: 0.12rem;
        text-align: center;
        line-height: 50px * $scale;
        opacity: 0.7;
    }
    .top_banner {
        position: relative;
        color: #fff;
        font-size: 0.2rem;
        text-align: center;
        .tip {
            position: absolute;
            right: 111px * $scale;
            top: 86px * $scale;
            line-height: 60px * $scale;
        }
    }
    .coupon_content {
        width: 95%;
        margin: 0 auto;
    }
    .register_top {
        margin-top: -80px * $scale;
        position: relative;
        z-index: 1;
    }
    .coupon {
        height: 172px * $scale;
    }
    .close {
        width: 64px * $scale;
        height: 64px * $scale;
        font-weight: bold;
        margin: 0 auto;
        text-align: center;
        color: #7652fc;
        font-size: 0.2rem;
        background: #fff;
        border-radius: 50%;
        margin-top: 74px * $scale;
        display: flex;
        align-items: center;
        justify-content: center;
        .van-icon::before {
            font-weight: bold;
        }
    }
    .btn {
        width: 50%;
        position: absolute;
        left: 50%;
        bottom: 24px * $scale;
        transform: translateX(-50%);
        -ms-transform: translateX(-50%); /* IE 9 */
        -moz-transform: translateX(-50%); /* Firefox */
        -webkit-transform: translateX(-50%); /* Safari 和 Chrome */
        -o-transform: translateX(-50%); /* Opera */
    }
}
</style>