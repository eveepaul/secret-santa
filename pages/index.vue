<script lang="ts" setup>
const user = useUser();

const handleLogout = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  await $fetch("/api/logout", {
    method: "POST",
    redirect: "manual"
  });
  await navigateTo("/login");
};
</script>
<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>

  <pre>
    {{ user.value }}
  </pre>

  <form
    v-if="!user"
    method="post"
    action="/api/logout"
    @submit.prevent="handleLogout"
  >
    <input
      type="submit"
      value="Sign out"
    />
  </form>
</template>

<style></style>
