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
          <select v-model="sort" class="custom-select">
            <option
              v-for="{ value, text } in sortOptions"
              :key="value"
              :value="value"
            >
              {{ text }}
            </option>
          </select>
          <ProductList :value="paginatedData" />
          <Pagination v-model="page" :length="pageCount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sortOptions } from '@/constants'

const MAX_ITEM_PER_PAGE = 15

export default {
  data() {
    return {
      page: 1,
      sort: 'ascPrice',
      sortOptions,
    }
  },
  async fetch({ store }) {
    await store.dispatch('products/getCategories')
    await store.dispatch('products/getProducts')
  },
  computed: {
    productList() {
      return this.$store.state.products.productList
    },
    sortedProductList() {
      return [...this.productList].sort((a, b) => {
        return sortOptions
          .find(({ value }) => value === this.sort)
          .handler(a, b)
      })
    },
    filtredOnCategory() {
      if (!this.selectedCategory?.id) {
        return this.sortedProductList
      }

      return this.sortedProductList.filter(
        (item) =>
          item.parent_section === this.selectedCategory?.id ||
          item.section === this.selectedCategory?.id
      )
    },
    pageCount() {
      const length = this.filtredOnCategory.length
      return length > MAX_ITEM_PER_PAGE
        ? Math.ceil(length / MAX_ITEM_PER_PAGE)
        : 1
    },
    paginatedData() {
      return this.filtredOnCategory.slice(
        (this.page - 1) * MAX_ITEM_PER_PAGE,
        this.page * MAX_ITEM_PER_PAGE
      )
    },
    categories() {
      return this.$store.state.products.categories
    },
    selectedCategory() {
      return this.$store.state.products.selectedCategory
    },
    selectedCategoryName() {
      return this.$store.state.products.selectedCategory?.name
    },
  },
  watch: {
    filtredOnCategory() {
      this.page = 1
    },
  },
}
</script>

<style lang="scss">
.main-content {
  padding-bottom: rem(48);
}
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
