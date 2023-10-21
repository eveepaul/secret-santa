<script setup lang="ts">
const user = useUser();
if (user.value) {
    // const session = await auth.getSession()
    await navigateTo('/');
}
</script>
<template>
    <section class="bg-white">
        <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside
                class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
            >
                <img
                    alt="Pattern"
                    src="~/assets/img/xmas-bg.jpeg"
                    class="absolute inset-0 h-full w-full object-cover"
                />
            </aside>

            <main
                class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
                <div class="max-w-xl lg:max-w-3xl">
                    <h1
                        class="mt-6 text-center text-2xl text-gray-900 sm:text-3xl md:text-3xl font-inter">
                        Tomigo Secret Santa
                    </h1>

                    <div class="mt-6">
                        <h2 class="sr-only">Steps</h2>

                        <div
                            class="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
                            <ol
                                class="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                                <li class="flex items-center gap-2 bg-white p-2">
                                    <span
                                        class="h-6 w-6 rounded-full bg-blue-500 text-center text-[10px]/6 font-bold text-white"
                                    >
                                        1
                                    </span>

                                    <span class="hidden sm:block"> Sign in </span>
                                </li>

                                <li class="flex items-center gap-2 bg-white p-2">
                                    <span
                                        class="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold"
                                    >
                                        2
                                    </span>

                                    <span class="hidden sm:block"> Enter name
                                    </span>
                                </li>

                                <li class="flex items-center gap-2 bg-white p-2">
                                    <span
                                        class="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold"
                                    >
                                        3
                                    </span>

                                    <span class="hidden sm:block"> Enter room
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <form
                        action="#"
                        class="mt-8 flex flex-col gap-2"
                    >
                        <a
                            class="px-4 py-2 border flex justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                            href="/api/login/google"
                        >
                            <img
                                class="w-6 h-6"
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                loading="lazy"
                                alt="google logo"
                            >
                            <span>Sign in with Google</span>
                        </a>
                    </form>
                </div>
            </main>
        </div>
    </section>
</template>
<style>
.font-inter {
    font-family: 'Inter';
}
</style>