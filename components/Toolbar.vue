<template>
  <div class="toolbar">
    <button
      class="btn category-menu-mobile-btn"
      type="button"
      @click="$emit('openMobileMenu')"
    >
      <BaseIcon name="burger" />
      <span>Категории</span>
    </button>
    <select
      class="custom-select"
      @change="$emit('change', $event.target.value)"
    >
      <option
        v-for="{ value: sortValue, text } in options"
        :key="sortValue"
        :selected="value === sortValue"
        :value="sortValue"
      >
        {{ text }}
      </option>
    </select>
  </div>
</template>

<script>
import { sortOptions } from '@/constants'

export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    options() {
      return sortOptions
    },
  },
}
</script>
