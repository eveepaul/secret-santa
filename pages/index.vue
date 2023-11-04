<script lang="ts" setup>
definePageMeta({
    middleware: 'protected',
});

const user = useUser();
const poolIsOpen = ref(false);
const openPool = () => {
    poolIsOpen.value = true;
};
</script>
<template>
    <div>
        <MainHeader
            :user="user"
            @open-pool="openPool"
        />
        <UModal v-model="poolIsOpen">
            <PoolUserInput />
        </UModal>
    </div>
</template>

<style></style>
