<template>
  <li class="menu__item">
    <div
      class="menu__item-caption"
      :class="computedClass"
      @click="toggle(item)"
    >
      <span>{{ item.name }}</span>
    </div>
    <ul v-if="isFolder" v-show="isOpen" class="menu__list">
      <TreeItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :selected-id="selectedId"
        @select="$emit('select', child)"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    selectedId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    computedClass() {
      const res = []
      if (this.isFolder) {
        if (this.isOpen) {
          res.push('li-arrow-up')
        } else {
          res.push('li-arrow-down')
        }
      }
      if (this.selectedId === this.item.id) {
        res.push('is-active')
      }
      return res
    },
    isFolder() {
      return this.item.children?.length
    },
  },
  methods: {
    toggle(item) {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
      this.$emit('select', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.is-active {
  font-weight: bold;
}
.li-arrow-up {
  &::after {
    display: inline-block;
    content: '';
    width: 0;
    height: 0;
    border-left: rem(6) solid transparent;
    border-right: rem(6) solid transparent;
    border-bottom: rem(6) solid $black;
  }
}
.li-arrow-down {
  &::after {
    display: inline-block;
    content: '';
    width: 0;
    height: 0;
    border-left: rem(6) solid transparent;
    border-right: rem(6) solid transparent;
    border-top: rem(6) solid $black;
  }
}
</style>
