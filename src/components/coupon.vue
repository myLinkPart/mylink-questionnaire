<template>
    <div class="coupon">
        <div class="img">
            <img :src="couponItem.banner" />
        </div>
        <div class="info">
            <div>
                <h1 class="name">{{ couponItem.name }}</h1>
                <p class="description" v-html="couponItem.description">
                </p>
            </div>
        </div>
        <div class="price">
            <div>
                <p>
                    <span v-if="languageType === 'en' && couponItem.giftUnit === 'yuan'">$</span>{{ couponItem.giftPrice }}<br v-if="!(couponItem.giftPrice.length < 4)" />
                    <span class="unit" v-if="!(languageType === 'en' && couponItem.giftUnit === 'yuan')">{{ couponItem.giftUnit }}</span>
                </p>
                <div class="use" v-if="status === 'new'" @click="toUse">
                    {{ $t("pop.去使用") }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "coupon",
    props: {
        couponItem: {
            type: Object,
            default: function () {
                return {
                    name: "",
                    description: "",
                    endTime: "",
                    giftPrice: "",
                    giftUnit: "",
                    banner: "",
                    redirectUrl: ""
                };
            },
        },
        // 免费获取后的列表形式‘list’/ 未登录状态的‘register’/ 新用户已登陆 ‘new’
        status: {
            type: String,
            default: "list",
        },
    },
    computed: {
        languageType() {
            return sessionStorage.getItem("lang");
        },
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        // 去使用
        toUse() {
            window.location.href = this.couponItem.redirectUrl;
        }
    },
};
</script>

<style lang="scss">
.coupon {
    height: 182px * $scale;
    background: url("../../static/img/coupon.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    margin-bottom: 20px * $scale;
    font-size: 0.1rem;
    .img {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        img {
            width: 118px * $scale;
            height: 118px * $scale;
        }
    }
    .info {
        flex: 2;
        color: #717171;
        display: flex;
        align-items: center;
        padding-right: 12px * $scale;
        .name {
            font-size: 0.14rem;
            margin-bottom: 21px * $scale;
            color: #343434;
        }
        .remain {
            color: rgba(250, 88, 138, 1);
        }
    }
    .description {
        white-space: pre-wrap;
    }
    .price {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        font-size: 0.23rem;
        color: #7652fb;
        text-align: center;
        padding-right: 12px * $scale;
        p {
            line-height: 32px * $scale;
        }
        .unit {
            font-size: 0.13rem;
        }
        .use {
            font-size: 0.11rem;
            font-weight: bold;
            background: #f2efff;
            border-radius: 15px * $scale;
            padding: 0 12px * $scale;
            margin-top: 13px * $scale;
        }
    }
}
</style>