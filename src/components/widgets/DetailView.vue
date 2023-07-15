<template #slides>
  <div class="modal fade" ref="myModal" id="detailView" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">View Details</h5>
          <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
        </div>
        <div class="modal-body">
          <Carousel :autoplay="2000" :wrap-around="true">
            <Slide v-for="(slide, index) in itemDetails.images" :key="`${slide}-${index}`">
              <div class="carousel__item"><img class="carousel__item-image" :src="slide" alt="img" /></div>
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
          <table>
            <tbody>
              <tr v-for="(item, index) in Object.keys(itemDetails).filter((i) => !['images', 'thumbnail'].includes(i))" :key="`${item}-${index}`">
                <td class="ps-5 pe-3"><b>{{ item.slice(0, 1).toUpperCase() + item.slice(1) }}:</b></td>
                <td class="pe-5">{{ itemDetails[item] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import ProductService from '@/services/product.service';
const productService = new ProductService();

export default defineComponent({
  name: 'ItemCard',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  setup () {
    const store = useStore();
    const itemDetails = ref({});

    onMounted(() => {
      document.getElementById('detailView').addEventListener('show.bs.modal', () => {
        if (store.state.detailViewId) {
          getProductDetailsById();
        }
      });
      document.getElementById('detailView').addEventListener('hide.bs.modal', () => {
        store.commit('SET_DETAIL_VIEW_ID', null);  
      });
    });

    const getProductDetailsById = async () => {
      try {
        const response = await productService.getProductDetailsById(store.state.detailViewId);
        if (response) {
          itemDetails.value = { ...response.data };
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      itemDetails,
    };
  }
});
</script>

<style lang="scss" scoped>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: transparent;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  .carousel__item-image {
    width: 50%;
    height: 200px;
  }
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
