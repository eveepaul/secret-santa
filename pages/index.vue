<script lang="ts" setup>
import { UserInput } from '@/types/userTypes';
definePageMeta({
    middleware: 'protected',
});

const initUsers = [{
    name: '',
    email: ''
}, {
    name: '',
    email: ''
}, {
    name: '',
    email: ''
}];
const usersInput = ref<UserInput[]>(initUsers);

const user = useUser();
const poolIsOpen = ref(false);
const openPool = () => {
    poolIsOpen.value = true;
};

const addInput = () => {
    usersInput.value.push({
        name: '',
        email: ''
    });
};

const removeInput = (data: { id: number; }) => {
    usersInput.value.splice(data.id, 1);
}

</script>
<template>
    <div>
        <MainHeader
            :user="user"
            @open-pool="openPool"
        />
        <UModal v-model="poolIsOpen">
            <UCard>
                <template #header>
                    <Placeholder class="h-8" />
                </template>

                <PoolUserInput
                    v-for="(userInput, id) in usersInput"
                    :key="id"
                    :id="id"
                    v-model:email="userInput.email"
                    v-model:name="userInput.name"
                    @remove-input="removeInput"
                />
                <div class="flex justify-center mt-4">
                    <UButton
                        icon="i-heroicons-user-plus"
                        size="sm"
                        color="primary"
                        variant="outline"
                        label="Add more person"
                        :trailing="false"
                        @click="addInput"
                    />
                </div>

                <template #footer>
                    <div class="flex justify-end">

                        <UButton
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Create"
                            :trailing="false"
                            class="items-end"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<style></style>
