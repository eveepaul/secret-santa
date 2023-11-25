<script lang="ts" setup>
import type { UserPoolResponse } from '~/types/responseTypes';


const { pending, data: results, refresh } = await useFetch<UserPoolResponse>("/api/pool");

const userPools = computed(() => results.value?.pools || []);

defineExpose({
  refresh
});
</script>

<template>
  <div
    v-if="!pending"
    class="w-full"
  >
    <div
      v-for="(pool, index) in userPools"
      :key="index"
    >
      <article class="rounded-lg border border-gray-100 bg-white p-6 mb-2">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ pool.code }}</p>
            <p class="text-2xl font-medium text-gray-900">{{ pool.title }}</p>
          </div>

          <span
            class="rounded-full bg-green-100 p-3 text-green-600 cursor-pointer hover:bg-green-200"
          >
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>



          </span>
        </div>

        <div class="mt-1 flex gap-1 text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <p class="flex gap-2 text-xs overflow-hidden">
            <span class="text-gray-500"> {{ pool.description }}
            </span>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
