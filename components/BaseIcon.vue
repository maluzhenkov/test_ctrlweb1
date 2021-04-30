<template>
  <svg
    class="icon"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    v-html="path"
  ></svg>
</template>

<script>
import icons from '@/assets/images/svg/icons'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    viewBox: {
      type: String,
      default: '0 0 22 18',
    },
  },
  data() {
    return {
      path: icons[this.name],
    }
  },
}
</script>
