<script lang="ts" setup>
import { UserInput } from '@/types/userTypes';
definePageMeta({
    middleware: 'protected',
});

const usersInput = ref<UserInput[]>([{
    name: '',
    email: ''
}]);

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
            <div class="my-4">
                <PoolUserInput
                    v-for="(userInput, id) in usersInput"
                    :key="id"
                    v-model:email="userInput.email"
                    v-model:name="userInput.name"
                />
            </div>
        </UModal>
    </div>
</template>

<style></style>
