
<script lang="ts" setup>
import { UserInput } from '~/types/userTypes';


const props = defineProps<UserInput>();
const emits = defineEmits(['update:email', 'update:name']);
const { email, name } = useVModels(props, emits);
</script>
<template>
  <div class="px-4 pt-2 flex flex-col">
    <div class="flex justify-between gap-4">
      <UFormGroup
        class="flex-grow"
        label="Email"
      >
        <UInput
          placeholder="you@gmail.com"
          icon="i-heroicons-envelope"
          v-model="email"
          type="email"
        />
      </UFormGroup>
      <UFormGroup label="Name">
        <UInput
          placeholder="Name"
          v-model="name"
        />
      </UFormGroup>
    </div>
  </div>
</template>

<style></style>

