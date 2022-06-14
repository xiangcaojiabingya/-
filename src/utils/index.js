/* 时间格式化 */
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export const getFormatDate = (str) => {
    if (str) {
        return (new Date()).Format(str)
    }
    return (new Date()).Format("yyyy-MM-dd hh:mm:ss.S");
}
export const getuuid = () => {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

export const getOnlyUuid = () => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    uuid = uuid.replace(new RegExp('-', "gm"), '')
    return uuid;
}




// 判断是否是11位有效手机号码
export const isPoneAvailable = (poneInput) => {
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(poneInput)) {
        return false;
    } else {
        return true;
    }
}


//获取固定时间 一月 半年 一年
// M 一月 
// HY 半年
// Y 一年
export const getDateFor = (str) => {
    var date = new Date();
    var thisTime = date.Format("yyyy-MM-dd hh:mm:ss");
    var tempResult = {
        startTime: thisTime,
        endTime: thisTime
    }
    switch (str) {
        case "M":
            date.setMonth(date.getMonth() - 1, date.getDate());
            tempResult.startTime = date.Format("yyyy-MM-dd hh:mm:ss");
            break;
        case "HY":
            var dateHY = new Date(date.getTime() - 365 / 2 * 24 * 3600 * 1000);
            tempResult.startTime = dateHY.Format("yyyy-MM-dd hh:mm:ss");
            break;
        case "Y":
            date.setFullYear(date.getFullYear() - 1, date.getMonth(), date.getDate());
            tempResult.startTime = date.Format("yyyy-MM-dd hh:mm:ss");
            break;
    }
    return tempResult;
}

// 格式化金额10,000.00
export const moneyFormat = (nStr) => {
    if (nStr == undefined || nStr == null) {
        return '--'
    }
    if (nStr == '0') {
        return '0'
    }
    var str = (nStr / 1).toFixed(2) + '';
    var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
    var dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
    var ret = intSum + dot;
    return ret;
}

// 判断数组是否为空
export const isHasData = (array) => {
    let flag = false
    if (array == undefined || array == [] || array == null || array == "" || array == "[]") {
        flag = false
    } else {
        flag = true
    }
    return flag
}
//判断是否是图片
export const isAssetTypeAnImage = (ext) => {
    return [
        'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
        indexOf(ext.toLowerCase()) !== -1;
}

//判断是否是座机号
export function checkTel(number) {
    var zuoji = /^0\d{2,3}-?\d{7,8}$/
    var result = zuoji.test(number)
    return result;
}

//判断邮编
export function isYbcheck(value) {
    if (value != "") {   //邮政编码判断
        var pattern = /^[0-9]{6}$/;
        let flag = pattern.test(value);
        return flag;
    }
}
//获取url 携带的参数
export const getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    } else {
        return null;
    }
}

// window.location.search为空
export const getUrlQuery = (url, name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    } else {
        return null;
    }
}
//判断是不是Json数据
export function isjson(obj) {
    var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

// 获取最近六个月
export function getLastSixMon() {
    var data = new Date();
    //获取年
    var year = data.getFullYear();
    //获取月
    var mon = data.getMonth() + 1;
    var arry = new Array();
    for (var i = 0; i < 6; i++) {
        if (mon <= 0) {
            year = year - 1;
            mon = mon + 12;
        }
        if (mon < 10) {
            mon = "0" + mon;
        }
        arry[i] = year + "年" + mon + "月";
        mon = mon - 1;
    }
    let date = []
    date[0] = arry[0]
    date[1] = arry[5]
    return date;
}

// 获取最近六个月
export function getLastSixMonNum() {
    var data = new Date();
    //获取年
    var year = data.getFullYear();
    //获取月
    var mon = data.getMonth() + 1;
    var arry = new Array();
    for (var i = 0; i < 6; i++) {
        if (mon <= 0) {
            year = year - 1;
            mon = mon + 12;
        }
        if (mon < 10) {
            mon = "0" + mon;
        }
        arry[i] = year + "" + mon;
        mon = mon - 1;
    }
    let date = []
    date[0] = arry[0]
    date[1] = arry[5]
    return date;
}
//保留金额的2位小数
export function formatJfe(value) {
    if (value == undefined || value == '`k' || value == "") {
        return 0
    }
    return Number.parseFloat(value).toFixed(2);
}
//处理日期
export function dealDate(date) {
    if (date == undefined || date == '`k' || date == '') {
        return ""
    }
    let time
    time = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8)
    return time;
}
