<template>
  <div class="main">
    <horizontal-line v-if="isShow"></horizontal-line>
    <div class="keyValueTxt">
      <span>{{ title }}：</span>
      <span>{{ content }}</span>
    </div>
  </div>
</template>

<script>
import HorizontalLine from "./HorizontalLine.vue";
export default {
  name: "BlackKeyValueTxt",
  components: { HorizontalLine },
  props: {
    title: {
      default: "标题",
      type: String,
    },
    content: {
      default: "",
      type: String,
    },
    isShow: {
      default: true,
      type: Boolean,
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
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.keyValueTxt {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  font-size: 32px;
  color: #333;
  padding: 40px 32px;
}
span:last-child {
  word-wrap: break-word;
  word-break: break-all;
}
</style>
