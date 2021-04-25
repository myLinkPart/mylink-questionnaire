<template>
    <div class="home">
        <div class="center_box">
            <div class="banner">
                <img :src="$t('home.头部banner')" alt="" />
            </div>
            <div class="login">
                <div class="top">{{ $t("home.登陆提示") }}</div>
                <div class="box_">
                    <Field
                        type="tel"
                        label="+852"
                        v-model="phone"
                        :placeholder="$t('home.输入')"
                        maxlength="8"
                    />
                    <div class="btn">
                        <Button
                            :text="$t('home.领取')"
                            round
                            :disabled="isDisabled"
                            @click="toReceive"
                        ></Button>
                    </div>
                    <div class="agree">
                        <Checkbox
                            checked-color="#7552FC"
                            v-model="agree"
                            shape="square"
                        >
                            {{ $t("home.同意") }}
                            <strong>{{ languageType !== 'en' ? $t("home.活动规则") : $t("home.活动规则text")}}</strong>
                        </Checkbox>
                    </div>
                </div>
            </div>
            <div class="rule">
                <div class="box_">
                    <div class="title">{{ $t("home.活动规则") }}</div>
                    <div class="content" v-html="$t('home.规则内容')"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Button, Checkbox, Dialog, Toast } from "vant";
import { callMylinkApp, shareFun } from "@common/handle.js";

export default {
    name: "Home",
    data() {
        return {
            phone: "",
            agree: false,
        };
    },
    computed: {
        isDisabled() {
            return !(this.phone && this.agree);
        },
        languageType() {
            return sessionStorage.getItem("lang");
        },
    },
    components: {
        Field,
        Button,
        Checkbox,
        [Dialog.Component.name]: Dialog.Component,
    },
    created() {},
    mounted() {
        this.wxShare();
    },
    methods: {
        // 免费领取
        toReceive() {
            // 首页判断电话号码是否正确
            if (this.phone.length < 8) {
                Toast(`${this.$t("home.正确号码")}`);
                return;
            }
            // // 香港号码以4(异网)|5|6|8|9开头
            // if(!(/^(4|5|6|8|9)\d{7}$/.test(this.phone))) {
            //     Toast(`${this.$t('home.正确号码')}`);
            //     return;
            // }
            this.$post("/ticket_racing/pullNewuser/none/takePrize", {
                phone: this.phone,
            }).then((res) => {
                if (+res.header.resultCode === 0) {
                    // 当优惠卷的数据为空时，表示不是新用户
                    if (res.body.data && res.body.data.length > 0) {
                        this.$router.push({
                            path: "/couponList",
                            query: { phone: this.phone },
                        });
                    } else {
                        Dialog.confirm({
                            message: `${this.$t("home.仅限新用户")}\n${this.$t("home.去Mylink")}`,
                            confirmButtonText: this.$t("home.好的"),
                            cancelButtonText: this.$t("home.取消"),
                        })
                            .then(() => {
                                callMylinkApp("http://cdn.via.cool/web/activity/mylink/inviteNew/index.html#/");
                            })
                            .catch(() => {});
                    }
                }
            });
        },
        // 分享按钮的配置
        wxShare() {
            let path = process.env.NODE_ENV === "production" ? "/activity/via/card" : "/web/activity/mylink/inviteNew";
            const host = window.location.protocol + "//" +  window.location.hostname + (window.location.port ? ":" + window.location.port : "");
            let shareDataWx = {
                type: "link",
                title: this.$t("share.title"),
                desc: `${this.$t("share.content")}`,
                link: `${host}${path}/index.html#/?lang=${window.sessionStorage.getItem("lang")}`,
                imgUrl: "http://cdn.via.cool/jtp-host/resource/activity/1622/2020-09-25/88adf6ddc877423ba931d110c9807a25.jpeg",
            };
            this.$wxsdk.share(shareDataWx);
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

<style lang="scss" scoped>
.home {
    background: #c2aafa;

    .banner {
        height: 750px * $scale;
    }

    .login {
        position: relative;
        width: 85%;
        margin: 0 auto;
        background: #ffffff;
        box-shadow: 1px 4px 8px 0px rgba(63, 6, 169, 0.3);
        border-radius: 15px * $scale;
        margin-top: -79px * $scale;
        z-index: 1;
        padding-top: 97px * $scale;
        .top {
            width: fit-content;
            position: absolute;
            top: -10px * $scale;
            left: 50%;
            transform: translateX(-50%);
            -ms-transform: translateX(-50%); /* IE 9 */
            -moz-transform: translateX(-50%); /* Firefox */
            -webkit-transform: translateX(-50%); /* Safari 和 Chrome */
            -o-transform: translateX(-50%); /* Opera */
            padding: 0 45px * $scale;
            font-size: 0.12rem;
            font-weight: 500;
            text-align: center;
            color: #ffffff;
            line-height: 68px * $scale;
            background: url("../../static/img/login_top.png") no-repeat;
            background-size: 100% 100%;
            z-index: 1;
        }
        .van-field {
            background: #f2efff;
            border-radius: 15px * $scale;
        }
        .btn {
            margin: 36px * $scale 0;
        }
        .agree {
            padding-bottom: 40px * $scale;
            .van-checkbox {
                align-items: flex-end;
            }
        }
    }
    .rule {
        width: 85%;
        margin: 0 auto;
        background: #865cef;
        box-shadow: 1px 4px 8px 0px rgba(63, 6, 169, 0.3);
        border-radius: 15px * $scale;
        margin-top: 32px * $scale;
        padding-bottom: 53px * $scale;
        .title {
            font-size: 0.15rem;
            padding: 40px * $scale 0;
            margin: 0;
            background: url("../../static/img/line.png") no-repeat center;
            background-size: 100%;
            text-align: center;
            color: #ffffff;
        }
    }
}
</style>
<style lang="scss">
.van-field .van-field__label {
    width: auto;
}
.van-checkbox .van-checkbox__label {
    font-size: 0.1rem;
    line-height: 24px * $scale;
    margin-left: 3px;
}
.van-checkbox .van-checkbox__icon {
    height: 24px * $scale;
}
.van-checkbox .van-checkbox__icon .van-icon {
    width: 26px * $scale;
    height: 24px * $scale;
    line-height: 24px * $scale;
    font-size: 0.11rem;
}
.content {
    font-size: 0.11rem;
    color: #fff;
    line-height: 36px * $scale;
}
</style>