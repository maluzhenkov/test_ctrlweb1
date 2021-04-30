<template>
  <div class="container-fluid">
    <Breadcrumbs />
    <div class="row">
      <div class="col-1 category-menu">
        <TreeView :tree-data="categories" />
      </div>
      <div class="col">
        <div class="main-content">
          <div class="categorie-title">
            {{ selectedCategoryName ? selectedCategoryName : 'Все продукты' }}
          </div>
          <select v-model="typeSort" class="custom-select">
            <option
              v-for="{ value, text } in sortOptions"
              :key="value"
              :value="value"
            >
              {{ text }}
            </option>
          </select>
          <ProductList :sort="typeSort" />
          <Pagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sortOptions } from '@/constants'

export default {
  data() {
    return {
      typeSort: 'ascPrice',
      sortOptions,
    }
  },
  async fetch({ store }) {
    await store.dispatch('products/getCategories')
    await store.dispatch('products/getProducts')
  },
  computed: {
    categories() {
      return this.$store.state.products.categories
    },
    selectedCategoryName() {
      return this.$store.state.products.selectedCategory?.name
    },
  },
}
</script>

<style lang="scss">
.category-menu {
  flex-direction: column;
  min-width: rem(232);
}
.categorie-title {
  font-weight: bold;
  font-size: rem(32);
  line-height: 125%;
  letter-spacing: -1px;
  color: #000;
  margin-bottom: rem(24);
}
</style>
