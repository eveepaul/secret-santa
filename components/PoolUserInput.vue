
<script lang="ts" setup>
import type { InputObj, UserInput } from '@/types/userTypes';
import { array, object, string } from 'yup';


const { initUsers } = defineProps<{
  initUsers: InputObj;
}>();
const emits = defineEmits(['createPool']);

const toast = useToast();

const schema = object().shape({
  title: string().required().label('Title'),
  description: string().required().label('Description'),
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

const invalidSumbit = () => {
  toast.add({ title: "Invalid Input", closeButton: { icon: "" }, color: 'red' });
};
const onSubmit = (values: any) => {
  const emails = values.users?.map((user: UserInput) => user.email);
  const duplicates = checkForDuplicate(emails);
  if (duplicates.length > 0) {
    toast.add({ title: "Duplicate email entries.", closeButton: { icon: "" }, color: 'red' });
    return false;
  }
  return emits('createPool', values);
};

const submitBtn = ref<HTMLElement | null>(null);

const triggerSubmit = () => {
  submitBtn.value?.click();
};

defineExpose({
  triggerSubmit
});

const { fields, push, remove } = useFieldArray('users');
</script>
<template>
  <VeeForm
    @submit="onSubmit"
    @invalid-submit="invalidSumbit"
    :initial-values="initUsers"
    :validation-schema="schema"
  >
    <VeeField
      id="title"
      name="title"
      v-slot="{ field, meta }"
    >
      <UFormGroup :error="!meta.valid && meta.touched">
        <UInput
          placeholder="Title"
          type="text"
          class="mb-2"
          v-bind="field"
        />
      </UFormGroup>
    </VeeField>

    <VeeField
      id="description"
      name="description"
      v-slot="{ field, meta }"
    >
      <UFormGroup :error="!meta.valid && meta.touched">
        <UTextarea
          placeholder="Description"
          class="mb-2"
          v-bind="field"
        />
      </UFormGroup>
    </VeeField>

    <UDivider
      label="Members"
      :ui="{ label: 'text-primary-500 dark:text-primary-400 font-light' }"
    />
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
            <UFormGroup :error="!meta.valid && meta.touched">
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
            rules="uniqueEmail"
            v-slot="{ field, meta }"
          >
            <UFormGroup :error="!meta.valid && meta.touched">
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
    <button
      type="submit"
      ref="submitBtn"
      class="hidden"
    >Submit</button>
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
</template>
