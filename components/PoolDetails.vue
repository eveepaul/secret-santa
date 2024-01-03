<script lang="ts" setup>
import type { SelectPoolAndMembers } from '~/types/responseTypes';

const emit = defineEmits(['backToList']);

const { pool } = defineProps<{
  pool: SelectPoolAndMembers;
}>();

</script>
<template>
  <main class="rounded-lg border border-gray-100 bg-white p-6 mb-2 w-full">
    <section class="flex justify-between">
      <button
        @click="emit('backToList')"
        class="hover:border-b-2 hover:mb-0 border-slate-600 mb-[2px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 inline-block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
        Back
      </button>
      <button>
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>

      </button>
    </section>
    <section class="mt-5 flex">
      <div>
        <p class="text-lg">{{ pool.title }}</p>
        <p>{{ pool.description }}</p>
        <p>{{ pool.code }}</p>
      </div>
      <div class="flex-auto flex flex-col justify-center items-center">
        Members
        <div
          v-for="({ member }) in pool.members"
          :key="member.id"
        >
          <input
            type="text"
            name="name"
            id="name"
            :value="member.name"
            readonly
          >
          <input
            type="text"
            name="email"
            id="email"
            :value="member.email"
            readonly
          >
        </div>
      </div>
    </section>
  </main>
</template>
<style></style>
