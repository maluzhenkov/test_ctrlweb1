<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__logo">Project.com</div>
      <button class="btn btn-catalog" type="button">
        <BaseIcon name="burger" view-box="0 0 16 16" />
        <span>Каталог</span>
      </button>
      <div class="header__actions">
        <button class="btn" type="button" title="Избранное">
          <BaseIcon class="text-red" name="heart-fill" />
          <span v-show="favoriteAmount" class="badge">{{
            favoriteAmount
          }}</span>
        </button>
        <div class="header__cart-info">
          <button class="btn" type="button" title="Корзина">
            <BaseIcon class="text-green" name="cart" view-box="0 0 24 21" />
            <span v-show="amountProductInCart" class="badge">
              {{ amountProductInCart }}
            </span>
          </button>
          <span v-show="sumProductInCart" class="cart-sum">
            {{ currency(sumProductInCart) }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { currency } from '@/utils/NumberFormating'

export default {
  computed: {
    ...mapGetters({
      favoriteAmount: 'products/favoriteAmount',
      amountProductInCart: 'cart/getAmountProductInCart',
      sumProductInCart: 'cart/getSumProductInCart',
    }),
  },
  methods: {
    currency,
  },
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 2;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: rem(56);
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  @media (max-width: $md) {
    position: static;
  }
}
.header__inner {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-gap: rem(32);
  padding-left: rem(32);
  padding-right: rem(32);
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  align-items: center;
  @media (max-width: $sm) {
    padding-left: rem(12);
    padding-right: rem(12);
  }
}
.header__logo {
  display: flex;
  align-items: center;
  font-size: rem(32);
  font-weight: bold;
  line-height: 133%;
  width: 230px;
  @media (max-width: $sm) {
    width: auto;
    font-size: rem(16);
    order: 2;
  }
}
.header__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__actions {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  @media (max-width: $sm) {
    order: 3;
  }

  & > *:not(:last-child) {
    margin-right: rem(40);
  }

  .badge {
    position: absolute;
    top: -50%;
    left: 50%;
    padding: 0 rem(4);
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    border-radius: rem(20);
    font-weight: bold;
    font-size: rem(10);
    line-height: 160%;
    color: #000;
  }
}
.header__cart-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .cart-sum {
    white-space: nowrap;
    position: absolute;
    top: 100%;
    right: -60%;
    line-height: 133%;
    color: #000;
  }
}
.btn-catalog {
  background-color: $black;
  padding: rem(8) rem(16);
  border-radius: rem(4);
  color: $white;
  width: min-content;

  .icon {
    width: rem(12);
    margin-right: rem(5);
  }
  &:focus {
    outline: 2px solid orange;
  }
  &:hover {
    background-color: lighten($black, 35%);
  }

  @media (max-width: $sm) {
    background-color: transparent;
    color: $black;
    order: 1;
    .icon {
      margin-right: 0;
    }
    &:hover {
      background-color: darken($white, 15%);
    }
    span {
      display: none;
    }
  }
}
</style>
