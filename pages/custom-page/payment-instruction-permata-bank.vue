<template>
    <div>
        <div class="home-container my84">
            <div v-html="$md.render(page.content)"/>
        </div>
    </div>
</template>
<script>
import { querySlug } from '~/graphql/querySlug'
export default {
    layout: 'custom-page',
    head() {
        return {
            title: this.page.title+' | Eden Pangan Indonesia',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.page.title+' | Eden Pangan Indonesia'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.page.title
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.page.title
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
                    content: this.page.title
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.page.title+' | Eden Pangan Indonesia'
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.page.title
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                },
            ],
        }
    },
    data() {
        return {
            pages : [],
            page : {
                "title": "",
                "slug": "",
                "content": ""
            },
        }
    },
    created() {
        this.$apollo.queries.pages.refetch()
    },
    apollo: {
        pages: {
            prefetch: true,
            query: querySlug,
            variables () {
                return { 
                    slug: 'payment-instruction-permata-bank'
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    if (data.pages.data.length>0) {
                        this.page = data.pages.data[0].attributes
                    } else {
                        try {
                            if (process.browser){
                                window.location.href = process.env.BASE_URL+'/404'
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            },
        },
    },
}
</script>