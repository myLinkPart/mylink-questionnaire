import Vue from 'vue';
import wx from 'weixin-js-sdk';

const jsApiList = [
    'updateAppMessageShareData',
    'updateTimelineShareData',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'onVoicePlayEnd',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'translateVoice',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'
];

export const wxMenu = {
    share: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone'],
    copy: ['menuItem:copyUrl'],
    originPage: ['menuItem:originPage']
};

const ua = navigator.userAgent;
const isProd = process.env.NODE_ENV === "production";
let isInWx = false;
if (/micromessenger/i.test(ua)) {
    isInWx = true;
}

class WxSdk {

    constructor() {
        this.configSign = {
            appId: '',
            timestamp: '',
            nonceStr: '',
            signature: ''
        };
        this.actionList = [];
        this.runningAction = false;
    }
    /**
     * 统一获取链接，可自增加参数
     * @param query
     */
    getActivityUrl(query) {
        let link = window.location.href.split('#')[0].split('?')[0];
        let _query = {...query};
        if (this.urlQuery.debug) {
            _query.debug = true;
        }
        if (Object.keys(_query).length > 0) {
            link += '?' + Object.entries(_query).map(([k, v])=> `${k}=${v}`).join('&');
        }
        return link;
    }

    getWxConfig() {
        this.hideMenuItems([
            ...wxMenu.share,
            ...wxMenu.copy,
            ...wxMenu.originPage
        ]);
        if (!isProd || !isInWx) {
            console.warn('非微信浏览器，且非production，不能调用该接口: getWxConfig');
            return Promise.resolve('微信签名配置失败');
        }
        const url = `http://comapi.codebear.cn/wx/sdk-config?entrance=qz&url=${encodeURIComponent(window.location.href.split('#')[0])}`;
        return  Vue.prototype.$get(url)
                .then(result=> {
                    console.log(result);
                    result = result.payload;
                    if (!result.appId || !result.timestamp || !result.nonceStr || !result.signature) {
                        console.warn('微信签名参数错误');
                        return Promise.resolve('微信签名配置失败');
                    }
                    this.configSign = {
                        appId: result.appId,
                        timestamp: result.timestamp,
                        nonceStr: result.nonceStr,
                        signature: result.signature
                    };
                    wx.config({
                        debug: false,
                        ...this.configSign,
                        jsApiList
                    });
                    wx.error(err=> {
                        console.warn('微信配置失败', err);
                    });
                    return Promise.resolve('微信签名参数获取完成');
                }).catch(err=> {
                    console.error('微信签名参数获取失败', JSON.stringify(err));
                    return Promise.reject(err);
                });
    }

    hideMenuItems(list) {
        if (!isProd || !isInWx) {
            console.warn('非微信浏览器，且非production，不能调用该接口: hideMenuItems');
            return;
        }
        this.addAction(()=> {
            console.log('隐藏菜单', list);
            wx.hideMenuItems({
                menuList: list
            });
        });
    }

    showMenuItems(list) {
        if (!isProd || !isInWx) {
            console.warn('非微信浏览器，且非production，不能调用该接口: showMenuItems');
            return;
        }
        this.addAction(()=> {
            console.log('显示菜单', list);
            wx.showMenuItems({
                menuList: list
            });
        });
    }

    share(info) {
        if (!isProd || !isInWx) {
            console.warn('非微信浏览器，且非production，不能调用该接口: share');
            return;
        }
        const _info = {
            link: this.getActivityUrl(info?.query || {}),
            type: 'link',
            dataUrl: '',
            title: '默认分享标题',
            desc: '默认分享描述信息',
            imgUrl: '',
            ...info
        };
        delete _info.query;
        this.addAction(()=> {
            console.log(_info);
            // 分享好友
            wx.updateAppMessageShareData({
                title: _info.title,
                desc: _info.desc,
                link: _info.link,
                imgUrl: _info.imgUrl,
                success: this.shareCb(_info.cb || (()=> {})),
                cancel: this.shareCb(_info.cb || (()=> {}))
            });
            // 分享朋友圈
            wx.updateAppMessageShareData({
                title: _info.title,
                link: _info.link,
                imgUrl: _info.imgUrl,
                success: this.shareCb(_info.cb || (()=> {})),
                cancel: this.shareCb(_info.cb || (()=> {}))
            });
        });
    }

    shareCb(cb) {
        return () => {
            typeof cb === 'function' && cb();
        };
    }

    addAction(fn) {
        this.actionList.push(fn);
        this.runAction();
    }

    runAction() {
        if (this.runningAction) {
            return;
        }
        this.runningAction = true;
        if (this.actionList.length === 0) {
            this.runningAction = false;
            return;
        }
        const action = this.actionList.shift();
        if (typeof action === 'function') {
            wx.ready(()=> {
                action();
                setTimeout(() => {
                    this.runningAction = false;
                    this.runAction();
                }, 0);
            });
        } else {
            this.runAction();
        }
    }
}

Vue.$wxsdk = Vue.prototype.$wxsdk = new WxSdk();