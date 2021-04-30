<template>
  <div class="product-list">
    <Card
      v-for="product in filtredOnCategory"
      :key="product.id"
      class="product-card"
    >
      <div v-show="product.discount" class="product-card__discount">
        -{{ product.discount }}%
      </div>
      <template #image>
        <img
          class="product-card__photo"
          :src="product.photo"
          :alt="product.name"
        />
      </template>
      <template #title>
        <span class="product-card__title">{{ product.name }}</span>
      </template>
      <template #description>
        <div class="product-card__weigth">
          {{ unit(product.weight) }}
        </div>
        <div class="product-card__price">
          {{ currency(product.price) }}
        </div>
        <div class="product-card__quantity">
          {{ quantity(product.quantity) }}
        </div>
      </template>
      <template #footer>
        <button
          type="button"
          class="btn product-card__btn-cart"
          :class="{ 'product-card__btn-cart--in-cart': product['on_sale'] }"
          @click="updateCart(product)"
        >
          <BaseIcon
            v-show="product['on_sale']"
            name="check"
            view-box="0 0 13 10"
          />
          {{ product['on_sale'] ? 'В корзине' : 'В корзину' }}
        </button>
        <button
          type="button"
          class="btn product-card__btn-favorite"
          @click="updateFavorite(product.id)"
        >
          <BaseIcon
            v-if="product.favorite"
            key="heart-fill"
            name="heart-fill"
          />
          <BaseIcon v-else key="heart-empty" name="heart-empty" />
        </button>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { currency, unit } from '@/utils/NumberFormating'
import { sortOptions } from '@/constants'

export default {
  props: {
    sort: {
      type: String,
      validation: (prop) => sortOptions.some(({ value }) => value === prop),
      default: sortOptions[0].value,
    },
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
    selectedCategory() {
      return this.$store.state.products.selectedCategory
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
  },
  methods: {
    ...mapMutations({
      updateFavorite: 'products/UPDATE_FAVORITE',
    }),
    ...mapActions({
      updateCart: 'cart/updateCart',
    }),
    quantity(num) {
      if (num > 0 && num < 50) {
        return 'Мало •'
      } else if (num > 50 && num < 100) {
        return 'Средне ••'
      } else if (num > 100) {
        return 'Много •••'
      }
      return 'Нет в наличии'
    },
    currency,
    unit,
  },
}
</script>

<style lang="scss">
.product-list {
  display: flex;
  flex-wrap: wrap;
  margin-right: rem(-32);
  margin-top: 2rem;
  margin-top: rem(24);
}
.product-card {
  flex: 0 0 rem(200);
  margin-right: rem(32);
  margin-bottom: rem(24);
}
.product-card__photo {
  height: 100%;
  object-fit: cover;
}
.product-card__discount {
  position: absolute;
  top: 0;
  right: 0;
  background-color: $black;
  padding: rem(8) rem(16);
  text-align: right;
  color: $white;
  font-weight: bold;
  line-height: 133%;
  border-bottom-left-radius: rem(20);
}
.product-card__weigth {
  font-weight: 500;
  font-size: rem(10);
  line-height: 160%;
  color: $black-40;
  margin-bottom: rem(8);
}
.product-card__price {
  font-weight: bold;
  font-size: rem(18);
  line-height: 133%;
  color: $black-50;
  margin-bottom: rem(8);
}
.product-card__quantity {
  font-weight: 500;
  font-size: rem(10);
  line-height: 160%;
  color: $black-40;
  margin-bottom: rem(8);
}
.product-card__btn-cart {
  background-color: $black;
  color: #fafffa;
  border-radius: rem(4);
  padding: rem(4) rem(6);
  &:focus {
    outline: 2px solid orange;
  }
  &:hover {
    background-color: lighten($black, 35%);
  }
}
.product-card__btn-cart--in-cart {
  background-color: $green;

  .icon {
    width: rem(12);
    margin-right: rem(5);
  }

  &:hover {
    background-color: lighten($green, 15%);
  }
}
.product-card__btn-favorite {
  &:hover > .icon {
    transform: scale(1.1);
  }
}
</style>
