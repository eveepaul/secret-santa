<script lang="ts" setup>
import { UserInput } from '@/types/userTypes';
import { watch } from 'vue';
import { klona } from 'klona';
import { array, object, string } from 'yup';

definePageMeta({
    middleware: 'protected',
});

const initUsers = {
    users: [{
        name: '',
        email: '',
    }, {
        name: '',
        email: '',
    }, {
        name: '',
        email: '',
    }]
};

type InputObj = {
    users: UserInput[];
};
const usersInput = ref<InputObj>(klona(initUsers));


const user = useUser();
const poolIsOpen = ref(false);
const openPool = () => {
    poolIsOpen.value = true;
};

watch(poolIsOpen, (newVal) => {
    if (!newVal) {
        console.log(generateRandomStr(5));
        usersInput.value = klona(initUsers);
    }
});


const schema = object().shape({
    users: array()
        .of(
            object().shape({
                email: string().email('Invalid email').required('Required').label('Email'),
                name: string().required('Required').label('Name')
            })
        )
        .strict(),
});

useForm({
    initialValues: initUsers
});

const onSubmit = (obj: any) => {
    console.log(obj);
};

const test = (event: any) => {
    console.log(event);
};

const { fields, push, remove } = useFieldArray('users')

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
                <VeeForm
                    @submit="onSubmit"
                    @invalid-submit="test"
                    :initial-values="initUsers"
                    :validation-schema="schema"
                >
                    <fieldset
                        class="InputGroup"
                        v-for="(field, idx) in fields"
                        :key="field.key"
                    >
                        <div class="px-4 pt-2 flex flex-col ml-8">
                            <div class="flex justify-between gap-4">
                                <VeeField
                                    :id="`name_${idx}`"
                                    :name="`users[${idx}].name`"
                                    v-slot="{ field, meta }"
                                >
                                    <UFormGroup
                                        :error="!meta.valid && meta.touched">
                                        <UInput
                                            placeholder="Name"
                                            type="text"
                                            v-bind="field"
                                        />
                                    </UFormGroup>
                                </VeeField>
                                <VeeField
                                    :id="`email_${idx}`"
                                    :name="`users[${idx}].email`"
                                    v-slot="{ field, meta }"
                                >
                                    <UFormGroup
                                        :error="!meta.valid && meta.touched">
                                        <UInput
                                            placeholder="you@gmail.com"
                                            icon="i-heroicons-envelope"
                                            type="email"
                                            v-bind="field"
                                        />
                                    </UFormGroup>
                                </VeeField>
                                <div class="flex flex-col justify-center">
                                    <UButton
                                        v-if="idx > 2"
                                        :padded="false"
                                        color="red"
                                        variant="link"
                                        class="items-end"
                                        icon="i-heroicons-x-mark-20-solid"
                                        @click="remove(idx)"
                                    />
                                    <div
                                        v-else
                                        class="ml-5"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit">Submit</button>
                </VeeForm>
                <div class="flex justify-center mt-4">
                    <UButton
                        icon="i-heroicons-user-plus"
                        size="sm"
                        color="primary"
                        variant="outline"
                        label="Add more person"
                        :trailing="false"
                        @click="push({ name: '', email: '' })"
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
                        />
                    </div>
                </template>
            </UCard>
        </UModal>


    </div>
</template>

<style></style>
