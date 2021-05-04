<template>
  <div class="wrapper">
    <Breadcrumbs />
    <div class="category-menu">
      <TreeView :tree-data="categories" />
    </div>
    <transition name="show">
      <div v-show="isOpenMobileMenu" class="category-menu-mobile">
        <TreeView
          :tree-data="categories"
          close
          @close="isOpenMobileMenu = false"
        />
      </div>
    </transition>
    <main class="main-content">
      <h3 class="categorie-title">
        {{ selectedCategoryName ? selectedCategoryName : 'Все продукты' }}
      </h3>
      <Toolbar v-model="sort" @openMobileMenu="isOpenMobileMenu = true" />
      <ProductList :value="paginatedData" />
      <Pagination v-model="page" :length="pageCount" />
    </main>
  </div>
</template>

<script>
import { sortOptions } from '@/constants'

const MAX_ITEM_PER_PAGE = 15

export default {
  data() {
    return {
      isOpenMobileMenu: false,
      page: 1,
      sort: sortOptions[0].value,
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
      const handler = sortOptions.find(({ value }) => value === this.sort)
        .handler
      return [...this.productList].sort((a, b) => handler(a, b))
    },
    filtredOnCategory() {
      if (!this.selectedCategory?.id) {
        return this.sortedProductList
      }

      return this.sortedProductList.filter(
        (item) =>
          item.parent_section === this.selectedCategory.id ||
          item.section === this.selectedCategory.id
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
.wrapper {
  display: grid;
  grid-template-areas:
    'breadcrumbs breadcrumbs'
    'menu content';
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 5fr;
  grid-gap: rem(32);
  padding-left: rem(32);
  padding-right: rem(32);
  margin: 0 auto;
  max-width: 1440px;
  @media (max-width: $md) {
    grid-template-areas:
      'breadcrumbs'
      'content';
    grid-template-rows: auto;
    grid-template-columns: 1fr;
  }
  @media (max-width: $sm) {
    padding-left: rem(12);
    padding-right: rem(12);
  }
}
.toolbar {
  display: flex;
  .category-menu-mobile-btn {
    display: none;
    padding: rem(8);
    border: 1px solid #e6e6e6;
    border-radius: rem(4);
    margin-right: rem(32);
    @media (max-width: $md) {
      display: flex;
    }
  }
}
.main-content {
  grid-area: content;
  padding-bottom: rem(48);
}
.category-menu {
  grid-area: menu;
  flex-direction: column;
  min-width: rem(232);
  background-color: $white;
  @media (max-width: $md) {
    display: none;
  }
  .menu {
    position: sticky;
    top: rem(60);
    border: 1px solid #e6e6e6;
    border-radius: rem(8);
  }
}
.category-menu-mobile {
  z-index: 5;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: $white;
  .menu {
    border: none;
  }
  .menu__title {
    font-size: 32px;
    line-height: 125%;
  }
}
.categorie-title {
  font-weight: bold;
  font-size: rem(32);
  line-height: 125%;
  letter-spacing: -1px;
  color: #000;
  margin-bottom: rem(24);
}
.show-enter-active,
.show-leave-enter {
  transform: translateX(0);
  transition: transform 0.2s linear;
}
.show-enter,
.show-leave-to {
  transform: translateX(-100%);
}
</style>
