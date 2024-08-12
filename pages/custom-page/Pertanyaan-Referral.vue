<template>
    <div>
        <div class="home-container my22 OpenSans">
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
                    slug: 'Pertanyaan-Referral'
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
<style>
    hr{
        border: 0.5px solid #EBEBEB;
        margin: -5px 0px 5px 0px;
    }
    #faq .header {
        color: #8DB53F;
        text-align: left;
        padding: 10px 15px 10px 15px;
        text-transform: none;
        display: block;
        margin: 0px 10px 0px 0px;
        cursor: pointer;
        transition: .2s;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
    }
    #faq .content{
        color: #333;
        text-align: left;
        position: relative;
        display: inline;
        max-height: 250px;
        will-change: max-height;
        contain: layout;
        display: inline-block;
        opacity: 1;
        transform: translate(0, 0);
        padding: 10px 15px 10px 15px;
        transition: .3s opacity, .6s max-height;
        hyphens: auto;
        z-index: 2;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
    }
    #faq .content p{
        margin: 0;
    }
    #faq ul {
        list-style: none;
        perspective: 900;
        padding: 0;
        margin: 0;
    }
    #faq ul li {
        position: relative;
        overflow: hidden;
        padding: 0;
        margin: 0;
        border-radius: 8px;
        border: 1px solid #EBEBEB;
    }
    #faq ul li + li {
        margin-top: 15px;
    }
    #faq ul li:last-of-type {
        padding-bottom: 0;
    }
    #faq ul li i {
        position: absolute;
        transform: translate(-6px, 0);
        margin-top: 18px;
        right: 15px;
    }
    #faq ul li i:before, ul li i:after {
        content: "";
        position: absolute;
        background-color: #8DB53F;
        width: 3px;
        height: 9px;
    }
    #faq ul li i:before {
        transform: translate(-2px, 0) rotate(45deg);
    }
    #faq ul li i:after {
        transform: translate(2px, 0) rotate(-45deg);
    }
    #faq ul li input[type=checkbox] {
        position: absolute;
        cursor: pointer;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;
        touch-action: manipulation;
    }
    #faq ul li input[type=checkbox]:checked ~ .header {
        color: #000;
    }
    #faq ul li input[type=checkbox]:checked ~ .content {
        max-height: 0;
        transition: .3s;
        display: none;
    }
    #faq ul li input[type=checkbox]:checked ~ i:before {
        transform: translate(2px, 0) rotate(45deg);
    }
    #faq ul li input[type=checkbox]:checked ~ i:after {
        transform: translate(-2px, 0) rotate(-45deg);
    }
    * {
        box-sizing: border-box;
    }
</style>