<template>
  <div class="keyValueTxt">
    <span>{{ title }}：</span>
    <span>{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: "KeyValueTxt",
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
    content: {
      default: "",
      type: String,
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.keyValueTxt {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 40px 0;
  box-sizing: border-box;
  font-size: 32px;
  color: #333;
}
span:first-child {
  color: #999999;
}
span:last-child {
  word-wrap: break-word;
  word-break: break-all;
}
</style>
