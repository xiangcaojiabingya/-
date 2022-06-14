<template>
  <!--   自定义标题栏 -->
  <div class="title_div">
    <!-- 左侧返回箭头图标 -->
    <van-icon name="arrow-left" class="left_icon" @click="goBack" />
    <!-- 标题 -->
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "WebViewTitle",
  components: {},
  props: {},
  data() {
    return {};
  },
  props: {
    title: {
      default: "标题",
      type: String,
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 点击左侧的返回箭头
    goBack() {
      // this.$router.go(-1);
      this.$sccbaJsApi.popWindow();
    },
  },
};
</script>

<style scoped>
.title_div {
  width: 100%;
  background: white;
  height: 90px;
  vertical-align: middle;
  position: fixed;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  top: 0;
  line-height: 90px;
  font-size: 36px;
  color: #333;
  z-index: 9999;
  /* border-bottom: 1px solid var(--color-top-cuttingline); */
}
/* 左侧图标 */
.left_icon {
  position: absolute;
  float: left;
  left: 32px;
}
</style>
