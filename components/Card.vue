<template>
  <div class="card">
    <div class="card__image">
      <slot name="image"></slot>
    </div>

    <div class="card__title">
      <slot name="title"></slot>
    </div>

    <div class="card__description">
      <slot name="description"></slot>
    </div>

    <slot />

    <div class="card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  padding: rem(16) rem(16) rem(22) rem(16);
}
.card__image {
  overflow: hidden;
  background: #c4c4c4;
  height: 170px;
  margin-bottom: rem(8);
}
.card__title {
  margin-bottom: rem(8);
}
.card__description {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.card__footer {
  display: flex;
  justify-content: space-between;
  padding-top: rem(8);
}
</style>
