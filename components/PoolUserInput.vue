
<script lang="ts" setup>
import type { UserInput } from '~/types/userTypes';

type Props = UserInput & {
  id: number;
};
const props = defineProps<Props>();

const email = toRef(props, 'email');
const name = toRef(props, 'name');
const emailField = useField(email, undefined, {
  initialValue: props.email,
});
const nameField = useField(name, undefined, {
  initialValue: props.name,
});
const emits = defineEmits(['removeInput']);
</script>
<template>
  <div class="px-4 pt-2 flex flex-col ml-8">
    <div class="flex justify-between gap-4">
      <UFormGroup :error="emailField.errorMessage.value">
        <UInput
          placeholder="you@gmail.com"
          icon="i-heroicons-envelope"
          type="email"
          name="email"
          :value="emailField.value.value"
          @input="emailField.handleChange"
          @blur="emailField.handleBlur"
        />
      </UFormGroup>
      <UFormGroup :error="nameField.errorMessage.value">
        <UInput
          placeholder="Name"
          type="text"
          name="name"
          :value="nameField.value.value"
          @input="nameField.handleChange"
          @blur="nameField.handleBlur"
        />
      </UFormGroup>
      <div class="flex flex-col justify-center">
        <UButton
          v-if="props.id > 2"
          :padded="false"
          color="red"
          variant="link"
          class="items-end"
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

