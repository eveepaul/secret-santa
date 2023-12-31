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
        '@nuxt/image',
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
        ['@vee-validate/nuxt', {
            autoImports: true,
            componentNames: {
                Form: 'VeeForm',
                Field: 'VeeField',
                FieldArray: 'VeeFieldArray',
                ErrorMessage: 'VeeErrorMessage',
            },
        }],
        ["nuxt-lodash", {
            prefix: '_'
        }],
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
