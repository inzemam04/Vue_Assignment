import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/auth/Login.vue';
import SignUpPage from '../components/auth/Signup.vue';
import ForgetPasswordPage from '../components/auth/ForgetPassword.vue';
import HomePage from '../components/home/Home.vue';
import ProductsPage from '../components/products/Product.vue';
import CartPage from '../components/products/Cart.vue';
import PageNotFound from '@/components/widgets/PageNotFound.vue';
import CheckOutPage from '@/components/widgets/CheckOut.vue';
import { getDetailsFromLocalStorage } from '@/utils/helper';

export function isAuthenticated() {
  const accessToken = getDetailsFromLocalStorage('access-token');
  return !!accessToken;
}

export function requireAuth(to, from, next) {
  if (!isAuthenticated() && to.name !== 'Login') {
    next('/login');
  } else if (to.name === 'Login' && isAuthenticated()) {
    next(from.fullPath);
  } else {
    next();
  }
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter: requireAuth,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUpPage,
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPasswordPage,
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    beforeEnter: requireAuth,
    children: [
      {
        path: '/',
        name: 'Products',
        component: ProductsPage,
        beforeEnter: requireAuth,
      },
      {
        path: '/cart-items',
        name: 'CartItems',
        component: CartPage,
        beforeEnter: requireAuth,
      },
      {
        path: 'checkout-page',
        name: 'CheckOut',
        component: CheckOutPage,
        beforeEnter: requireAuth,
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    component: PageNotFound,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
