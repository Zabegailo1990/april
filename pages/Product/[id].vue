<script setup lang="ts">

import { useCatalogStore } from '../../stores/catalogStore';
import type { Product } from '../../types/index';
import { useRoute } from '#app';
import { ref, onMounted } from 'vue';

const route = useRoute();
const store = useCatalogStore();
const product = ref<Product | null>(null);

onMounted(async () => {
    const productId = Number(route.params.id);
    if (!store.goods.length) await store.fetchGoods();
    product.value = store.goods.find(item => item.id === productId) || null;
});

</script>

<template>
    <div class="product">
        <div class="product__inner">
            <div class="product__id">ID {{ product?.id }}</div>
            <div class="product__picture">
                <img :src="product?.image" class="product__img">
            </div>
            <div class="product__category">{{ product?.category }}</div>
            <h2 class="product__title">{{ product?.title }}</h2>
            <p class="product__description">{{ product?.description }}</p>
            <div class="product__detail">
                <div class="product__label">Rating:</div>
                <div class="product__count">{{ product?.rating?.rate }}</div>
            </div>
            <div class="product__detail">
                <div class="product__label">Price:</div>
                <div class="product__count">{{ product?.price }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import './scss/product.scss';
</style>
