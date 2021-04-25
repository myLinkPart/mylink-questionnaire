/* eslint-disable */
import CallUp from "tool-callapp";

// 获取手机系统
export const system = () => {
    const u = navigator.userAgent;

    let name;
    if (
        u.indexOf("Android") > -1 ||
        u.indexOf("Adr") > -1 ||
        u.indexOf("hshhk/android") > -1
    ) {
        name = "android";
    } else if (
        u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ||
        u.indexOf("hshhk/ios/") > -1
    ) {
        name = "ios";
    } else {
        name = "unknown";
    }

    return name;
};

// 唤起mylink app，并跳到指定页面
export const callMylinkApp = (url) => {
    // if (system() === "android") { // 安卓
    //     console.log('安卓点击打开app-page',url);
    //     OpenApp(url);
    // } else if (system() === "ios") { // ios
        let oUrl = `openhkhshlogin://${url}`
        let appUrl = `https://mylink.komect.com/mylink/#/l/?link=${encodeURIComponent(oUrl)}&umkey=`;
        console.log('ios点击打开app-page', appUrl);
        window.location.href = appUrl;
    // }
}

// 分享
export const shareFun = (obj) => {
    obj.img = obj.img || 'http://cdn.via.cool/jtp-host/resource/activity/1622/2020-09-25/88adf6ddc877423ba931d110c9807a25.jpeg';
    const name = system();
    const isAndroid = name === "android"; // android终端
    const isiOS = name === "ios"; // ios终端

    let fun;

    // 分享
    if (obj.type === 1) {
        if (isAndroid) {
            fun = "initShare";
        }

        if (isiOS) {
            fun = "setShareButton";
        }
    }

    // 紧急电话
    if (obj.type === 2) {
        fun = "setEmergencyButton";
    }
    obj = JSON.stringify(obj);

    if (isAndroid) {
        // 调用原生的分享功能
        window.HkAndroid && window.HkAndroid[fun](obj);
    }

    if (isiOS) {
        // 调用原生的分享功能
        window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers[fun] &&
            window.webkit.messageHandlers[fun].postMessage(obj);
    }
};



// 唤起App
export const callApp = (url, link2) => {
    let _url = url || "";
    const _a = document.createElement("a");
    let PROTOCAL = "launchmylink";
    const callup = new CallUp({
        // 协议头
        PROTOCAL: PROTOCAL,

        HOME: "",

        // 唤起失败时的跳转链接
        FAILBACK: {
            // ANDROID: 'market://details?id=com.ChinaMobile',
            ANDROID: link2,
            IOS: link2,
        },

        // Android apk 相关信息
        APK_INFO: {
            PKG: "com.ChinaMobile",
            CATEGORY: "android.intent.category.DEFAULT",
            ACTION: "android.intent.action.VIEW",
        },

        // 唤起超时时间，超时则跳转到下载页面
        LOAD_WAITING: 3000,
    });

    if (_url) {
        _a.href = _url;
        // _url = _a.hash.indexOf('?') > -1 ? _url : `${_url}?`
    }

    callup.loadSchema({
        targetURI: _url,
    });
};

export const OpenApp = (url) => {
    const _url = url || "";
    let Value = `launchmylink://${encodeURIComponent(_url)}`;
    let data = { launchmylink: Value };
    //let data = OpenInstall.parseUrlParams() // openinstall.js中提供的工具函数，解析url中的所有查询参数
    // eslint-disable-next-line no-undef
    const OpenApp = new OpenInstall(
        {
            /* appKey必选参数，openinstall平台为每个应用分配的ID */
            appKey: "umf9a4",
            /* 可选参数，自定义android平台的apk下载文件名；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名 */
            // apkFileName : 'com.fm.openinstalldemo-v2.2.0.apk',
            /* 可选参数，是否优先考虑拉起app，以牺牲下载体验为代价 */
            preferWakeup:true,
            /* 自定义遮罩的html */
            // mask:function(){
            //  return "<div id='openinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
            // },
            /* openinstall初始化完成的回调函数，可选 */

            onready() {
                let m = this;
                //let button = document.getElementById(id)
                // button.style.visibility = 'visible'
                /* 在app已安装的情况尝试拉起app */
                m.schemeWakeup()
                console.log("openapp");
                /* 用户点击某个按钮时(假定按钮id为downloadButton)，安装app */
                m.wakeupOrInstall();
                // button.onclick = function () {
                //   console.log('openappClick')
                //   m.wakeupOrInstall()
                //   return false
                // }
            },
        },
        data
    );
};

// 获取地址栏参数-从search读取
function getSearchValue(text) {
    let search = window.location.search.slice(1).split("&");
    let value = "";
    for (let i = 0; i < search.length; i++) {
        let temp = search[i].split("=");
        if (temp.length === 2 && temp[0] === text) {
            value = temp[1];
        }
    }
    return value;
}
// 获取地址栏参数-从hash读取
function getHashValue(text) {
    let value = "";
    let hash = window.location.hash;
    let index = hash.indexOf("?");
    if (index <= 0) {
        return value;
    }
    let search = hash.slice(index + 1).split("&");
    for (let i = 0; i < search.length; i++) {
        let temp = search[i].split("=");
        if (temp.length === 2 && temp[0] === text) {
            value = temp[1];
        }
    }
    return value;
}
// 获取地址栏参数
export const getParam = function(text) {
    let value = getSearchValue(text) || getHashValue(text);
    return value;
};

export const getQueryVariable = (key, href) => {
    href = decodeURIComponent(href || window.location.href)
    let match = href.match(new RegExp('[?&]' + key + '=([^&]*)'))
    return match && match[1] && decodeURIComponent(match[1]) || ''
}