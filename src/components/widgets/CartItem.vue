<template>
  <div class="row cart--items-wrap">
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
      <img :src="items.thumbnail" alt="cartImages" />
    </div>
    <div
      class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 cart--items-description">
      <h4>{{ items.title }}</h4>
      <div class="price">
        <span>Each Price:</span>
        ${{ items.price }}
      </div>
      <div class="item-remove" title="Cart Item Remove" @click="removeCartItem">
        <i class="fas fa-trash" />&nbsp;
        <span>Remove</span>
      </div>
    </div>
    <div
      class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 cart--items-quantity">
      <div class="items--quantity-layout">
        <h5>Quantity</h5>
        <span class="cart--items-action-btns">
          <span class="fw-bold" @click="addAndRemoveItem('DECREMENT')">-</span>&nbsp;&nbsp;
          <span>{{ items.count }}</span
          >&nbsp;&nbsp;
          <span class="fw-bold"  @click="addAndRemoveItem('INCREMENT')">+</span>
        </span>
      </div>
      <div class="total--price">
        <span class="original--price">${{ originalPrice }}</span>
        <span class="discount--price">${{ discountPrice }}</span>
      </div>
      <div class="discount">You Save {{ items.discountPercentage }}%</div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
  name: "CartItem",
  props: {
    items: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = new useStore();
    const originalPrice = computed(() => {
      return props.items.price * props.items.count;
    });

    const discountPrice = computed(() => {
      return (originalPrice.value - (originalPrice.value / 100) * props.items.discountPercentage).toFixed(2);
    });

    const removeCartItem = () => {
      store.commit('SET_CART_ITEMS', { type: 'REMOVE_CART_ITEM', id: props.items.id, userId: store.state.userDetails.id });
    }

    const addAndRemoveItem = (type) => {
      switch(type) {
        case 'INCREMENT': {
          const index = store.state.cartItems.findIndex((cItem) => cItem.id === props.items.id && cItem.userId === store.state.userDetails.id);
          if (index > -1) {
            store.commit('SET_CART_ITEMS', { type: 'INCREMENT_ITEM_COUNT', index })
          }
          break;
        }
        case 'DECREMENT': {
          const index = store.state.cartItems.findIndex((cItem) => cItem.id === props.items.id && cItem.userId === store.state.userDetails.id);
          if (index > -1) {
            store.commit('SET_CART_ITEMS', { type: 'DECREMENT_ITEM_COUNT', index })
          }
          break;
        }
      }
    }

    return {  
      originalPrice,
      discountPrice,
      removeCartItem,
      addAndRemoveItem,
    };
  },
};
</script>
<style lang="scss" scoped>
.cart--items-wrap {
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid gray;
  color: black;

  .cart--items-description {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

    h4 {
      color: rgb(52, 50, 50);
      font-weight: bold;
    }

    .price {
      span {
        font-weight: bold;
      }
    }

    .item-remove {
      color: red;
      font-size: 12px;
      margin-top: 10px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .cart--items-quantity {
    display: inline-grid;
    justify-content: center;

    .cart--items-action-btns {
      // margin-left: 15px;
      margin-top: 5px;
      padding: 3px 15px;
      font-weight: bold;
      border: 2px solid gray;
      border-radius: 5px;
      color: gray;

      span {
        cursor: pointer;
      }
    }

    .total--price {
      margin-top: 10px;
      .original--price {
        text-decoration: line-through;
        color: gray;
      }
      .discount--price {
        margin-left: 10px;
        font-weight: bold;
      }
    }
    .discount {
      color: green;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 10px;
      font-weight: bold;
    }
  }

  img {
    width: 100%;
    border: 2px solid black;
    padding: 5px;
    // box-shadow: 0px 0px 12px 0px black;
  }
}
</style>
