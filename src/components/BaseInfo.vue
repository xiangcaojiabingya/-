<template>
  <!-- 身份信息 -->
  <div class="base_info">
    <div class="info_name_div">
      <img src="@/assets/imgs/header_icon.png" class="header_img" />
      <span class="name_txt_span">姓名</span>
      <span class="name_sapn">{{ userName }}</span>
    </div>
    <div class="info_sfz_div">
      <img src="@/assets/imgs/sfz_icon.png" class="sfz_img" />
      <span class="name_txt_span">身份证</span>
      <span class="sfz_span">{{ certNo }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  components: {},
  props: {
    userName: {
      default: "",
      type: String,
    },
    certNo: {
      default: "",
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.base_info {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  margin-bottom: 24px;
}
/* 姓名 */
.info_name_div {
  width: 100%;
  padding: 40px 32px 20px 32px;
  display: flex;
  background: white;
  align-items: center;
  box-sizing: border-box;
  font-size: 32px;
}
.header_img {
  width: 40px;
}
.name_txt_span {
  margin-left: 24px;
}
.name_sapn {
  margin-left: 65px;
}
/* 身份证 */
.info_sfz_div {
  width: 100%;
  padding: 20px 32px 40px 32px;
  display: flex;
  background: white;
  box-sizing: border-box;
  align-items: center;
  font-size: 32px;
}
.sfz_img {
  width: 40px;
}
.sfz_span {
  margin-left: 32px;
}
</style>
