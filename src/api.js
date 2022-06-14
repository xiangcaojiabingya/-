import { getFormatDate, getuuid } from '@/utils/index.js'
import { ajaxGetToken } from '@/utils/mxapi.js'
import { Encrypt } from '@/utils/AESCryptoJS.js'
import rsaUtil from '@/utils/RSAJSEncrypt.js'
import config from '@/config.js';
import { axoisPost, axoisGet, axoisPostNormal } from "@/utils/common.js"
//RSA加密公钥---加密使用
const rsaPublicKey = `${config[config.env].rsaPublicKey}`

//应用常量
export const baseUrl = `${config[config.env].baseUrl}`

//接口管理平台的常量
const grant_type = `${config[config.env].grant_type}`
const txBrNo = `${config[config.env].txBrNo}`
const chnlCode = `${config[config.env].chnlCode}`
const client_secret = `${config[config.env].client_secret}`


// POST加密
export const ajaxPost = (apiCode, query) => {
  // console.log("提交数据：" + JSON.stringify(query));
  var url = apiCode.url;
  //将数据进行AES加密
  var requestDatas = Encrypt(JSON.stringify(query), localStorage.getItem('aesKey'))
  //将AES加密key进行RSA加密
  var encodeKeys = rsaUtil.Encrypt(localStorage.getItem('aesKey'), rsaPublicKey)
  let data = {
    timeStamp: getFormatDate(),
    requestId: getuuid(),
    txBrNo: txBrNo,
    chnlCode: chnlCode,
    serviceCode: apiCode.api,
    svcSubCode: "",
    access_token: localStorage.getItem('token'),
    sign: null,
    encryptAlgo: "AES",
    encodeKey: encodeKeys, //AES的加密key
    requestData: requestDatas, //AES加密后的数据
  }
  // console.log('geturl =>' + url);
  var headers = {
    'Content-Type': 'application/json;charset=utf-8',
    "sessionId": localStorage.getItem('sessionId')
  }
  return axoisPost(url, data, headers)
}


//POST不加密
export const ajaxPostNormal = (apiCode, query) => {
  var url = apiCode.url;
  let data = {
    timeStamp: getFormatDate(),
    requestId: getuuid(),
    txBrNo: txBrNo,
    chnlCode: chnlCode,
    serviceCode: apiCode.api,
    svcSubCode: "",
    access_token: localStorage.getItem('token'),
    sign: null,
    encryptAlgo: null,
    encodeKey: null,
    requestData: query,
  }
  // console.log('geturl =>' + url);
  return axoisPostNormal(url, data, {
    'Content-Type': 'application/json; charset=utf-8',
    "sessionId": localStorage.getItem('sessionId')
  })
}

export const ajaxGet = (url) => {
  // url = baseUrl + url
  var query = {
    grant_type: grant_type,
    client_id: chnlCode,
    client_secret: client_secret,
  }
  // return new Promise((resolve, reject) => {
  //   ajaxGetToken(url, query).then(res => {
  //     resolve(res)
  //   }).catch(error => {
  //     console.log("中台token错误返回：" + JSON.stringify(error));
  //     reject(error)
  //   })
  // })
  return axoisGet(url, query, {
    'Content-type': 'application/x-www-form-urlencoded'
  })
}


// Url & Api Code
export const apiUrl = {
  getToken: { //获取token
    url: "/auth/oauth/token",
    api: 'A0465',
    answer: ''
  },
  getSession: {//根据jwtToken获取sessionId
    url: "/user/getSession",
    api: 'A0900',
  },
  getHarmInfo: {//工伤人员基本信息查询
    url: "/rzSocialSecurity/getHarmInfo",
    api: 'A0877',
  },
  getPerJoin: {//个人参保信息查询
    url: "/rzSocialSecurity/getPerJoin",
    api: 'A0880',
  },
  getPayHarm: {
    //工伤缴费历史查询
    url: "/rzSocialSecurity/getPayHarm",
    api: 'A0879',
  },
  getPayAged: {
    //养老缴费历史查询
    url: "/rzSocialSecurity/getPayAged",
    api: 'A0878',
  },
  getPayHarmTotal: {
    //工伤缴费信息汇总查询
    url: "/rzSocialSecurity/getPayHarmTotal",
    api: 'A0898',
  },
  getPayAgedTotal: {
    //养老缴费信息总汇查询
    url: "/rzSocialSecurity/getPayAgedTotal",
    api: 'A0897',
  }
}
