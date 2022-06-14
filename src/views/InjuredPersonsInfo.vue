<template>
  <!-- 工伤人员基本信息查询 -->
  <div class="injured_persons_info">
    <!-- 顶部导航栏 -->
    <web-view-title title="工伤人员基本信息查询"></web-view-title>
    <!-- 内容 -->
    <div class="info_content_div">
      <!-- 身份信息 -->
      <base-info
        :userName="userInfo.userName"
        :certNo="userInfo.userCertId"
      ></base-info>

      <div class="qyyl_div">
        <black-key-value-txt
          title="单位名称"
          :isShow="false"
          :content="gsInfo.dwmc"
        ></black-key-value-txt>
        <black-key-value-txt
          title="工伤发生时间"
          :content="formatDate(gsInfo.gsfssj)"
        ></black-key-value-txt>
        <black-key-value-txt
          title="事故类别"
          :content="gsInfo.gslbmc"
        ></black-key-value-txt>
        <black-key-value-txt
          title="职业病"
          :content="gsInfo.zyblbmc"
        ></black-key-value-txt>
        <black-key-value-txt
          title="工伤申请日期"
          :content="formatDate(gsInfo.sqsj)"
        ></black-key-value-txt>
        <black-key-value-txt
          title="工伤认定日期"
          :content="formatDate(gsInfo.gsrdsj)"
        ></black-key-value-txt>
        <black-key-value-txt
          title="工伤鉴定日期"
          :content="formatDate(gsInfo.jdrq)"
        ></black-key-value-txt>
        <black-key-value-txt
          title="伤残等级"
          :content="gsInfo.scdjmc"
        ></black-key-value-txt>
        <black-key-value-txt
          title="护理等级"
          :content="gsInfo.hljbmc"
        ></black-key-value-txt>
      </div>
    </div>
    <div class="tip_span">本服务由日照市人力资源和社会保障局提供</div>
  </div>
</template>

<script>
import WebViewTitle from "@/components/WebViewTitle.vue";
import BaseInfo from "@/components/BaseInfo.vue";
import BlackKeyValueTxt from "@/components/BlackKeyValueTxt.vue";
import { GetKey } from "@/utils/AESCryptoJS.js";
import { ajaxGet, apiUrl, ajaxPost } from "@/api.js";
import { dealDate } from "@/utils/index.js";
export default {
  name: "InjuredPersonsInfo",
  components: { WebViewTitle, BaseInfo, BlackKeyValueTxt },
  props: {},
  data() {
    return {
      userInfo: {}, //用户信息
      gsInfo: {}, //工伤信息
      jwToken: "",
    };
  },
  computed: {},
  created() {},
  mounted() {
    // 获取AES加密key
    localStorage.setItem("aesKey", GetKey());
    //获取JWToken
    this.$sccbaJsApi.getJWToken({
      success: (obj) => {
        this.jwToken = obj.jwToken;
        this.getZTToken();
      },
      fail: (err) => {
        this.$dialog.alert({
          message: err.message,
        });
      },
    });

    // this.getZTToken();
  },
  methods: {
    //获取中台token
    getZTToken() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "加载中...",
        forbidClick: true,
      });
      ajaxGet(apiUrl.getToken.url)
        .then((result) => {
          localStorage.setItem("token", result.data.access_token);
          this.getUserInfo();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.clear();
        });
    },
    //获取用户信息
    getUserInfo() {
      ajaxPost(apiUrl.getSession, { jwtToken: this.jwToken })
        .then((result) => {
          localStorage.setItem("sessionId", result.data);
          this.getHarmInfo();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.clear();
        });
    },
    //工伤人员基本信息查询
    getHarmInfo() {
      ajaxPost(apiUrl.getHarmInfo, {
        rsxtid: "3761",
      })
        .then((result) => {
          this.$toast.clear();
          this.userInfo = result.data.userInfo;
          if ("list" in result.data) {
            if (result.data.list.length > 0) {
              this.gsInfo = result.data.list[0];
            } else {
              this.$dialog.alert({
                message: "没有查询到该用户的工伤信息",
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.clear();
        });
    },
    //处理日期
    formatDate(time) {
      return dealDate(time);
    },
  },
};
</script>

<style scoped>
.injured_persons_info {
  width: 100%;
  padding-bottom: 100px;
  background: var(--color-Lightgray-bg);
}
.info_content_div {
  padding-top: 90px;
  width: 100%;
}
.qyyl_div {
  width: 100%;
  display: flex;
  background: white;
  flex-direction: column;
}

/* 底部提示文字 */
.tip_span {
  /* width: 100%; */
  text-align: center;
  margin-top: 60px;
  color: #999999;
  font-size: 24px;
  padding: 0 32px;
}
</style>
 