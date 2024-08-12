const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Eden Farm Indonesia',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        // SCSS file in the project
        '../assets/css/main.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        './plugins/api',
        { src: '~/plugins/aos.js', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/moment',
        '@nuxtjs/dotenv',
        '@nuxtjs/google-analytics',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://i18n.nuxtjs.org/
        '@nuxtjs/i18n',
        '@nuxtjs/apollo',
        '@nuxtjs/markdownit',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
        '@nuxtjs/google-gtag',
        'nuxt-facebook-pixel-module',
        // 'nuxt-lazy-load',
        ['nuxt-lazy-load', {
            // These are the default values
            directiveOnly: true,
        }]
    ],
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: process.env.GRAPHQL_URL,
            }
        }
    },
    facebook: {
        track: 'PageView',
        pixelId: process.env.META_PIXEL_ID,
        autoPageView: true,
        disabled: false
    },
    'google-gtag': {
        id: process.env.GOOGLE_ANALYTICS_ID,
        config: {
            anonymize_ip: true, // anonymize IP 
            send_page_view: true, // might be necessary to avoid duplicated page track on page reload
            linker: {
                domains: ['localhost:3000','rebranding.edenfarm.tech', 'edenfarm.id']
            }
        },
        debug: true, // enable to track in dev mode
        disableAutoPageTrack: true, // disable if you don't want to track each page route with router.afterEach(...).
    },
    sitemap: {
        hostname: process.env.BASE_URL,
        // shortcut notation (basic)
        i18n: true,
        // nuxt-i18n notation (advanced)
        i18n: {
            locales: ['id', 'en'],
            routesNameSeparator: '___'
        }
    },
    markdownit: {
        runtime: true, // Support `$md()` inside templates
        injected: true,
        html: true,
    },
    bootstrapVue: {
        icons: true
    },
    i18n: {
        locales: [
            {
                code: 'id',
                iso: 'id-ID'
            },
            {
                code: 'en',
                iso: 'en-US'
            },
        ],
        defaultLocale: 'id',
        detectBrowserLanguage: false
    },
    googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
    },
    publicRuntimeConfig: {
        googleAnalytics: {
            id: process.env.GOOGLE_ANALYTICS_ID
        }
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'id'
        }
    },

    router: {
        middleware: ['redirect'],
        extendRoutes: (routesIn) => {
            routesIn.forEach((r) => {
                if (r.path.includes('/custom-page/')) {
                    r.path = r.path.replace('/custom-page', '');
                }
            });
            return routesIn;
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extend(config, { isDev, isClient }) {
            if (!isDev && isClient) {
                // Minify JavaScript
                config.optimization.minimizer.push(
                    new TerserWebpackPlugin({
                        terserOptions: {
                            compress: {
                                drop_console: true
                            }
                        }
                    })
                )
                // Minify CSS
                config.optimization.minimizer.push(
                    new OptimizeCssAssetsWebpackPlugin({})
                )
            }
        }
    },
    serverMiddleware: [
        { path: '/_middleware', handler: '~/server/cacheMiddleware.js' },
    ]
}
