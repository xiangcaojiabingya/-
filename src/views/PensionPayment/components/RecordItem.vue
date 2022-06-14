<template>
  <!-- 列表item -->
  <div class="record_item">
    <span class="time_span">{{ data.jfny }}</span>
    <div class="top_info_div">
      <div class="top_info_item_div">
        <span class="jine_span">{{ getJine(data.dwjfe) }}</span>
        <span>单位缴纳金额</span>
      </div>
      <div class="top_info_item_div">
        <span class="jine_span">{{ getJine(data.grjfe) }}</span>
        <span>个人缴纳金额</span>
      </div>
      <div class="top_info_item_div">
        <span class="dwjf_span">{{ data.fsyymc }}</span>
        <span>发生原因</span>
      </div>
    </div>
    <!-- 分割线 -->
    <horizontal-line></horizontal-line>
    <!-- 详情 -->
    <div class="content_detail_div" v-if="isExtend">
      <key-value-txt
        title="险种标志名称"
        :content="data.xzbzmc"
      ></key-value-txt>
      <key-value-txt title="单位编号" :content="data.dwbh"></key-value-txt>
      <key-value-txt title="参保单位" :content="data.dwmc"></key-value-txt>
      <key-value-txt
        title="个人缴费基数"
        :content="getJine(data.grjfjs) + '元'"
      ></key-value-txt>
      <key-value-txt
        title="单位缴费基数"
        :content="getJine(data.dwjfjs) + '元'"
      ></key-value-txt>
      <key-value-txt
        title="经办日期"
        :content="formatDate(data.jbrq)"
      ></key-value-txt>
      <key-value-txt
        title="发生日期"
        :content="formatDate(data.fsrq)"
      ></key-value-txt>
      <key-value-txt
        title="缴费日期"
        :content="formatDate(data.jfrq)"
      ></key-value-txt>
    </div>
    <!-- 分割线 -->
    <horizontal-line v-if="isExtend"></horizontal-line>
    <!-- 底部展开收起按钮 -->
    <div class="bottom_div" @click="toPackUp">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import HorizontalLine from "@/components/HorizontalLine.vue";
import KeyValueTxt from "@/components/KeyValueTxt.vue";
import { formatJfe, dealDate } from "@/utils/index";
export default {
  name: "RecordItem",
  components: { HorizontalLine, KeyValueTxt },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      text: "展开详情",
      isExtend: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    //   展开收起
    toPackUp() {
      if (this.text == "展开详情") {
        this.text = "收起";
        this.isExtend = true;
      } else if (this.text == "收起") {
        this.text = "展开详情";
        this.isExtend = false;
      }
    },
    //保留金额的2位小数
    getJine(value) {
      return formatJfe(value);
    },
    //处理日期
    formatDate(time) {
      return dealDate(time);
    },
  },
};
</script>

<style scoped>
.record_item {
  width: 100%;
  display: flex;
  background: white;
  flex-direction: column;
  margin-top: 24px;
  box-sizing: border-box;
}
.time_span {
  font-size: 28px;
  font-weight: bold;
  margin-left: 32px;
  margin-right: 32px;
  margin-top: 40px;
}
.top_info_div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.top_info_item_div {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0 0 0;
}
.jine_span {
  font-size: 44px;
  color: #ff7d1a;
}
.top_info_item_div span:last-child {
  font-size: 24px;
  margin-top: 24px;
  color: #999999;
  margin-bottom: 40px;
}
.dwjf_span {
  font-size: 28px;
  color: #ff7d1a;
}
.content_detail_div {
  width: 100%;
  padding: 40px 32px 0px 32px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
}
.bottom_div {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 32px;
  box-sizing: border-box;
  color: #3479f8;
  font-size: 28px;
}
</style>
