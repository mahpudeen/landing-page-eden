<template>
    <div :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop?'mt-offset':'hiddenx'">
        <div class="bg-mitra-title" lazy-background="~/assets/images/bg/mitra.jpg">
            <div class="home-container">
                <h1 class="aboutus-title" data-aos="flip-up">
                    {{mitra.title}}
                </h1>
            </div>
        </div>
        <div class="side-container">
            <h1 class="mitra-title-advantage" data-aos="fade-up">
                {{mitra.advantage_title}}
            </h1>
        </div>
        <div class="mitra-advantage">
            <div id="container">
                <div id="advantage" v-for="(item,idx) in mitra.advantage" :key="idx">
                    <div id="body">
                        <h2 data-aos="fade-down">{{item.title}}</h2>
                        <p data-aos="fade-up">{{item.body}}</p>
                    </div>
                    <img v-lazy-load data-aos="fade-up" :src="item.img.data.attributes.url" :alt="item.img.data.attributes.caption">
                </div>
            </div>
        </div>
        <div class="side-container">
            <h1 class="theysay-title" data-aos="fade-up">
                {{mitra.theysaid_title}}
            </h1>
        </div>
        <div class="theysay-list" v-show="$store.state.modeDesktop">
            <div id="theysay" v-for="(item,idx) in mitra.theysaid" :key="idx" data-aos="zoom-in">
                <img v-lazy-load data-aos="fade-down" :src="item.img.data.attributes.url" :alt="item.img.data.attributes.caption">
                <p data-aos="fade-up">
                    {{item.body}}
                </p>
            </div>
        </div>
        <div class="theysay-list" v-show="!$store.state.modeDesktop">
            <client-only>
            <VueSlickCarousel v-bind="service_carousel" :key="componentKey" v-if="mitra.theysaid.length">
                <div v-for="(item,idx) in mitra.theysaid" :key="idx" data-aos="fade-up">
                    <div class="theysayimg">
                        <img v-lazy-load :src="item.img.data.attributes.url" :alt="item.img.data.attributes.caption">
                    </div>
                    <div class="theysay">
                        <p>
                            {{item.body}}
                        </p>
                    </div> 
                </div>
            </VueSlickCarousel>
            </client-only>
        </div>
        <div class="register-mitra" id="register">
            <div>
                <h1 data-aos="fade-down">{{mitra.register_title}}</h1>
                <p data-aos="fade-up">{{mitra.register_body}}<b>*</b></p>
                <span data-aos="fade-up">*{{mitra.register_term}}</span>
            </div>
        </div>
        <div class="bg-mitra-list">
            <div class="home-container">
                <div class="mitra-toggle" data-aos="zoom-in">
                    <div>
                        <button @click="mitra_toggle='customer'" :class="mitra_toggle=='customer'?'active':''">{{mitra.register_customer}}</button>
                        <button @click="mitra_toggle='supplier'" :class="mitra_toggle=='supplier'?'active':''">{{mitra.register_supplier}}</button>
                    </div>
                </div>
                <div class="mitra-list" v-show="mitra_toggle=='customer'">
                    <div 
                        v-show="$store.state.modeDesktop" 
                        class="mitra-list-box"
                        v-for="(item,idx) in mitra.mitra" :key="idx"
                    >
                        <h2 :lazy-background="item.img.data.attributes.url" data-aos="fade-down">
                            {{item.title}}
                        </h2>
                        <div id="body" data-aos="fade-up">
                            <ul>
                                <li v-for="(itm,idx1) in item.list" :key="idx1">
                                    {{itm.list}}
                                </li>
                            </ul>
                            <a :href="item.url" target="_blank">{{mitra.register_now}}</a>
                        </div>
                    </div>
                </div>
                <client-only>
                <VueSlickCarousel v-bind="service_carousel" :key="componentKey" v-if="mitra.mitra.length" v-show="!$store.state.modeDesktop && mitra_toggle=='customer'">
                    <div v-for="(item,idx) in mitra.mitra" :key="idx">
                        <div class="mitra-list-box">
                            <h2 :lazy-background="item.img.data.attributes.url">
                                {{item.title}}
                            </h2>
                            <div id="body">
                                <ul>
                                    <li v-for="(itm,idx1) in item.list" :key="idx1">
                                        {{itm.list}}
                                    </li>
                                </ul>
                                <a :href="item.url" target="_blank">{{mitra.register_now}}</a>
                            </div>
                        </div>
                    </div>
                </VueSlickCarousel>
                </client-only>
                <div class="mitra-list" v-show="mitra_toggle=='supplier'">
                    <div 
                        class="mitra-list-box"
                        v-for="(item,idx) in mitra.supplier" :key="idx"
                    >
                        <h2 :lazy-background="item.img.data.attributes.url" data-aos="fade-down">
                            {{item.title}}
                        </h2>
                        <div id="body" data-aos="fade-up">
                            <ul>
                                <li v-for="(itm,idx1) in item.list" :key="idx1">
                                    {{itm.list}}
                                </li>
                            </ul>
                            <a :href="item.url" target="_blank">{{mitra.register_now}}</a>
                        </div>
                    </div>
                </div>
                <div :class="!$store.state.modeDesktop?'mb24':''"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { queryMitra } from '~/graphql/queryMitra'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
    name: 'mitra',
    components: { VueSlickCarousel },
    data() {
        return {
            service_carousel : {
                "dots": true,
                "infinite": true,
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "arrows": false,
                "autoplay": true,
                "autoplaySpeed": 3000,
                "pauseOnDotsHover": true,
                "pauseOnFocus": true,
                "pauseOnHover": true
            },
            componentKey : 0,
            mitra_toggle : 'customer',
            mitra : {
                "title": "",
                "advantage_title": "",
                "advantage": [],
                "theysaid_title": "",
                "theysaid": [],
                "register_title": "",
                "register_body": "",
                "register_term": "",
                "register_customer": "",
                "register_supplier": "",
                "register_now": "",
                "mitra": [],
                "supplier": [],
                seo: {
                    metaTitle: "",
                    metaDescription: "",
                    metaImage: {
                        data: {
                            attributes: {
                                url: "",
                            }
                        }
                    },
                    keywords: ""
                }
            }
        }
    },
    apollo: {
        home: {
            prefetch: false,
            query: queryMitra,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.mitra = data.mitra.data.attributes
                    this.componentKey += 1;
                }
            },
        },
    },
    created() {
        this.goToDiv(this.$store.state.registerMitra == true)
    },
    computed: {
        registerMitra() {
            return this.$store.state.registerMitra
        }
    },
    methods : {
        goToDiv(val) {
            if (process.client) {
                if (val) {
                    window.location.hash = '#register';
                    setTimeout(() => {
                        window.scrollBy(0, -60);
                        this.$store.commit('setRegisterMitra', false);
                    }, 1);
                }
            }
        }
    },
    watch : {
        registerMitra(val) {
            this.goToDiv(val)
        }
    },
    head() {
        return {
            title: this.mitra.seo.metaTitle,
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.mitra.seo.metaTitle
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.mitra.seo.metaDescription
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.mitra.seo.keywords
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                    content: this.mitra.seo.metaImage.data.attributes.url
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.mitra.seo.metaDescription
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.mitra.seo.metaTitle
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.mitra.seo.metaDescription
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.mitra.seo.metaImage.data.attributes.url
                },
            ],
        }
    },
}
</script>