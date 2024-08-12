<template>
    <div :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop?'mt-offset':'hiddenx'">
        <div data-aos="fade-up">
            <img v-lazy-load v-show="modeDesktop" class="home-banner" :alt="home.banner.data.attributes.caption" :src="home.banner.data.attributes.url"/>
            <img v-lazy-load v-show="!modeDesktop" class="home-banner" :alt="home.banner_mobile.data.attributes.caption" :src="home.banner_mobile.data.attributes.url"/>
        </div>
        <div class="home-bg-white">
            <div class="home-container flex-warp">
                <div class="home-tagline1">
                    <h1 
                        class="home-tagline1-title" 
                        data-aos="fade-down"
                        data-aos-anchor-placement="bottom-bottom"
                    >
                        {{home.tagline_title}}
                    </h1>
                    <p 
                        class="home-tagline1-body" 
                        data-aos="fade-up"
                    >
                        {{home.tagline_body}}
                    </p>
                </div>
                <div class="home-tagline2" 
                    data-aos="fade-left"
                >
                    <img v-lazy-load class="home-tagline-img" :alt="home.tagline_image.data.attributes.caption" :src="home.tagline_image.data.attributes.url"/>
                </div>
            </div>
        </div>
        <div class="home-bg-cyan">
            <div class="home-container">
                <h1 
                    class="home-title2" 
                    data-aos="fade-down"
                >
                    {{home.service_title}}
                </h1>
                <div class="home-service-container">
                    <client-only>
                    <VueSlickCarousel v-bind="service_carousel" :key="componentKey" v-if="home.service.length">
                        <div v-for="(item,idx) in home.service" :key="idx">
                            <div 
                                class="home-service-container-box" 
                                data-aos-easing="ease-out-sine"
                                :data-aos="getAnimationService(idx)"
                            > 
                                <div class="home-service-back-box">
                                </div>
                                <div class="home-service-front-box">
                                    <h2 class="home-service-title">
                                        {{item.title}}
                                    </h2>
                                    <p class="home-service-body">
                                        {{item.body}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </VueSlickCarousel>
                    </client-only>
                </div>
            </div>
        </div>
        <div class="home-bg-white">
            <div class="home-container">
                <h1 
                    class="home-title"
                    data-aos="fade-down"
                >
                    {{home.product_title}}
                </h1>
                <p 
                    class="home-body" 
                    data-aos="fade-up"
                >
                    {{home.product_body}}
                </p>
                <div 
                    class="home-accordion"
                >
                    <ul>
                        <li 
                            v-for="(item,idx) in home.product" 
                            :key="idx" 
                            :tabindex="idx+1" 
                            :lazy-background="item.img.data.attributes.url"
                            data-aos="fade-up"
                            :data-aos-delay="getAnimationDelay(idx+1)"
                        >
                            <div>
                                <NuxtLink :to="item.url">
                                    <h2>{{item.title}}</h2>
                                </NuxtLink>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="home-bg-client" lazy-background="~/assets/images/bg/our-client.jpg">
            <div class="home-client-container">
                <div class="home-client1">
                    <h1 
                        class="home-client-title"
                        data-aos="fade-down-right"
                    >
                        {{home.client_title}}
                    </h1>
                    <p 
                        class="home-client-body"
                        data-aos="fade-up-right"
                    >
                        {{home.client_body}}
                    </p>
                </div>
                <div class="home-client2" data-aos="fade-up">
                    <div class="home-client-img-flex">
                        <img 
                            v-lazy-load
                            v-for="(item,idx) in home.client" 
                            :key="idx" 
                            :src="item.img.data.attributes.url" 
                            :alt="item.img.data.attributes.caption" 
                            class="home-client-img"
                            data-aos="fade-left"
                            :data-aos-delay="getAnimationDelay(idx+1)"
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="home-bg-cyan">
            <div class="home-container">
                <h1 
                    class="home-title2"
                    data-aos="fade-down"
                >
                    {{home.media_title}}
                </h1>
                <div class="home-media">
                    <client-only>
                    <VueSlickCarousel v-bind="media_carousel" :key="componentKey" v-if="home.media.length">
                        <div v-for="(item,idx) in home.media" :key="idx">
                            <img 
                                v-lazy-load 
                                class="home-media-img" 
                                :src="item.img.data.attributes.url" 
                                :alt="item.img.data.attributes.caption"
                                data-aos="fade-left"
                                data-aos-delay="300"
                            >
                        </div>
                    </VueSlickCarousel>
                    </client-only>
                </div>
            </div>
        </div>
        <div class="home-bg-white">
            <div class="home-container">
                <h1 
                    class="home-title"
                    data-aos="fade-down"
                >
                    {{home.news_title}}
                </h1>
                <div 
                    class="home-news-category"
                    data-aos="fade-up"
                >
                    <button 
                        :class="category == ''?'home-news-title-active':'home-news-title'" 
                        @click="category = ''"
                    >
                        {{blog.all}}
                    </button>
                    <button 
                        v-for="(item,idx) in categories" :key="idx" 
                        :class="category == item.id?'home-news-title-active':'home-news-title'" 
                        @click="category = item.id"
                    >
                        {{item.attributes.name}}
                    </button>
                </div>
                <div class="blog-promo-flex" v-show="modeDesktop">
                    <NuxtLink 
                        v-for="(item,idx) in our_blog" 
                        :to="urlLocale+'blog/'+item.attributes.slug" 
                        :key="idx" 
                        class="home-news-box"
                        :data-aos="getAnimationService(idx)"
                    >
                        <img v-lazy-load class="home-news-img" :src="item.attributes.image.data.attributes.url" :alt="item.attributes.image.data.attributes.caption">
                        <h2 
                            class="home-news-title2"
                            data-aos="fade-up"
                        >
                            {{item.attributes.title}}
                        </h2>
                        <p 
                            class="home-news-date"
                            data-aos="fade-up"
                        >
                            {{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}
                        </p>
                    </NuxtLink>
                </div>
                <div v-show="!modeDesktop">
                    <client-only>
                    <VueSlickCarousel v-bind="media_carousel" :key="componentKey2" v-if="our_blog.length">
                        <div v-for="(item,idx) in our_blog" :key="idx">
                            <div class="home-news-box"
                                data-aos="fade-up"
                            >
                                <NuxtLink :to="urlLocale+'blog/'+item.attributes.slug" class="home-news-box">
                                    <img v-lazy-load class="home-news-img" :src="item.attributes.image.data.attributes.url" :alt="item.attributes.image.data.attributes.caption">
                                    <h2 class="home-news-title2">
                                        {{item.attributes.title}}
                                    </h2>
                                    <p class="home-news-date">{{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}</p>
                                </NuxtLink>
                            </div>
                        </div>
                    </VueSlickCarousel>
                    </client-only>
                </div>
            </div>
        </div>
        <div class="home-bg-statistic" lazy-background="~/assets/images/bg/statistic.jpg">
            <div class="home-container">
                <h1 
                    class="home-statistic-title"
                    data-aos="fade-down"
                >
                    {{home.statistic_title}}
                </h1>
                <div class="home-statistic-container">
                    <div 
                        class="home-statistic-box" 
                        v-for="(item,idx) in home.statistic" 
                        :key="idx"
                    >
                        <div 
                            class="home-statistic-count"
                            data-aos="fade-down"
                        >
                            {{item.value}}
                        </div>
                        <h2 
                            class="home-statistic-title2"
                            data-aos="fade-up"
                        >
                            {{item.title}}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-bg-white">
            <div class="home-container">
                <h1 
                    class="home-title center"
                    data-aos="fade-down"
                    v-html="$md.render(home.benefit_title)"
                ></h1>
                <div class="home-benefit-container" v-show="modeDesktop">
                    <div 
                        class="home-benefit-box" 
                        v-for="(item,idx) in home.benefit" 
                        :key="idx"
                        :data-aos="idx == 0 ? 'fade-right':'fade-left'"
                    >
                        <img v-lazy-load 
                            class="home-benefit-img" 
                            :src="item.img.data.attributes.url" 
                            :alt="item.img.data.attributes.caption"
                        >
                        <h2 class="home-benefit-text">
                            {{item.title}}
                        </h2>
                        <client-only>
                        <p 
                            class="home-benefit-body" 
                            v-html="$md.render(item.body)"
                            data-aos="fade-up"
                            data-aos-delay="600"
                        ></p>
                        </client-only>
                    </div>
                </div>
                <div v-show="!modeDesktop">
                    <client-only>
                    <VueSlickCarousel v-bind="media_carousel" :key="componentKey" v-if="home.benefit.length">
                        <div v-for="(item,idx) in home.benefit" :key="idx">
                            <div 
                                class="home-benefit-box"
                                data-aos="fade-up"
                            >
                                <img v-lazy-load class="home-benefit-img" :src="item.img.data.attributes.url" :alt="item.img.data.attributes.caption">
                                <h2 class="home-benefit-text">
                                    {{item.title}}
                                </h2>
                                <client-only>
                                <p class="home-benefit-body" v-html="$md.render(item.body)"></p>
                                </client-only>
                            </div>
                        </div>
                    </VueSlickCarousel>
                    </client-only>
                </div>
            </div>
        </div>
        <div class="home-bg-white">
            <div class="home-container">
                <div class="home-warp">
                    <div class="home-download1">
                        <img v-lazy-load 
                            class="home-download-img" 
                            :src="home.download_img.data.attributes.url" 
                            :alt="home.download_img.data.attributes.caption"
                            data-aos="zoom-in"
                        >
                    </div>
                    <div class="home-download2">
                        <h1 class="home-title center" data-aos="zoom-in-down">
                            {{home.download_title}}
                        </h1>
                        <div class="home-download-warp">
                            <a target="_blank" :href="home.download_playstore_url" rel="noopener noreferrer">
                                <img v-lazy-load src="~/assets/images/GooglePlay.png" alt="PlayStore" class="home-download-img-app" data-aos="zoom-in-right">
                            </a>
                            <a target="_blank" :href="home.download_appstore_url" rel="noopener noreferrer">
                                <img v-lazy-load src="~/assets/images/AppStore.png" alt="Appstore" class="home-download-img-app" data-aos="zoom-in-left">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { queryHome } from '~/graphql/queryHome'
import { queryCategoryAll, queryOurBlog } from '~/graphql/queryBlog'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
    name: 'index',
    components: { VueSlickCarousel },
    data() {
        return {
            media_carousel : {
                "dots": false,
                "infinite": true,
                "slidesToShow": 5,
                "slidesToScroll": 1,
                "autoplay": true,
                "arrows": false,
                "autoplaySpeed": 3000,
                "pauseOnDotsHover": true,
                "pauseOnFocus": true,
                "pauseOnHover": true,
                "responsive": [
                    {
                        "breakpoint": 975,
                        "settings": {
                            "dots": true,
                            "infinite": true,
                            "slidesToShow": 1,
                            "slidesToScroll": 1,
                            "arrows": false,
                            "autoplay": true,
                            "autoplaySpeed": 3000,
                            "pauseOnDotsHover": true,
                            "pauseOnFocus": true,
                            "pauseOnHover": true,
                        }
                    }
                ]
            },
            service_carousel : {
                "dots": true,
                "infinite": true,
                "slidesToShow": 3,
                "slidesToScroll": 1,
                "autoplay": true,
                "arrows": false,
                "autoplaySpeed": 3000,
                "pauseOnDotsHover": true,
                "pauseOnFocus": true,
                "pauseOnHover": true,
                "responsive": [
                    {
                        "breakpoint": 975,
                        "settings": {
                            "dots": true,
                            "infinite": true,
                            "slidesToShow": 1,
                            "slidesToScroll": 1,
                            "arrows": false,
                            "autoplay": true,
                            "autoplaySpeed": 3000,
                            "pauseOnDotsHover": true,
                            "pauseOnFocus": true,
                            "pauseOnHover": true,
                        }
                    }
                ]
            },
            componentKey : 0,
            componentKey2 : 0,
            home : {
                banner: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                banner_mobile: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                tagline_title: "",
                tagline_body: "",
                tagline_image: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                service_title: "",
                service: [],
                product_title: "",
                product_body: "",
                product: [],
                client_title: "",
                client_body: "",
                client: [],
                media_title: "",
                media: [],
                news_title: "",
                statistic_title: "",
                statistic: [],
                benefit_title: "",
                benefit: [],
                download_img: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                download_title: "",
                download_appstore_url: "",
                download_playstore_url: "",
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
            },
            blog : {
                all : ''
            },
            category : '',
            categories : [],
            our_blog : [],

        }
    },
    computed : {
        modeDesktop() {
            return this.$store.state.modeDesktop
        },
        urlLocale() {
            if (this.$i18n.locale == 'id') {
                return '/'
            } else {
                return '/en/'
            }
        },
    },
    methods: {
        getAnimationService(idx) {
            if (idx === 0) {
                return 'fade-right';
            } else if (idx === 1) {
                return 'fade-up';
            } else if (idx === 2) {
                return 'fade-left';
            } else {
                return ''; // Default animation class if index doesn't match any condition
            }
        },
        getAnimationDelay(idx) { //make delay for animation idx multiply 200 and convert string
            return (idx*200).toString();
        },
        getAnimationProduct(idx) {
            if (idx === 0) {
                return 'fade-right';
            } else if (idx === 1) {
                return 'fade-right';
            } else if (idx === 2) {
                return 'fade-right';
            } else if (idx === 3) {
                return 'fade-left';
            } else if (idx === 4) {
                return 'fade-left';
            } else if (idx === 5) {
                return 'fade-left';
            }
        }
    },
    apollo: {
        home: {
            prefetch: false,
            query: queryHome,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.home = data.home.data.attributes
                    this.blog = data.blog.data.attributes
                    this.componentKey += 1;
                }
            },
        },
        category: {
            prefetch: false,
            query: queryCategoryAll,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.categories = data.categories.data
                }
            },
        },
        our_blog: {
            prefetch: false,
            query: queryOurBlog,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    pageSize: 3,
                    page: 1,
                    category: this.category == '' ? []:[this.category]
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.our_blog = data.articles.data
                    this.componentKey2 += 1;
                }
            },
        }
    },
    head() {
        return {
            title: this.home.seo.metaTitle,
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.home.seo.metaTitle
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.home.seo.metaDescription
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.home.seo.keywords
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                    content: this.home.seo.metaImage.data.attributes.url
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.home.seo.metaDescription
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.home.seo.metaTitle
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.home.seo.metaDescription
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.home.seo.metaImage.data.attributes.url
                },
            ],
        }
    },
}
</script>
