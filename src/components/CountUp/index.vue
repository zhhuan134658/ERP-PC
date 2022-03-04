<template>
  <i-count-up
    :delay="0"
    :endVal="Number(value)"
    :options="options"
    @ready="onReady"
  />
</template>

<script>
import ICountUp from "vue-countup-v2";

export default {
  components: { ICountUp },
  props: {
    value: {
      default: 0
    },
    decimalPlaces: {
      default: 0
    }
  },
  data() {
    return {
      // 翻牌器
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "",
        decimalPlaces: this.decimalPlaces
      }
    };
  },
  methods: {
    onReady: function(instance, CountUp) {
      const that = this;
      instance.update(Number(that.value));
    }
  }
};
</script>
