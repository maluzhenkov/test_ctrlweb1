<template>
  <menu class="menu">
    <div class="menu__header">
      <span class="menu__title">{{ title }}</span>
      <div class="menu__actions">
        <button
          v-show="selectedCategoryId"
          class="btn"
          type="button"
          @click="resetCategory"
        >
          Сброс
        </button>
        <button
          v-if="close"
          class="btn close"
          type="button"
          @click="$emit('close')"
        >
          &times;
        </button>
      </div>
    </div>
    <ul class="menu__list main-list">
      <TreeItem
        v-for="item in treeData"
        :key="item.id"
        :item="item"
        :selected-id="selectedCategoryId"
        @select="selectCategory"
      />
    </ul>
  </menu>
</template>

<script>
export default {
  name: 'TreeView',
  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'Категории',
    },
    close: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selectedCategoryId() {
      return this.$store.state.products.selectedCategory?.id
    },
  },
  methods: {
    selectCategory(item) {
      this.$store.dispatch('products/selectCategory', item)
    },
    resetCategory() {
      this.$store.commit('products/RESET_SELECTED_CATEGORY')
    },
  },
}
</script>

<style lang="scss">
.menu {
  user-select: none;
  overflow: hidden;
  padding: 0;
}
.menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: rem(8) rem(16);
  border-bottom: 1px solid #e6e6e6;
}
.menu__title {
  font-weight: bold;
  font-size: rem(16);
  line-height: 150%;
  color: $black;
}
.menu__actions {
  display: flex;
  & > *:not(:last-child) {
    margin-right: 2.5rem;
  }
  .close {
    font-size: 2.5rem;
  }
}
.menu__list {
  list-style: none;
  padding: rem(6) 0 0 rem(16);
}
.main-list {
  padding-right: rem(16);
  padding-bottom: rem(42);
}
.menu__item {
  cursor: pointer;
  margin-bottom: rem(8);
  font-size: rem(14);
  line-height: 170%;
}
.menu__item-caption {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
</style>
