<template>
  <!-- 养老缴费历史查询 -->
  <div class="pension_payment">
    <!-- 顶部导航栏 -->
    <web-view-title title="养老缴费历史查询"></web-view-title>
    <div class="pension_content">
      <div class="pension_top_info">
        <img src="@/assets/imgs/blue_bg.png" class="bg_img" />
        <div class="info_block_div">
          <span>{{ jfze }}</span>
          <span>总缴费额（元）</span>
        </div>
        <div class="info_block_div">
          <span>{{ jfys }}</span>
          <span>总缴费月数</span>
        </div>
      </div>
      <!-- 搜索 -->
      <search-item class="search_div" @toSearch="toSearch"></search-item>
      <!-- 公告 -->
      <div class="gonggao_div">
        <img src="@/assets/imgs/gg_icon.png" />
        <span>最早缴费年月{{ startMonth }}，最晚缴费年月{{ lastMonth }}</span>
      </div>
      <!-- 列表 -->
      <record-item
        v-for="(item, index) in list"
        :key="index"
        :data="item"
      ></record-item>
      <div v-if="isEmpty" class="empty_tip">无数据</div>
      <span class="tip_span">本服务由日照市人力资源和社会保障局提供</span>
    </div>
  </div>
</template>

<script>
import WebViewTitle from "@/components/WebViewTitle.vue";
import RecordItem from "./components/RecordItem.vue";
import SearchItem from "./components/SearchItem.vue";
import { ajaxGet, apiUrl, ajaxPost } from "@/api.js";
import { getLastSixMonNum } from "@/utils/index.js";
import { GetKey } from "@/utils/AESCryptoJS.js";
export default {
  name: "PensionPayment",
  components: { WebViewTitle, RecordItem, SearchItem },
  props: {},
  data() {
    return {
      list: [],
      startMonth: "", //最早缴费年月
      lastMonth: "", //最晚缴费年月
      jwToken: "",
      jfys: "0", //缴费月数
      jfze: "0", //缴费总额
      isEmpty: false,
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
    //点击搜索按钮
    toSearch(value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "加载中...",
        forbidClick: true,
      });
      this.list = [];
      this.getPayAged(value.startMonth, value.endMonth);
    },
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
          this.getPayAgedTotal();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.clear();
        });
    },
    //获取养老缴费汇总查询
    getPayAgedTotal() {
      ajaxPost(apiUrl.getPayAgedTotal, { rsxtid: "3761" })
        .then((result) => {
          let data = result.data[0];
          this.jfys = data.jfys;
          this.jfze = Number.parseFloat(
            data.dwjfe + data.grjfe + data.jmjfe
          ).toFixed(2);
          this.startMonth = data.minny;
          this.lastMonth = data.maxny;
          this.getPayAged(getLastSixMonNum()[1], getLastSixMonNum()[0]);
        })
        .catch((error) => {
          console.log(error);
          this.getPayAged(getLastSixMonNum()[1], getLastSixMonNum()[0]);
        });
    },
    //获取缴费列表
    getPayAged(startDate, endDate) {
      ajaxPost(apiUrl.getPayAged, {
        rsxtid: "3761",
        qsny: startDate,
        zzny: endDate,
      })
        .then((result) => {
          this.$toast.clear();
          this.list = result.data;
          if (this.list.length == 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.clear();
        });
    },
  },
};
</script>

<style scoped>
.pension_payment {
  background: var(--color-Lightgray-bg);
}
.pension_content {
  padding-top: 90px;
  display: flex;
  position: relative;
  flex-direction: column;
}
.empty_tip {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  color: #999999;
  font-size: 28px;
}
/* 顶部总览数据 */
.pension_top_info {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
}
.bg_img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.info_block_div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  flex-direction: column;
}
.info_block_div span:first-child {
  color: white;
  font-size: 50px;
  font-weight: bold;
  margin-top: 70px;
}
.info_block_div span:last-child {
  color: #ccdfff;
  font-size: 24px;
  margin-top: 24px;
}
/* 搜索 */
.search_div {
  width: 100%;
  margin-top: 92px;
}
/* 公告 */
.gonggao_div {
  width: 100%;
  padding: 0 32px;
  height: 60px;
  font-size: 24px;
  color: #f7692d;
  background: #fff4f0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.gonggao_div img {
  width: 30px;
}
.gonggao_div span {
  margin-left: 10px;
}
/* 底部提示文字 */
.tip_span {
  /* width: 100%; */
  text-align: center;
  margin-top: 60px;
  color: #999999;
  font-size: 24px;
  padding: 0 32px;
  margin-bottom: 100px;
}
</style>
