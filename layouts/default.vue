<template>
    <div>
        <Navbar v-show="onlyNuxt"/>
        <Nuxt />
        <Footer v-show="onlyNuxt"/>
    </div>
</template>
<script>
export default {
    mounted() {
        if (process.browser) {
            this.$gtag('config', process.env.GOOGLE_ANALYTICS_ID, {
                page_title: this.$route.name,
                page_path: this.$route.fullPath,
            })
        }
    },
    computed : {
        onlyNuxt() {
            return this.$store.state.onlyNuxt
        },
    }
}
</script>