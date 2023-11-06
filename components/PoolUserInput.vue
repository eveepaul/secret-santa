
<script lang="ts" setup>
import { UserInput } from '~/types/userTypes';

type Props = UserInput & {
  id: number;
};
const props = defineProps<Props>();
const emits = defineEmits(['update:email', 'update:name', 'removeInput']);
const { email, name } = useVModels(props, emits);
</script>
<template>
  <div class="px-4 pt-2 flex flex-col ml-8">
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
      <div class="flex flex-col justify-center">
        <UButton
          v-if="props.id > 2"
          :padded="false"
          color="red"
          variant="link"
          class="items-end mt-5"
          icon="i-heroicons-x-mark-20-solid"
          @click="$emit('removeInput', { id })"
        />
        <div
          v-else
          class="ml-5"
        ></div>
      </div>
    </div>
  </div>
</template>

<style></style>

