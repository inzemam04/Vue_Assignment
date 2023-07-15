<template>
  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 card m-4 item--card">
    <img :src="cartDetails.images[0]" class="card-img-top item--card-image" :alt="cartDetails.title">
    <div class="card-body">
      <h5 class="card-title">{{ cartDetails.brand.slice(0, 20) }}</h5>
      <p class="card-text">{{ cartDetails.title.slice(0, 30) }}</p>
      <h5 class="card-title">${{ cartDetails.price }}</h5>
      <div class="d-flex justify-content-center">
        <button v-if="!cartItems.filter((cItem) => cItem.id === cartDetails.id && cItem.userId === userDetails.id).length" class="item--cart-btn"  @click="addItemToCart(cartDetails)">
          <span>
            <i class="fas fa-cart-shopping" />Add to Cart
          </span>
        </button>
        <button class="item--cart-btn" v-else>
          <span class="fw-bold p-3" @click.stop="addAndRemoveItem('DECREMENT')">-</span>&nbsp;&nbsp;
          <span>{{ count }}</span>&nbsp;&nbsp;
          <span class="fw-bold p-3" @click.stop="addAndRemoveItem('INCREMENT')">+</span>
        </button>
        &nbsp;&nbsp;
        <button type="button" class="item--cart-btn" data-bs-toggle="modal" data-bs-target="#detailView" @click="onClickView(cartDetails.id)"><i class="fas fa-eye" />View Details</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Modal } from 'bootstrap';

export default {
  name: 'ItemCard',
  props: {
    cartDetails: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const store = new useStore();

    const userDetails = computed(() => {
      return store.state.userDetails;
    });

    const cartItems = computed(() => {
      return store.state.cartItems;
    });


    const count = computed(() => {
      const index = store.state.cartItems.findIndex((cItem) => cItem.id === props?.cartDetails?.id && cItem.userId === store.state.userDetails.id);
      if (index > -1) {
        return cartItems.value[index]?.count || 0;
      }
      return 0;
    })

    const onClickView = (id) => {
      store.dispatch('SET_DETAIL_VIEW_ID_ASYNC', id);
      const myModal = new Modal(document.getElementById('detailView'));
      myModal.show();
    };

    const addItemToCart = (item) => {
      store.commit('SET_CART_ITEMS', { type: 'ADD_NEW_ITEM', cartItem: {...item, userId: store.state.userDetails.id, count: 1} });
    }

    const addAndRemoveItem = (type) => {
      switch(type) {
        case 'INCREMENT': {
          const index = cartItems.value.findIndex((cItem) => cItem.id === props.cartDetails.id && cItem.userId === store.state.userDetails.id);
          if (index > -1) {
            store.commit('SET_CART_ITEMS', { type: 'INCREMENT_ITEM_COUNT', index })
          }
          break;
        }
        case 'DECREMENT': {
          const index = cartItems.value.findIndex((cItem) => cItem.id === props.cartDetails.id && cItem.userId === store.state.userDetails.id);
          if (index > -1) {
            store.commit('SET_CART_ITEMS', { type: 'DECREMENT_ITEM_COUNT', index })
          }
          break;
        }
      }
    }
    return {
      cartItems,
      count,
      userDetails,
      onClickView,
      addItemToCart,
      addAndRemoveItem,
    }
  }
}
</script>
<style lang="scss" scoped>

.item--card {
  height: 400px;
  width: 300px;
  border-radius: 0;
  border: 1px solid gray;
  .item--card-image {
    height: 200px;
    padding: 10px;
    margin-right: 20px;
  }
  .item--cart-btn {
    margin-top: 10px;
    border: 2px solid black;
    background-color: white;
    color: black;
    padding: 10px 10px;
    font-weight: bold;
    font-size: 12px;
    border-radius: 5px;
  }
}

</style>
