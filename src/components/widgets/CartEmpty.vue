<template>
  <div class="row"  style="height: 50vh;">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-dark">
      <div class="d-flex justify-content-center align-items-center">
        <i class="fas fa fa-cart-shopping" style="font-size: 100px; margin-right: 20px;" />
        <h1>YOUR SHOPPING CART IS EMPTY</h1>
      </div>
      <div class="d-flex justify-content-center align-items-center mt-3">
        <button class="btn btn-success" @click="goToShop">
          <i class="fas fa fa-cart-shopping" />
          RETURN TO SHOP
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
  name: 'CartEmpty',
  setup() {
    const router = new useRouter();
    const goToShop = () => {
      router.push({ name: 'Products' });
    }
    return {
      goToShop,
    }
  }
}
</script>