<script setup lang="ts">
import type { Product } from '../../types/index';

const props = withDefaults(
    defineProps<Partial<Product> & { cardStyle?: string }>(),
    {
        cardStyle: 'grid',
    }
);

</script>

<template>
    <div 
        class="card"
        :class="{'card--style--list' : props.cardStyle === 'list'}"
    >
        <div class="card__picture">
            <img 
                class="card__img" 
                v-if="props.image"
                :src="props.image"
                :alt="props.title" 
            />
        </div>
        <div class="card__content">
            <div class="card__category">{{ props.category }}</div>
            <h3 class="card__title">{{ props.title }}</h3>
            <div class="card__row">
                <div class="card__rate">Rating {{ props.rating?.rate }}</div>
                <div class="card__price">Price {{ props.price }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import './scss/card.scss';
</style>