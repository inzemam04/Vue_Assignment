<template>
  <div>
    <div class="row product">
      <template v-for="item in items" :key="item.id">
        <item-card :cartDetails="item" />
      </template>
    </div>
    <div class="row pagination--container">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-end">
        <pagination v-model="paginationConfig.page" :records="paginationConfig.totalRecords" :per-page="paginationConfig.limit" @paginate="onPaginationChange"/>
        <detail-view />
      </div>
    </div>
    <loading v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
  </div>
  
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Pagination from 'v-pagination-3';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import ItemCard from '../widgets/ItemCard.vue';
import DetailView from '../widgets/DetailView.vue';
import ProductService from '@/services/product.service';
const productService = new ProductService();

export default {
  name: 'ProductsPage',
  components: {
    ItemCard,
    Pagination,
    DetailView,
    Loading,
  },
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    

    const items = computed(() => {
      return store.state.products;
    });

    const paginationConfig = computed(() => {
      return store.state.paginationOptions;
    });

    onMounted(() => {
      getAllProducts();
    })

    // Methods

    const onPaginationChange = (page) => {
      store.commit('SET_PAGINATION_OPTIONS', { page });
      getAllProducts();
    }

    const getAllProducts = async () => {
      try {
        isLoading.value = true;
        const response = await productService.getAllProducts({  skip: (paginationConfig.value.page -  1) * 20, limit: paginationConfig.value.limit, q: paginationConfig.value.q  });
        if (response?.data?.products?.length) {
          store.commit('SET_PRODUCTS', [...response.data.products]);
          isLoading.value = false;
          store.commit('SET_PAGINATION_OPTIONS', { totalRecords: response?.data?.total });
        } else {
          store.commit('SET_PRODUCTS', []);
          isLoading.value = false;
          store.commit('SET_PAGINATION_OPTIONS', { totalRecords: 0 });
        }
      } catch (error) {
        isLoading.value = false;
        console.log(error);
      }
    }

    return {
      getAllProducts,
      items,
      paginationConfig,
      onPaginationChange,
      isLoading,
    };
  }
}
</script>
<style lang="scss" scoped>
.product {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  margin-top: 70px;
  padding-bottom: 50px;
}
.pagination--container {
  margin: 0;
  padding: 0 75px;
  padding-bottom: 20px;
}
</style>
