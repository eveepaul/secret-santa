<script lang="ts" setup>
import type { InputObj } from '@/types/userTypes';
import { watch } from 'vue';
import { klona } from 'klona';
import PoolUserInput from '~/components/PoolUserInput.vue';
import PoolList from '~/components/PoolList.vue';

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
const list = ref<InstanceType<typeof PoolList> | null>(null);

const user = useUser();
const poolIsOpen = ref(false);
const openPool = () => {
    poolIsOpen.value = true;
};

const submit = () => {
    poolUserInput.value?.triggerSubmit();
};

const createPool = async (obj: any) => {
    const param = {
        owner: user.value?.userId,
        ...obj
    };
    const { data, error } = await useFetch('/api/pool', {
        method: 'POST',
        body: param
    });
    if (!error.value) {
        poolIsOpen.value = false;
        list.value?.refresh();
    }
};

watch(poolIsOpen, (newVal) => {
    if (!newVal) {
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
        <div class="lg:mt-20 mt-10 lg:mx-16 mx-10 flex justify-center">
            <PoolList
                ref="list"
                class="lg:max-w-[800px] max-w-none"
            />
        </div>
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
