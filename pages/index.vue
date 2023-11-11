<script lang="ts" setup>
import { UserInput } from '@/types/userTypes';
import { watch } from 'vue';
import { klona } from 'klona';
import { array, object, string, type InferType } from 'yup';
import type { FormError } from '#ui/types';

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
const usersInput = ref<UserInput[]>(klona(initUsers));



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
};

watch(poolIsOpen, (newVal) => {
    if (!newVal) {
        console.log(generateRandomStr(5));
        usersInput.value = klona(initUsers);
    }
});

// validation 

const schema = array(
    object({
        email: string().email('Invalid email').required('Required'),
        name: string().required('Required')
    })
);
type Schema = InferType<typeof schema>;

const form = ref();

// const validate = (): FormError[] => {
//     return form.value.getErrors();
// };

const call = async () => {
    // console.log('call!');
    await form.value.validate();
};



</script>
<template>
    <div>
        <MainHeader
            :user="user"
            @open-pool="openPool"
        />
        <UModal
            v-model="poolIsOpen"
            prevent-close
        >
            <UCard>
                <UForm
                    :schema="schema"
                    :state="usersInput"
                    :validate-on="['change']"
                    ref="form"
                >
                    <PoolUserInput
                        v-for="(userInput, id) in usersInput"
                        :key="id"
                        :id="id"
                        v-model:email="userInput.email"
                        v-model:name="userInput.name"
                        @remove-input="removeInput"
                    />
                </UForm>
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
                    <div class="flex justify-end gap-3">
                        <UButton
                            size="sm"
                            color="white"
                            variant="solid"
                            label="Close"
                            class="items-end"
                            @click="poolIsOpen = false"
                        />
                        <UButton
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Create"
                            :trailing="false"
                            class="items-end"
                            @click="call"
                        />

                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<style></style>
