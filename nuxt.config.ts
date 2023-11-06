// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    css: ['~/assets/css/tailwind.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: [
        '@nuxt/ui',
        '@vueuse/nuxt',
        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    Roboto: true,
                    Inter: [400, 700],
                    'Josefin+Sans': true,
                    Lato: [100, 300],
                    Raleway: {
                        wght: [100, 400],
                        ital: [100],
                    },
                },
            },
        ],
        '@nuxt/image',
    ],
    runtimeConfig: {
        googleClientId: '',
        googleClientSecret: '',
        googleRedirectUri: '',
        pgConnectionString: '',
    },
    nitro: {
        moduleSideEffects: ['lucia/polyfill/node'],
    },
    colorMode: {
        preference: 'light',
    },
});
