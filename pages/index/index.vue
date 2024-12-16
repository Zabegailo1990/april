<script setup lang="ts">

import { useCatalogStore } from '../../stores/catalogStore';
import { ref } from 'vue';
import { useRouter } from '#app';
import Card from '../../components/Card/index.vue';
import Button from '../../components/Button/index.vue';
import Icon from '../../components/Icon/index.vue'
import Search from '../../components/Search/index.vue';
import Pagination from '../../components/Pagination/index.vue';

const store = useCatalogStore();
const viewMode = useState<'grid' | 'list'>('viewMode', () => 'grid');
const router = useRouter();

onMounted(() => store.fetchGoods());

const changeViewMode = (mode: 'grid' | 'list'): void => {
    if (typeof mode === 'string'){
        viewMode.value = mode
    }
};

const buttons: ('grid' | 'list')[] = ['list', 'grid'];

const goToProduct = (id: number): void => {
    router.push(`/product/${id}`);
};


</script>


<template>
    <div class="catalog">
        <div class="catalog__row">
            <Search 
                class="catalog__search"
                @getCurrentQuery="store.filterGoods"
            />
            <div class="catalog__mode">
                <Button 
                    :class="['catalog__button', {'catalog__button--active' : viewMode === button}]"
                    v-for="(button, index) in buttons"
                    :key="index"
                    @click="changeViewMode(button)"
                >
                    <Icon 
                        :name="button"
                        :fill="viewMode === button ? '#245bd3' : '#3A3737'"
                    />
                </Button>
            </div>
        </div>
        <div class="catalog__loading" v-if="!store.isLoading">Loading...</div>
        <div :class="['catalog__inner', {'catalog__inner--list' : viewMode === 'list'}]" v-if="store.isLoading">
            <Button
                v-for="card in store.paginatedGoods"
                :key="card.id"
                @click="goToProduct(card.id)"
            >
                <Card
                    :title="card.title"
                    :image="card.image"
                    :price="card.price"
                    :rating="card.rating"
                    :category="card.category"
                    :card-style="viewMode === 'list' ? 'list' : 'drid'"
                />
            </Button>
        </div>
        <Pagination 
            v-if="store.isLoading"
            :count="store.totalPages"
            @getCurentNumber="store.setCurrentPage"
        />
    </div>
</template>

<style scoped>
@import './scss/catalog.scss';
</style>