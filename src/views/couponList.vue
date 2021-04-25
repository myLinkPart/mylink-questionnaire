<template>
    <div class="couponList">
        <div class="center_box">
            <div class="banner">
            <img :src="$t('coupon.头部banner')" alt="" />
        </div>
        <div class="list_info">
            <div class="top">
                <strong>{{ $t('coupon.恭喜') }}</strong>
                <p>{{ $t('coupon.获得') }}</p>
            </div>
            <div class="box_">
                <div class="list">
                    <div
                        class="coupon_box"
                        v-for="(item, index) in couponList"
                        :key="index"
                    >
                        <Coupon :couponItem="item"></Coupon>
                    </div>
                    <div
                        class="view_more"
                        @click="addMore"
                        v-show="couponAllList.length > 4 &&couponList.length !== couponAllList.length"
                    >
                        {{ $t("coupon.查看更多") }}
                        <Icon name="arrow-down"></Icon>
                    </div>
                </div>
                <div class="btn">
                    <Button
                        :text="$t('coupon.使用')"
                        round
                        @click="toAPP"
                    ></Button>
                </div>
            </div>
        </div>
        <div class="bottom">
            <p>
                {{ $t("coupon.底部") }}：+852 {{ phone }}
                <span @click="jumpHome">{{ $t("coupon.修改") }}</span>
            </p>
        </div>
        </div>
    </div>
</template>

<script>
import { Button, Icon } from "vant";
import Coupon from "@c/coupon.vue";
import { getParam, callMylinkApp, shareFun } from "@common/handle.js";

export default {
    name: "CouponList",
    data() {
        return {
            couponList: [],
            couponAllList: [],
            languageObj: {
                'sc': 'zh-CN',
                'tc': 'zh-TW',
                'en': 'en-US'
            }
        };
    },
    computed: {
        phone() {
            return getParam("phone");
        },
    },
    components: {
        Button,
        Icon,
        Coupon,
    },
    created() {
        this.$post("/ticket_racing/pullNewuser/none/takePrize", {
            phone: this.phone,
        }, {
            'Accept-Language': this.languageObj[this.languageType()] || 'zh-CN'
        }).then((res) => {
            if (+res.header.resultCode === 0) {
                if (res.body.data && res.body.data.length > 0) {
                    this.couponAllList = res.body.data;
                    this.couponList = this.couponAllList.filter((item, index) => index < 4);
                }
            }
        });
    },
    mounted() {
        this.share();
    },
    methods: {
        languageType() {
            return sessionStorage.getItem("lang");
        },
        // 查看更多
        addMore() {
            this.couponList = this.couponAllList;
        },
        // 修改电话号码，回到登陆页
        jumpHome() {
            this.$router.push({ path: "/" });
        },
        toAPP() {
            callMylinkApp("cmcchkhsh://ticketList");
        },
        // 分享按钮的配置
        share() {
            let path = process.env.NODE_ENV === "production" ? '/activity/via/card' : '/web/activity/mylink/inviteNew';
            const host = window.location.protocol + "//" +  window.location.hostname + (window.location.port ? ":" + window.location.port : "");
            let shareData = {
                type: 1,
                title: this.$t("share.title"),
                content: `${this.$t("share.content")}`,
                url: `${host}${path}/index.html#/?lang=${window.sessionStorage.getItem("lang")}`,
            };
            shareFun(shareData);
        }
    },
};
</script>

<style lang="scss">
.couponList {
    background: #c2aafa;
    .banner {
        height: 430px * $scale;
    }
    .box_ {
        width: 90%;
    }
    .list_info {
        position: relative;
        width: 90%;
        margin: 0 auto;
        margin-top: -139px * $scale;
        background: #855cef;
        box-shadow: 1px 4px 8px 0px rgba(63, 6, 169, 0.3);
        border-radius: 15px * $scale;
        padding-bottom: 38px * $scale;
        overflow: hidden;

        .top {
            font-size: 0.15rem;
            text-align: center;
            color: #ffffff;
            padding: 34px * $scale 0;
            border-radius: 0 0 50% 50%;
            background: linear-gradient(#7653fc, #7552fb, #5c37e4);
            strong{
                line-height: 48px * $scale;
            }
        }
        .list {
            margin-top: 34px * $scale;
        }
        .coupon_box {
            width: 100%;
        }
        .view_more {
            color: #fff;
            font-size: 0.13rem;
            text-align: center;
            .van-icon {
                width: 32px * $scale;
                line-height: 32px * $scale;
                background: #7849f0;
                border-radius: 50%;
                font-size: 0.1rem;
            }
        }
        .btn {
            margin-top: 50px * $scale;
        }
    }
    .bottom {
        font-size: 0.12rem;
        color: #fff;
        text-align: center;
        margin-top: 44px * $scale;
        span {
            background: #865cef;
            border-radius: 22px * $scale;
            padding: 8px * $scale 20px * $scale;
            margin-left: 12px * $scale;
        }
    }
}
</style>
