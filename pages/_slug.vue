<template>
    <div>
        <div v-show="!nofound" class="home-container my84">
            <div v-html="$md.render(page.content)"/>
        </div>
        <div v-show="nofound">
            <Error404/>
        </div>
    </div>
</template>
<script>
import { querySlug } from '~/graphql/querySlug'
export default {
    // layout: 'custom-page',
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
            pages : '',
            nofound : false,
            pages : [],
            page : {
                "title": "",
                "slug": "",
                "content": ""
            },
        }
    },
    apollo: {
        pages: {
            prefetch: true,
            query: querySlug,
            variables () {
                return { 
                    slug: this.$route.params.slug
                }
            },
            manual: true,
            result ({ data, loading }) {
                this.$store.commit('setOnlyNuxt', false);
                if (!loading) {
                    if (data.pages.data.length>0) {
                        this.page = data.pages.data[0].attributes
                        this.nofound=false
                        this.$store.commit('setOnlyNuxt', false);
                    } else {
                        this.nofound=true
                        this.page.title = 'Page Not Found'
                        this.$store.commit('setOnlyNuxt', true);
                        // this.$nuxt.setLayout('default')
                    }
                }
            },
        },
    },
}
</script>