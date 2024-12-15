<script setup lang="ts">

const model = defineModel<string>();

const props = withDefaults(defineProps<{
    placrholder?: string,
}>(), {
    placrholder: 'Enter',
});

</script>

<template>
    <div class="input">
        <input 
            class="input__field"
            type="text" 
            v-model="model"
            :placeholder="props.placrholder"
        />
    </div>
</template>

<style scoped>
    @import './scss/input.scss';
</style>