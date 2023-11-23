<script lang="ts" setup>
import type { InputObj } from '@/types/userTypes';
import { watch } from 'vue';
import { klona } from 'klona';
import PoolUserInput from '~/components/PoolUserInput.vue';

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

const usersInput = ref<InputObj>(klona(initUsers));

const poolUserInput = ref<InstanceType<typeof PoolUserInput> | null>(null);

const user = useUser();
const poolIsOpen = ref(false);
const openPool = () => {
    poolIsOpen.value = true;
};

const submit = () => {
    poolUserInput.value?.triggerSubmit();
};

const createPool = (obj: any) => {
    console.log(obj);
};

watch(poolIsOpen, (newVal) => {
    if (!newVal) {
        console.log(generateRandomStr(5));
        usersInput.value = klona(initUsers);
    }
});

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
                <PoolUserInput
                    :init-users="initUsers"
                    ref="poolUserInput"
                    @create-pool="createPool"
                />

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
                            @click="submit"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<style></style>
