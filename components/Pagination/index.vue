<script setup lang="ts">
import Button from '../Button/index.vue';
import { ref } from 'vue';


const props = withDefaults(defineProps<{
    count?: number,
    activeNumber?: number,
}>(), {
    activeNumber: 1,
});

const currentNumber = ref<number>(props.activeNumber);

const emit = defineEmits<{
    (event: 'getCurentNumber', currentNumber: number): void
}>();

const handleClick = (number: number): void => {
    emit('getCurentNumber', number);
    currentNumber.value = number;
};

</script>

<template>
    <div class="pagination">
        <Button 
            :class="['pagination__button', {'pagination__button--active' : currentNumber === button}]"
            v-for="button in props.count"
            :key="button"
            @click="handleClick(button)"
        >
            {{ button }}
        </Button>
    </div>
</template>

<style scoped>
@import './scss/pagination.scss';
</style>