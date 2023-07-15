<template>
  <div class="row cart-items">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center pt-3">
      <h2>
        <i class="fas fa-bag-shopping" /> My Cart Items
      </h2>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 cart--items-container">
      <div v-if="cartItems.length" class="row">
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 cart--items-container-inner">
          <template v-for="item in cartItems" :key="item.id">
            <cart-item :items="item" />
          </template>
        </div>
        <final-payment />
      </div>
      <cart-empty v-else />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import CartItem from '../widgets/CartItem.vue';
import FinalPayment from '../widgets/FinalPayment.vue';
import CartEmpty from '../widgets/CartEmpty.vue';

export default {
  components: { CartItem, FinalPayment, CartEmpty },
  name: 'CartPage',
  setup() {
    const store = new useStore();

    const cartItems = computed(() => {
      return store.state.cartItems.filter((cItem) => cItem.userId === store.state.userDetails.id);
    });

    return {
      cartItems,
    }
  }
}
</script>
<style lang="scss" scoped>
.cart-items {
  margin: 0;
  padding: 0;
  margin-top: 70px;
  color: #08376B;

  .cart--items-container {
    padding: 50px;

    .cart--items-container-inner {
      padding: 20px 40px;
      box-shadow: 0px 0px 12px -4px gray;
      border-radius: 10px;
    }

  }
}
</style>
