<template>
  <!-- 缴费记录 -->
  <div class="search_item">
    <div class="search_top_div" @click="showRecord">
      <img src="@/assets/imgs/search_icon.png" class="search_img" />
      <span class="txt_span">缴费记录</span>
      <img
        class="right_img"
        :src="
          isExtend
            ? require('@/assets/imgs/top_icon.png')
            : require('@/assets/imgs/down_icon.png')
        "
      />
    </div>
    <span class="search_time_span">{{ startTime }}至{{ endTime }}</span>
    <div class="date_choose_div" v-if="isExtend">
      <horizontal-line></horizontal-line>
      <div class="start_time_div" @click="startChoose('start')">
        <span>开始月份</span>
        <span class="time_span">{{ startMonth }}</span>
        <img class="start_right_img" src="@/assets/imgs/right_icon.png" />
      </div>
      <div class="mid_line">
        <horizontal-line></horizontal-line>
      </div>
      <div class="start_time_div" @click="startChoose('end')">
        <span>结束月份</span>
        <span class="time_span">{{ endMonth }}</span>
        <img class="start_right_img" src="@/assets/imgs/right_icon.png" />
      </div>
      <horizontal-line></horizontal-line>
      <div class="btn_div">
        <span class="cz_span" @click="resetFun">重置</span>
        <span class="search_span" @click="searchFun">搜索</span>
      </div>
    </div>

    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        @confirm="onConfirm"
        @cancel="onCancel"
        title="选择年月"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script>
import HorizontalLine from "@/components/HorizontalLine.vue";
import { getLastSixMon } from "@/utils/index";
export default {
  name: "SearchItem",
  components: { HorizontalLine },
  props: {},
  data() {
    return {
      isExtend: false,
      show: false,
      currentDate: new Date(),
      startMonth: "", //开始月份
      endMonth: "", //结束月份
      flag: "",
      startTime: "", //近6个月的开始时间
      endTime: "", //近6个月的结束时间
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.startTime = getLastSixMon()[1];
    this.startMonth = getLastSixMon()[1];
    this.endMonth = getLastSixMon()[0];
    this.endTime = getLastSixMon()[0];
  },
  methods: {
    //   点击展示选择时间
    showRecord() {
      this.isExtend = !this.isExtend;
    },
    startChoose(type) {
      this.show = true;
      this.flag = type;
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    onConfirm(value) {
      this.show = false;
      this.currentDate = new Date();
      if (this.flag == "start") {
        this.startMonth = this.dateFormat(value);
      } else if (this.flag == "end") {
        this.endMonth = this.dateFormat(value);
      }
    },
    onCancel() {
      this.show = false;
    },
    dateFormat(dateData) {
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      const time = y + "年" + m + "月";
      return time;
    },
    // 重置
    resetFun() {
      this.startMonth = getLastSixMon()[1];
      this.endMonth = getLastSixMon()[0];
    },
    // 搜索
    searchFun() {
      this.$emit("toSearch", {
        startMonth: this.formatYearMonth(this.startMonth),
        endMonth: this.formatYearMonth(this.endMonth),
      });
    },
    //去掉汉字
    formatYearMonth(value) {
      value = value.replace("年", "");
      value = value.replace("月", "");
      return value;
    },
  },
};
</script>

<style scoped>
.search_item {
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  font-size: 30px;
}

.search_top_div {
  width: 100%;
  padding: 40px 32px 24px 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
}

.search_img {
  width: 32px;
  height: 32px;
}
.txt_span {
  margin-left: 18px;
  font-size: 32px;
  color: #333333;
}
.right_img {
  width: 32px;
  position: absolute;
  padding: 0 32px 0 32px;
  right: 0;
}
.search_time_span {
  font-size: 28px;
  color: #999999;
  margin-left: 82px;
  margin-bottom: 40px;
}
/* 日期选择 */
.date_choose_div {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.start_time_div {
  width: 100%;
  display: flex;
  padding: 0 32px;
  height: 98px;
  align-items: center;
  flex-direction: row;
  position: relative;
  box-sizing: border-box;
}
.start_time_div span:first-child {
  color: #999999;
}
.time_span {
  color: #333333;
  margin-left: 60px;
}
.start_right_img {
  position: absolute;
  height: 30px;
  right: 30px;
}
.mid_line {
  width: 100%;
  padding-left: 32px;
  box-sizing: border-box;
}
/* 底部按钮div */
.btn_div {
  padding: 40px 0;
  width: 100%;
  /* text-align: center; */
  display: flex;
  justify-content: space-evenly;
  /* padding-left: 16px;
  padding-right: 16px; */
}
.cz_span {
  color: #ed3e48;
  text-align: center;
  border-radius: 40px;
  font-size: 32px;
  height: 80px;
  width: 320px;
  line-height: 80px;
  /* background: #fff4f0; */
  margin-top: 0.1rem;
  border: 2px solid #ed3e48;
}
.search_span {
  text-align: center;
  border-radius: 40px;
  margin-top: 15px;
  /* border: 1px solid #f8692d; */
  color: white;
  font-size: 32px;
  height: 80px;
  width: 320px;
  line-height: 80px;
  /* border-radius: 20px; */
  margin-top: 0.1rem;
  background: #ed3e48;
  box-shadow: 0px 16px 19px -10px #ed3e48;
}
</style>
