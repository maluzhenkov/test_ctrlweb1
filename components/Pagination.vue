<template>
  <div class="pagination">
    <button
      v-show="value > 1"
      class="btn btn_prev"
      type="button"
      @click="setPrevPage"
    >
      <BaseIcon name="chevron" view-box="0 0 9 14" />
      <span>назад</span>
    </button>
    <button
      v-for="(num, idx) in length"
      :key="idx"
      class="btn btn_page"
      :class="{ 'is-active': num === value }"
      type="button"
      @click="setPage(num)"
    >
      {{ num }}
    </button>
    <button
      v-show="value < length"
      class="btn btn_next"
      type="button"
      @click="setNextPage"
    >
      <span>вперед</span>
      <BaseIcon name="chevron" view-box="0 0 9 14" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setPage(num) {
      this.$emit('input', num)
    },
    setPrevPage() {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
    },
    setNextPage() {
      if (this.value < this.length) {
        this.$emit('input', this.value + 1)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  color: $primary-90;
  .btn_prev {
    font-size: rem(14);
    margin-right: rem(20);
    .icon {
      height: rem(14);
    }
  }
  .btn_next {
    font-size: rem(14);
    margin-left: rem(20);
    .icon {
      height: rem(14);
      transform: rotate(180deg);
    }
  }
  .btn_page {
    font-size: rem(14);
    line-height: 170%;
    padding: rem(2) rem(12);
    border-radius: rem(4);
    &.is-active {
      color: $black-10;
      background-color: $black;
    }
  }
}
</style>
