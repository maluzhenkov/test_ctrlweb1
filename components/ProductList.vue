<template>
  <transition-group
    tag="div"
    type="transition"
    name="flip-list"
    class="product-list"
  >
    <Card v-for="product in value" :key="product.id" class="product-card">
      <div v-show="product.discount" class="product-card__discount">
        -{{ product.discount }}%
      </div>
      <template #image>
        <img
          v-lazy="product.photo"
          class="product-card__photo"
          :alt="product.name"
        />
        <span class="loader"></span>
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
  </transition-group>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { currency, unit } from '@/utils/NumberFormating'

export default {
  props: {
    value: {
      type: Array,
      required: true,
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
.flip-list-move {
  transition: transform 0.5s;
}
.flip-list-leave-active {
  transition: 0s;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-column-gap: rem(32);
  grid-row-gap: rem(24);
  width: 100%;
  margin-top: rem(24);
  @media (max-width: $md) {
    grid-column-gap: rem(24);
    grid-row-gap: rem(16);
  }
  @media (max-width: $sm) {
    grid-gap: rem(4);
  }
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
