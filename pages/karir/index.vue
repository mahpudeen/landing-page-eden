<template>
    <div :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop?'mt-offset':'hiddenx'">
        <iframe 
            src="https://career.edenfarm.id/jobs" 
            style="display: block;width: 100vw;height:768px" 
            frameborder="0"
        >Your browser doesnot support iframes</iframe>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: 'Karir | Eden Pangan Indonesia',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: 'Karir | Eden Pangan Indonesia'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Jadilah bagian dari EdenFarm. Temukan kesempatan karir yang menarik dan berkontribusi dalam memajukan pertanian berkelanjutan. #JoinEdenFarm'
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'Karir Edenfarm, Career Edenfarm, Career'
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
                    content: 'Karir'
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: 'Karir | Eden Pangan Indonesia'
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: 'Karir'
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                },
            ],
        }
    },
}
</script>