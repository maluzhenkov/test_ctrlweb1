<template>
  <header class="header">
    <div class="container-fluid">
      <div class="row">
        <div class="header__logo col-1">Project.com</div>
        <div class="toolbar header__toolbar col">
          <button class="btn btn-catalog" type="button">
            <BaseIcon name="burger" view-box="0 0 16 16" />
            <span>Каталог</span>
          </button>
          <div class="toolbar__actions">
            <button class="btn" type="button" title="Избранное">
              <BaseIcon class="text-red" name="heart-fill" />
              <span v-show="favoriteAmount" class="badge">{{
                favoriteAmount
              }}</span>
            </button>
            <div class="header__cart-info">
              <button class="btn" type="button" title="Корзина">
                <BaseIcon class="text-green" name="cart" view-box="0 0 24 21" />
                <span v-show="amountProductInCart" class="badge">{{
                  amountProductInCart
                }}</span>
              </button>
              <span v-show="sumProductInCart" class="cart-sum">{{
                currency(sumProductInCart)
              }}</span>
            </div>
          </div>
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
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: rem(12);
  padding-bottom: rem(3);
  min-height: rem(56);
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
}
.header__logo {
  font-size: rem(32);
  font-weight: bold;
  line-height: 133%;
}
.header__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.toolbar__actions {
  display: flex;
  align-items: flex-start;
  padding-top: rem(6);

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
  display: flex;
  flex-direction: column;
  align-items: center;
  .cart-sum {
    line-height: 133%;
    color: #000;
  }
}
.btn-catalog {
  background-color: $black;
  padding: rem(8) rem(16);
  border-radius: rem(4);
  color: $white;

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
}
</style>
