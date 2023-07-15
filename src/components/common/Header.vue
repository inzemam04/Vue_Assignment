<template>
  <div class="row header">
  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
    <img src="../../assets/logo.png" alt="Salla-Logo" height="70" style="cursor: pointer;" @click="goToHome" /> 
  </div>
  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 search--wrap">
    <div class="search--container">
      <input v-model="searchQuery" class="search--container-input" type="text" placeholder="Search" @input="debouncedSearch" />
      <i v-if="searchQuery" class="fas fa-x header--logos search--container-cross-icon" title="Remove Search" @click="onClickCross" />
      <i class="fas fa-search header--logos search--container-icon" title="search" />
    </div>
  </div>
  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 header--logos-container">
    <div class="cart--items-container" @click="goToCart()">
      <i class="fas fa-cart-shopping header--logos" title="cart-items" /><div v-if="cartCount > 0" class="cart--items-count">{{cartCount}}</div>
    </div>
    <div class="dropdown dropdown--container" :class="{ 'show': isDropdownOpen }">
      <button class="dropdown-toggle dropdown--toggle" type="button" @click="toggleDropdown">
        {{ userDetails.firstName }} <i class="fas fa-user header--logos" title="user" />
      </button>
      <ul class="dropdown-menu dropdown--menu" :class="{ 'show': isDropdownOpen }">
        <li v-for="option in dropdownOptions" :key="option.value" @click="selectOption(option)">
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import { computed, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { debounce } from 'lodash';
import ProductService from '@/services/product.service';
import { removeItemFromLocalStorage } from '@/utils/helper';
const productService  = new ProductService();
export default {
  name: 'HeaderPage',
  setup() {
    const store = new useStore();
    const router = new useRouter();

    const isDropdownOpen = ref(false);
    const selectedOption = ref(null);
    const dropdownOptions = reactive([
      { value: 'logout', label: 'Logout' },
    ]);

    const searchQuery = ref();

    const paginationConfig = computed(() => {
      return store.state.paginationOptions;
    });


    const debouncedSearch = debounce(function() {
      try {
        getAllProducts();
      } catch (error) {
        console.log(error);
      }
    }, 500)

    const getAllProducts = async () => {
      const response = await productService.getAllProducts({  skip: (paginationConfig.value.page -  1) * 20, limit: paginationConfig.value.limit, q: searchQuery.value  });
      if (response?.data?.products?.length) {
        store.commit('SET_PRODUCTS', [...response.data.products]);
        store.commit('SET_PAGINATION_OPTIONS', { totalRecords: response?.data?.total });
        store.commit('SET_PAGINATION_OPTIONS', { q: searchQuery.value });
      } else {
        store.commit('SET_PRODUCTS', []);
        store.commit('SET_PAGINATION_OPTIONS', { totalRecords: 0 });
      }
    };

    const goToCart = () => {
      router.push({ name: 'CartItems' });
    }

    const goToHome = () => {
      router.push({ name: 'Products' });
    }

    const cartCount = computed(() => {
      return store.state.cartItems.filter((cItem) => cItem.userId === store.state.userDetails.id).length;
    });

    const userDetails = computed(() => {
      return store.state.userDetails;
    });

    onMounted(() => {
      if (store?.state?.paginationOptions?.search) {
        searchQuery.value = store?.state?.paginationOptions?.q;
      }
    })

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const selectOption = (option) => {
      if (option.value === 'logout') {
        removeItemFromLocalStorage('access-token');
        router.push({ name: 'Login' });
      }
      isDropdownOpen.value = false;
    };

    const onClickCross = () => {
      searchQuery.value = '';
      store.commit('SET_PAGINATION_OPTIONS', { q: '' });
      getAllProducts();
    }

    return {
      cartCount,
      selectedOption,
      dropdownOptions,
      toggleDropdown,
      selectOption,
      isDropdownOpen,
      userDetails,
      searchQuery,
      debouncedSearch,
      onClickCross,
      goToCart,
      goToHome,
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  background: #F5F5F5;
  height: 70px;
  position: fixed;
  z-index: 99;
  top: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  box-shadow: 0px 0px 12px 2px gray;

  .search--wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .search--container {
    position: relative;
    width: 100%;
    .search--container-input {
      width: 100%;
      border: 0px solid;
      padding: 7px 20px;
      border-radius: 30px;
      box-shadow: 0px 0px 15px -4px gray;
    }

    .search--container-cross-icon {
      position: absolute;
      right: 50px;
      cursor: pointer;
      top: 13px;
      font-size: 12px !important;
      font-weight: bold !important;
    }
    .search--container-icon {
      position: absolute;
      right: 17px;
      top: 13px;
      font-size: 15px !important;
    }
  }
  }
  

  .header--logos-container {
    display: flex;
    justify-content: end;
    align-items: center;

    .cart--items-container {
      position: relative;
      .cart--items-count {
        position: absolute;
        top: -14px;
        right: -14px;
        color: white;
        background: red;
        border-radius: 50%;
        padding: 5px 7px;
        font-size: 10px;
        font-weight: bold;
      }
    }

    .dropdown--container {
      margin-left: 25px;
      .dropdown--toggle {
        border: 0px solid !important;
        background: transparent;
        border-radius: 30px;
        box-shadow: 0px 0px 16px -4px gray;
        padding: 5px 25px;
      }
      .dropdown--menu {
        border-radius: 10px;
        margin-top: 2px;
        padding: 5px 17px;
        border: 0px solid;
        box-shadow: 0px 0px 15px -7px gray;
        font-weight: bold;
        
        li {
          cursor: pointer;
        }
      }
    }
    .header--logos {
      cursor: pointer;
      font-size: 20px;
      margin-left: 25px;
      color: #08376B;
    }
  }
}
</style>
