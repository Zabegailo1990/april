<script setup lang="ts">
import Button from '../../components/Button/index.vue';
</script>

<template>
    <div class="default-layout">
        <header class="default-layout__header">
            <div class="default-layout__container">
                <Button :to="'/'">Go back</Button>
            </div>
        </header>
        <main class="default-layout__main">
            <div class="default-layout__container">
                <NuxtPage/>
            </div>
        </main>
    </div>
</template>

<style scoped>
@import './scss/default-layout.scss';
</style>