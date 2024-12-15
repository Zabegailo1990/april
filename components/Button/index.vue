<script setup lang="ts">
import { computed } from 'vue';
import { NuxtLink } from '#components';

const props = defineProps<{
    to?: string,
}>();

const tag = computed<'button' | typeof NuxtLink>(() => props.to ? NuxtLink : 'button');

</script>

<template>
    <component 
        :is="tag" 
        class="button"
        v-bind="props.to && { to: props.to }"
    >
        <slot></slot>
    </component>
</template>

<style scoped>
@import './scss/button.scss';
</style>