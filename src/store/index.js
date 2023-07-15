import { createStore } from 'vuex'

export default createStore({
  state: {
    userDetails: {},
    detailViewId: null,
    products: [],
    cartItems: [],
    paginationOptions: {
      page: 1,
      limit: 20,
      totalRecords: 0,
      q: '',
    },
    promocodes: [
      {
        code: 'SAVE 5',
        discount: 5
      },
      {
        code: 'SALLA 10',
        discount: 10
      }
    ]
  },
  getters: {
    getUserDetails: state => state.userDetails,
  },
  mutations: {
    SET_USER_DETAILS(state, userDetails) {
      state.userDetails = { ...userDetails };
    },
    SET_DETAIL_VIEW_ID(state, id) {
      state.detailViewId = id;
    },
    SET_CART_ITEMS(state, data) {
      switch(data.type) {
        case "ADD_NEW_ITEM": {
          state.cartItems = [...state.cartItems, {...data.cartItem}];
          break;
        }
        case "INCREMENT_ITEM_COUNT": {
          state.cartItems[data.index].count++;
          break;
        }
        case "DECREMENT_ITEM_COUNT": {
          state.cartItems[data.index].count--;
          if (state.cartItems[data.index].count === 0) {
            state.cartItems.splice(data.index, 1);
          }
          break;
        }
        case "REMOVE_CART_ITEM": {
          const index = state.cartItems.findIndex((item) => item.id === data.id)
          if (index > -1) {
            state.cartItems.splice(data.index, 1);
          }
          break;
        }
        case "REMOVE_ALL_ITEMS_BY_USER_ID": {
          state.cartItems = [ ...state.cartItems.filter((cItem) => cItem.userId !== data.userId) ];
          break;
        }
      }
    },
    SET_PRODUCTS(state, products) {
      state.products = [ ...products ];
    },
    SET_PAGINATION_OPTIONS(state, options) {
      state.paginationOptions = { ...state.paginationOptions, ...options }
    }
  },
  actions: {
    async SET_DETAIL_VIEW_ID_ASYNC(context, id) {
      await context.commit('SET_DETAIL_VIEW_ID', id)
    }
  },
  modules: {
  }
})
