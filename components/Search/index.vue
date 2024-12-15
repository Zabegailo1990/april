<script setup lang="ts">
import Input from '../Input/index.vue';
import Button from '../Button/index.vue';
import Icon from '../Icon/index.vue';
import { ref } from 'vue';

const currentQuery = ref<string>('');
const isActive = ref<boolean>(false);

const emit = defineEmits<{
    (event: 'getCurrentQuery', currentQuery: string): void;
}>();

const handleClick = (): void => {
    emit('getCurrentQuery', currentQuery.value);
    currentQuery.value = '';
};


</script>

<template>
    <div 
        :class="['search', {'search--active': isActive}]"
        @focusin="isActive = true"
        @focusout="isActive = false"
    >
            <Input
                class="search__input"
                v-model="currentQuery"
            />
            <Button
                class="search__button"
                @click="handleClick"
            >
                <Icon :name="'search'"/>
            </Button>
    </div>
</template>

<style scoped>
@import './scss/search.scss';
</style>