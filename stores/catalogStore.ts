import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '../types/index';
import axios from 'axios';

export const useCatalogStore = defineStore('catalog', () => {
    const BASE_URL = 'https://fakestoreapi.com/products/';
    const goods = ref<Product[]>([]);
    const filteredGoods = ref<Product[]>([]);
    const currentPage = ref<number>(1);
    const goodsPerPage = ref<number>(10);
    const isLoading = ref<boolean>(false);

    // Получение данных
    const fetchGoods = async (): Promise<void> => {
        isLoading.value = false;
        try {
            const { data } = await axios.get<Product[]>(BASE_URL);
            goods.value = data;
            filteredGoods.value = goods.value;
            isLoading.value = true;
        } catch (error) {
            console.error('Ошибка при получении данных ', error);
        }
    };

    // Поиск
    const filterGoods = (query: string): void => {
        const lowerQuery = query.toLowerCase();

        const matchesQuery = (value: string | number | object): boolean => {
            if (typeof value === 'string' || typeof value === 'number') {
                return value.toString().toLowerCase().includes(lowerQuery);
            }
            if (typeof value === 'object' && value !== null) {
                return Object.values(value).some(nestedValue => matchesQuery(nestedValue));
            }
            return false;
        };

        filteredGoods.value = goods.value.filter(item => Object.values(item).some(value => matchesQuery(value)));
    };

    // Пагинация
    const paginatedGoods = computed<Product[]>(() => {
        const start = (currentPage.value - 1) * goodsPerPage.value;
        return filteredGoods.value.slice(start, start + goodsPerPage.value);
    });

    const totalPages = computed<number>(() => {
        return Math.ceil(filteredGoods.value.length / goodsPerPage.value);
    });

    const setCurrentPage = (page: number): void => {
        currentPage.value = page;
    };

    return {
        fetchGoods,
        isLoading,
        goods,
        filteredGoods,
        currentPage,
        goodsPerPage,
        paginatedGoods,
        totalPages,
        filterGoods,
        setCurrentPage
    };
});
