<script lang="ts" setup>
import type { User } from 'lucia';
defineProps<{
    user: User | null;
}>();
const emit = defineEmits(['openPool']);

const handleLogout = async () => {
    await $fetch('/api/logout', {
        method: 'POST',
        redirect: 'manual',
    });
    console.log('logging out!!');
    await navigateTo('/login');
};

const openPool = () => {
    emit('openPool');
};
</script>
<template>
    <header class="bg-gray-50">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="flex items-center justify-end gap-4">
                <div class="flex items-center gap-4">
                    <a
                        href="#"
                        class="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                    >
                        <span class="sr-only">Github</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 30 30"
                            class="h-6 w-6"
                        >
                            <path
                                d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
                            ></path>
                        </svg>
                    </a>
                </div>

                <span
                    aria-hidden="true"
                    class="block h-6 w-px rounded-full bg-gray-200"
                ></span>

                <a
                    href="#"
                    class="block shrink-0"
                >
                    <span class="sr-only">Profile</span>
                    <NuxtImg
                        alt="Profile Picture"
                        :src="user?.picture"
                        class="h-10 w-10 rounded-full object-cover"
                        referrerpolicy="no-referrer"
                    />
                </a>
                <span
                    aria-hidden="true"
                    class="block h-6 w-px rounded-full bg-gray-200"
                ></span>

                <form v-if="user">
                    <button
                        class="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                        @click="handleLogout"
                    >
                        <span class="sr-only">Log out</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                        </svg>
                    </button>
                </form>
            </div>

            <div class="mt-8 flex justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Welcome back, {{ user?.name }}!
                    </h1>

                    <p class="mt-1.5 text-sm text-gray-500">
                        Click 'Create pool' to get started.
                    </p>
                </div>
                <div class="mt-2">
                    <HoverBtn @open-pool="openPool" />
                </div>
            </div>
        </div>
    </header>
</template>
<style></style>
