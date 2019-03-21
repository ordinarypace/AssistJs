const detect = (_ => {
    const checkWebview = (info, ua) => {
        info.browser.webview =
                (info.os.name === "android" && ua.indexOf("; wv") > -1) ||// Android
                (info.os.name === "ios" && info.browser.version === "-1") ||// ios
                (ua.indexOf("NAVER") > -1 || ua.indexOf("Daum") > -1) ||// Other
                false;

        return info;
    };

    const agent = useragent => {
        const ua = useragent || navigator.userAgent;

        const osMatch = /(Windows Phone) ([\d|\.]+)/.exec(ua) ||
                /(iPhone |iPad )?OS ([\d|_]+)/.exec(ua) ||
                /(Android) ([\w.]+)/.exec(ua) ||
                /(Windows NT) ([\d|\.]+)/.exec(ua) ||
                /(Windows) ([\w|\.]+)/.exec(ua) ||
                /(Mac OS X)( ([\w.]+))?/.exec(ua) ||
                [];

        let browserMatch = /(Chrome|CriOS|Firefox)[\s\/]([\w.]+)/.exec(ua) ||
                /(MSIE|IEMobile)[\/\s]([\d.]+)/.exec(ua) ||
                /(Trident)[\/\s]([\d.]+)/.exec(ua) ||
                /(PhantomJS)\/([\d.]+)/.exec(ua) ||
                [];

        if(osMatch.length >= 3) {
            if(ua.indexOf("Win") !== -1){
                osMatch[1] = "window";
                osMatch[2] = osMatch[2] === "2000" ? "5.0" : osMatch[2]; // for window 2000

            } else if (/iPhone|iPad/.test(ua)) osMatch[1] = "ios";
            else if (ua.indexOf("Mac") !== -1) osMatch[1] = "mac";
            else osMatch[1] = osMatch[1].toLowerCase();

            osMatch[2] = (osMatch[2] || "").replace(/\_/g, ".").replace(/\s/g, "");
        }

        // browser
        if (browserMatch.length >= 3) {
            if(/MSIE|IEMobile|Trident/.test(ua)) browserMatch[1] = "ie";
            else if (/Chrome|CriOS/.test(ua)) browserMatch[1] = ua.indexOf("SAMSUNG") !== -1 ? "sbrowser" : "chrome";
            else browserMatch[1] = browserMatch[1].toLowerCase();

        } else if (browserMatch.length === 0 && osMatch[1] && osMatch[1] !== "android"){
            browserMatch = /(Safari)\/([\w.]+)/.exec(ua) || (osMatch[1] === "ios" ? ["", "safari"] : ["", ""]);
            browserMatch[1] = browserMatch[1].toLowerCase();

            if(browserMatch[0] && browserMatch[1].indexOf("safari") !== -1){
                try {
                    browserMatch[2] = ua.indexOf("Apple") !== -1 ? ua.match(/Version\/([\d.]+)/)[1] || null : null;
                } catch(e){
                    browserMatch[2] = null;
                }
            }
        }

        let info = {
            os: {
                name: osMatch[1] || "",
                version: osMatch[2] || "-1"
            },
            browser: {
                name: browserMatch[1] || "default",
                version: browserMatch[2] || /*osMatch[2] ||*/ "-1"
            }
        };

        info = checkWebview(info, ua);

        return info;
    };

    return {
        agent
    };
})();

export default detect;