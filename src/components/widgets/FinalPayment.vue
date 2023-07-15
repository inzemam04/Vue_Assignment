<template>
  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
    <div class="row cart--items-total">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <h5>The total amount of</h5>
      </div>
      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-2">
        <span>Temporary Amount</span>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-2 d-flex justify-content-end">
        <span class="fw-bold">${{ temporaryAmount }}</span>
      </div>
      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-2">
        <span>Shipping Cost</span>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-2 d-flex justify-content-end">
        <span  class="fw-bold">${{ shippingCost }}</span>
      </div>
      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-2">
        <span>Tax Percentage</span>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-2 d-flex justify-content-end">
        <span  class="fw-bold">{{ taxPercentage }}%</span>
      </div>
      <hr class="mt-3">
      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
        <h6>The total amount of (including TAX) </h6>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-2 d-flex justify-content-end">
        <span class="fw-bold">${{ totalAmountWithTaxes }}</span>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 cart--item-checkout-btn">
        <button @click="goToCheckoutPage">GO TO CHECKOUT →</button>
      </div>
    </div>
    <div class="row cart--item-promocode">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
        <h5 class="fw-bold">Apply promo code</h5>
      </div>
      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
        <input v-model="promocode" type="text" placeholder="Promo Code" :disabled="!!pMessage && !['Invalid promo code'].includes(pMessage)" />
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
        <button :class="!!pMessage && !['Invalid promo code'].includes(pMessage) ? 'text-success' : ''" @click="applyPromocode">
          {{ pMessage && !['Invalid promo code'].includes(pMessage) ? 'APPLIED' : 'APPLY'}}
          <i v-if="pMessage && !['Invalid promo code'].includes(pMessage)" class="fas fa-trash text-danger ms-2" title="Remove Promo Code" @click.stop="removePromoCode" />
        </button>
      </div>
      <div v-if="pMessage" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
        <span :class="['Invalid promo code'].includes(pMessage) ? 'text-danger' : 'text-success'">{{ pMessage }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { computed, ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FinalPaymentPage',
  setup() {
    const store = new useStore();
    const router = new useRouter()
    const shippingCost = ref(100);
    const taxPercentage = ref(5);
    const promocode = ref('');
    const totalAmount = ref(0);
    const promoCodeDiscount = ref(0);
    const pMessage = ref('');

    const temporaryAmount = computed(() => {
      return store.state.cartItems.reduce((acc, cValue) => {
        const originalAmount = cValue.count * cValue.price;
        return acc + originalAmount - ((originalAmount / 100) * cValue.discountPercentage);
      }, 0).toFixed(2)
    });

    const totalAmountWithTaxes = computed(() => {
      const originalAmount = (temporaryAmount.value - ((temporaryAmount.value / 100) * taxPercentage.value) + shippingCost.value).toFixed(2);
      return (originalAmount - (originalAmount/100) * promoCodeDiscount.value).toFixed(2);
    })

    const applyPromocode = () => {
      const findPromocode = store.state.promocodes.find((p) => p.code === promocode.value);
      if (findPromocode && Object.keys(findPromocode)?.length) {
        totalAmount.value = totalAmount.value - ((totalAmount.value/100) * findPromocode.discount);
        promoCodeDiscount.value = findPromocode.discount;
        pMessage.value = `You saved ${findPromocode.discount}% on original price`;
      } else {
        promoCodeDiscount.value = 0;
        pMessage.value = 'Invalid promo code'
      }
    };

    const goToCheckoutPage = () => {
      store.commit('SET_CART_ITEMS', { type: 'REMOVE_ALL_ITEMS_BY_USER_ID', userId: store.state.userDetails.id })
      router.push({ name: 'CheckOut' });
    }

    const removePromoCode = () => {
      pMessage.value = '';
      promoCodeDiscount.value = 0;
      promocode.value = '';
    };

    return {
      temporaryAmount,
      shippingCost,
      taxPercentage,
      totalAmountWithTaxes,
      promocode,
      applyPromocode,
      totalAmount,
      removePromoCode,
      pMessage,
      goToCheckoutPage,
    }
  },
})
</script>
<style lang="scss" scoped>
.cart--items-total {
      padding: 20px;
      margin-left: 10px;
      box-shadow: 0px 0px 8px -3px gray;
      border-radius: 10px;
      color: black;

      .cart--item-checkout-btn button {
        width: 100%;
        padding: 5px 15px;
        text-align: center;
        color: white;
        border-radius: 10px;
        background: rgb(25, 25, 192);
        font-weight: bold;
        border: unset;
        margin: 10px 0px;
      }
    }

    .cart--item-promocode {
      padding: 20px;
      margin-top: 15px;
      box-shadow: 0px 0px 12px -4px gray;
      border-radius: 10px;
      margin-left: 13px;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        padding: 6px 13px;
        border-radius: 5px;
        border: 1px solid gray;
      }

      button {
        color: blue;
        font-weight: bold;
        cursor: pointer;
        border: 0;
        background: transparent;
      }
    }
</style>
