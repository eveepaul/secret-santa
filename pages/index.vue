<script lang="ts" setup>
definePageMeta({
    middleware: 'protected',
});

const user = useUser();
</script>
<template>
    <MainHeader :user="user" />
</template>

<style></style>
