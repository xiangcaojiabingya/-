<template>
  <!-- 个人参保信息查询 -->
  <div class="IndividualInsurance">
    <!-- 顶部导航栏 -->
    <web-view-title title="个人参保信息查询"></web-view-title>
    <!-- 内容 -->
    <div class="content">
      <!-- 身份信息 -->
      <base-info
        :userName="baseInfo.userName"
        :certNo="baseInfo.userCertId"
      ></base-info>

      <van-tabs
        title-active-color="#f7692d"
        title-inactive-color="#999999"
        color="#f7692d"
        v-model="active"
        sticky
      >
        <van-tab title="企业养老">
          <div class="qyyl_div">
            <black-key-value-txt
              title="起始日期"
              :content="formatDate(qyylData.qsrq)"
            ></black-key-value-txt>
            <black-key-value-txt
              title="终止日期"
              :content="qyylData.zzrq"
            ></black-key-value-txt>
            <black-key-value-txt
              title="险种名称"
              :content="qyylData.xzbzmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="参保状态"
              :content="qyylData.cbztmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="缴费人员类别"
              :content="qyylData.jfrylbmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="单位编号"
              :content="qyylData.dwbh"
            ></black-key-value-txt>
            <black-key-value-txt
              title="参保单位名称"
              :content="qyylData.cbdwmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="参保日期"
              :content="formatDate(qyylData.cbrq)"
            ></black-key-value-txt>
          </div>
        </van-tab>
        <van-tab title="失业"
          ><div class="qyyl_div">
            <black-key-value-txt
              title="起始日期"
              :content="formatDate(syData.qsrq)"
            ></black-key-value-txt>
            <black-key-value-txt
              title="终止日期"
              :content="syData.zzrq"
            ></black-key-value-txt>
            <black-key-value-txt
              title="险种名称"
              :content="syData.xzbzmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="参保状态"
              :content="syData.cbztmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="缴费人员类别"
              :content="syData.jfrylbmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="单位编号"
              :content="syData.dwbh"
            ></black-key-value-txt>
            <black-key-value-txt
              title="参保单位名称"
              :content="syData.cbdwmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="参保日期"
              :content="formatDate(syData.cbrq)"
            ></black-key-value-txt></div
        ></van-tab>
        <van-tab title="工伤"
          ><div class="qyyl_div">
            <black-key-value-txt
              title="起始日期"
              :content="formatDate(gsData.qsrq)"
            ></black-key-value-txt>
            <black-key-value-txt
              title="终止日期"
              :content="gsData.zzrq"
            ></black-key-value-txt>
            <black-key-value-txt
              title="险种名称"
              :content="gsData.xzbzmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="参保状态"
              :content="gsData.cbztmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="缴费人员类别"
              :content="gsData.jfrylbmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="单位编号"
              :content="gsData.dwbh"
            ></black-key-value-txt>
            <black-key-value-txt
              title="参保单位名称"
              :content="gsData.cbdwmc"
            ></black-key-value-txt>
            <black-key-value-txt
              title="参保日期"
              :content="formatDate(gsData.cbrq)"
            ></black-key-value-txt></div
        ></van-tab>
      </van-tabs>
      <div class="tip_span">本服务由日照市人力资源和社会保障局提供</div>
    </div>
  </div>
</template>

<script>
import BlackKeyValueTxt from "@/components/BlackKeyValueTxt.vue";
import WebViewTitle from "@/components/WebViewTitle.vue";
import BaseInfo from "@/components/BaseInfo.vue";
import { GetKey } from "@/utils/AESCryptoJS.js";
import { ajaxGet, apiUrl, ajaxPost } from "@/api.js";
import { dealDate } from "@/utils/index.js";
export default {
  name: "IndividualInsurance",
  components: { WebViewTitle, BaseInfo, BlackKeyValueTxt },
  props: {},
  data() {
    return {
      active: 0,
      gsData: {}, //工伤数据
      syData: {}, //失业数据
      qyylData: {}, //企业养老数据
      baseInfo: {}, //基本信息
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
          this.getPerJoin();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.clear();
        });
    },
    // 个人参保信息查询
    getPerJoin() {
      ajaxPost(apiUrl.getPerJoin, { rsxtid: "3761", rqlb: "A" })
        .then((result) => {
          this.baseInfo = result.data.userInfo;
          if ("list" in result.data) {
            let list = result.data.list;
            for (let i = 0; i < list.length; i++) {
              const element = list[i];
              switch (element.xzbz) {
                case "101": //企业养老
                  this.qyylData = element;
                  break;
                case "201": //失业
                  this.syData = element;
                  break;
                case "401": //工伤
                  this.gsData = element;
                  break;
              }
            }
          }

          this.$toast.clear();
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
.IndividualInsurance {
  width: 100%;
  padding-bottom: 100px;
  background: var(--color-Lightgray-bg);
}
.content {
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
