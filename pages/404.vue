<template>
    <div>
        <Error404/>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: 'Page Not Found | Eden Pangan Indonesia',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: 'Page Not Found | Eden Pangan Indonesia'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Page Not Found'
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'Page Not Found, 404'
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: 'Page Not Found'
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: 'Page Not Found | Eden Pangan Indonesia'
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: 'Page Not Found'
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                },
            ],
        }
    }
}
</script>