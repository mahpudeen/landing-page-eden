<template>
    <div :class="$store.state.offsetTop >= 64 && modeDesktop?'mt-offset':'hiddenx'">
        <div class="blog-bg-title" lazy-background="~/assets/images/bg/eden-updates.jpg">
            <div class="blog-title">
                <h1>{{blog.title}}</h1>
                <form class="search-input">
                    <input v-model="search" type="text" id="search-input"  :placeholder="blog.placeholder">
                    <b-icon icon="search"></b-icon>
                </form>
            </div>
        </div>
        <div v-if="!search">
        <div class="blog-top-picks">
            <div class="side-container">
                <div class="blog-top-picks-title">
                    <h1>{{blog.pick_title}}</h1>
                </div>
                <client-only>
                <VueSlickCarousel class="blog-top-picks-carousel" v-bind="carousel_top_picks" :key="componentKey" v-if="top_picks.length">
                <div v-for="(item,idx) in top_picks" :key="idx">
                    <NuxtLink class="blog-top-picks-article" :to="urlLocale+'blog/'+item.attributes.slug">
                        <img v-lazy-load :src="item.attributes.image.data.attributes.url" :alt="item.attributes.image.data.attributes.caption">
                        <div id="body">
                            <h3>
                                {{item.attributes.category.data.attributes.name}}
                            </h3>
                            <h1>
                                {{item.attributes.title}}
                            </h1>
                            <span>
                                {{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}
                            </span>
                            <p>
                                {{item.attributes.description}}
                            </p>
                        </div>
                    </NuxtLink>
                </div>
                </VueSlickCarousel>
                </client-only>
            </div>
        </div>
        <div class="blog-bg-promo">
            <div class="side-container">
                <div class="blog-promo-title">
                    <h1>{{blog.promo_title}}</h1>
                </div>
                <div class="blog-promo-flex">
                    <NuxtLink :to="urlLocale+'blog/'+item.attributes.slug" class="blog-promo-article" v-for="(item,idx) in promo" :key="idx">
                        <img v-lazy-load :src="item.attributes.image.data.attributes.url" :alt="item.attributes.image.data.attributes.caption">
                        <h2>
                            {{item.attributes.title}}
                        </h2>
                        <span>
                            {{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}
                        </span>
                    </NuxtLink>
                </div>
                <div>
                    <b-pagination 
                        v-model="promo_page" 
                        :total-rows="promo_meta.total" 
                        :per-page="promo_meta.pageSize"
                        align="center">
                    </b-pagination>
                </div>
            </div>
        </div>
        <div class="side-container">
            <h1 class="blog-reguler-title">
                {{blog.blog_title}}
            </h1>
            <div class="blog-category">
                <button 
                    :class="category == ''?'blog-category-title-active':'blog-category-title'" 
                    @click="category = ''"
                >
                    {{blog.all}}
                </button>
                <button 
                    v-for="(item,idx) in categories" :key="idx" 
                    :class="category == item.id?'blog-category-title-active':'blog-category-title'" 
                    @click="category = item.id"
                >
                    {{item.attributes.name}}
                </button>
            </div>
            <div class="blog-culinary">
                <NuxtLink :to="urlLocale+'blog/'+item.attributes.slug" v-for="(item,idx) in our_blog" :key="idx">
                    <img v-lazy-load :src="item.attributes.image.data.attributes.url" :alt="item.attributes.image.data.attributes.caption">
                    <div>
                        <h3>
                            {{item.attributes.category.data.attributes.name}}
                        </h3>
                        <span>
                            {{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}
                        </span>
                    </div>
                    <h2>
                        {{item.attributes.title}}
                    </h2>
                </NuxtLink>
            </div>
            <div>
                <b-pagination 
                    v-model="our_blog_page" 
                    :total-rows="our_blog_meta.total" 
                    :per-page="our_blog_meta.pageSize"
                    align="center">
                </b-pagination>
            </div>
        </div>
        <div class="home-container">
            <h1 class="blog-reguler-title">
                {{blog.press_release_title}}
            </h1>
            <div class="blog-pers">
                <div id="pers1">
                    <NuxtLink :to="urlLocale+'blog/'+item.attributes.slug" v-for="(item,idx) in press_release" :key="idx">
                        <img v-lazy-load :src="item.attributes.image.data.attributes.url" :alt="item.attributes.image.data.attributes.caption">
                        <div id="pers-body">
                            <div id="pers-category">
                                <h3>
                                    {{item.attributes.category.data.attributes.name}}
                                </h3>
                                -
                                <span>
                                    {{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}
                                </span>
                            </div>
                            <h2>
                                {{item.attributes.title}}
                            </h2>
                        </div>
                    </NuxtLink>
                </div>
                <div id="pers2">
                    <NuxtLink :to="urlLocale+'blog/'+item.attributes.slug" v-for="(item,idx) in press_release_side" :key="idx">
                        <div id="pers-category">
                            <h3>
                                {{item.attributes.category.data.attributes.name}}
                            </h3>
                            -
                            <span>
                                {{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}
                            </span>
                        </div>
                        <h2>
                            {{item.attributes.title}}
                        </h2>
                    </NuxtLink>
                </div>
            </div>
            <div>
                <b-pagination 
                    v-model="press_release_page" 
                    :total-rows="press_release_meta.total" 
                    :per-page="press_release_meta.pageSize"
                    align="center">
                </b-pagination>
            </div>
        </div>
        </div>
        <div v-else class="home-container">
            <div v-if="result_search.length > 0">
                <h2 class="blog-reguler-title">{{blog.result_title}}</h2>
                <div class="blog-search">
                    <NuxtLink :to="urlLocale+'blog/'+item.attributes.slug" v-for="(item,idx) in result_search" :key="idx">
                        <img v-lazy-load :src="item.attributes.image.data.attributes.url" :alt="item.attributes.image.data.attributes.caption">
                        <div id="body">
                            <h1>{{short50char(item.attributes.title)}}</h1>
                            <div id="category-date">
                                <h3>
                                    {{item.attributes.category.data.attributes.name}}
                                </h3>
                                -
                                <span>
                                    {{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}
                                </span>
                            </div>
                            <p>{{short50char(item.attributes.description)}}</p>
                        </div>
                    </NuxtLink>
                </div>
                <div>
                    <b-pagination 
                        v-model="search_page" 
                        :total-rows="search_meta.total" 
                        :per-page="search_meta.pageSize"
                        align="center">
                    </b-pagination>
                </div>
            </div>
            <div v-else>
                <div class="blog-not-found">
                    <img v-lazy-load src="~/assets/images/notfound.png" alt="">
                    <h2>{{blog.notfound_title}}</h2>
                    <p>{{blog.find_other}}</p>
                </div>
                <h2 class="blog-reguler-title">{{blog.new_articles_title}}</h2>
                <div class="blog-search">
                    <NuxtLink :to="urlLocale+'blog/'+item.attributes.slug" v-for="(item,idx) in all" :key="idx">
                        <img v-lazy-load :src="item.attributes.image.data.attributes.url" :alt="item.attributes.image.data.attributes.caption">
                        <div id="body">
                            <h1>{{short50char(item.attributes.title)}}</h1>
                            <div id="category-date">
                                <h3>
                                    {{item.attributes.category.data.attributes.name}}
                                </h3>
                                -
                                <span>
                                    {{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}
                                </span>
                            </div>
                            <p>{{short50char(item.attributes.description)}}</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.page-item.active .page-link {
  background-color: #DCEEED;
  border-color: #dee2e6;
  color: #50ABA3;
  outline: none;
}
.page-link {
    color: #000000;
}
.page-link:hover {
  background-color: #DCEEED;
  border-color: #dee2e6;
  color: #50ABA3;
}
.page-link:focus, .page-link:focus{
    outline: none !important;
  box-shadow: none !important;
}
</style>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { 
    queryBlog, 
    queryTopPicks, 
    queryPromo, 
    queryCategory, 
    queryOurBlog, 
    queryPressRelease,
    querySearch
} from '~/graphql/queryBlog'
export default {
    name: 'blog',
    components: { VueSlickCarousel },
    data() {
        return {
            carousel_top_picks : {
                "dots": true,
                "infinite": true,
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "autoplay": true,
                "arrows": false,
                "autoplaySpeed": 3000,
                "pauseOnDotsHover": true,
                "pauseOnFocus": true,
                "pauseOnHover": true,
            },
            componentKey : 0,
            blog : {
                title: "",
                placeholder: "",
                pick_title: "",
                promo_title: "",
                blog_title: "",
                all: "",
                press_release_title: "",
                result_title: "",
                notfound_title: "",
                find_other: "",
                new_articles_title: "",
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
            top_picks : [],
            promo : [],
            promo_page : 1,
            promo_meta : {
                total: 0,
                page: 0,
                pageSize: 0,
                pageCount: 0
            },
            categories : [],
            category : '',
            our_blog : [],
            our_blog_page : 1,
            our_blog_meta : {
                total: 0,
                page: 0,
                pageSize: 0,
                pageCount: 0
            },
            press_release : [],
            press_release_side : [],
            press_release_page : 1,
            press_release_meta : {
                total: 0,
                page: 0,
                pageSize: 0,
                pageCount: 0
            },
            search : '',
            search_var : '',
            result_search : [],
            search_page : 1,
            search_meta : {
                total: 0,
                page: 0,
                pageSize: 0,
                pageCount: 0
            },
            all : [],
            all_page : 1,
            all_meta : {
                total: 0,
                page: 0,
                pageSize: 0,
                pageCount: 0
            },
        }
    },
    apollo: {
        blog: {
            prefetch: true,
            query: queryBlog,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.blog = data.blog.data.attributes
                }
            },
        },
        top_picks: {
            prefetch: false,
            query: queryTopPicks,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    pageSize: 3,
                    page: 1,
                    pick: true
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.top_picks = data.articles.data
                }
            },
        },
        promo: {
            prefetch: false,
            query: queryPromo,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    pageSize: this.modeDesktop ? 3:1,
                    page: this.promo_page,
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.promo = data.articles.data
                    this.promo_meta = data.articles.meta.pagination
                }
            },
        },
        categories: {
            prefetch: true,
            query: queryCategory,
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
                    pageSize: this.modeDesktop ? 6:1,
                    page: this.our_blog_page,
                    category: this.category == '' ? [3, 4, 5, 8, 9, 10]:[this.category]
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.our_blog = data.articles.data
                    this.our_blog_meta = data.articles.meta.pagination
                }
            },
        },
        press_release: {
            prefetch: false,
            query: queryPressRelease,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    pageSize: 5,
                    page: this.press_release_page,
                    category: [1, 6]
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.press_release = []
                    this.press_release_side = []
                    data.articles.data.forEach((e,idx) => {
                        if (idx == 0 || idx == 1) {
                            this.press_release.push(e)
                        } else {
                            this.press_release_side.push(e)
                        }
                    });
                    this.press_release_meta = data.articles.meta.pagination
                }
            },
        },
        search: {
            prefetch: false,
            query: querySearch,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    pageSize: 10,
                    page: this.search_page,
                    title: this.search_var
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.result_search = data.articles.data
                    if (this.result_search.length == 0) {
                        this.$apollo.queries.all.refetch()
                    }
                    this.search_meta = data.articles.meta.pagination
                }
            },
        },
        all: {
            prefetch: true,
            query: querySearch,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    pageSize: 5,
                    page: this.all_page,
                    title: ''
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.all = data.articles.data
                    this.all_meta = data.articles.meta.pagination
                }
            },
        },
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
    methods : {
        short50char(post) {
            var shortTitle = post
            if(!this.modeDesktop)
            shortTitle = post.length > 50 ? post.substring(0,50) + "..." : post;
            return shortTitle
        }
    },
    watch : {
        search(val) {
            let self = this
            clearTimeout(this._timerId)
            this._timerId = setTimeout(function () {
                self.search_var = val
            }, 500);
        }
    },
    head() {
        return {
            title: this.blog.seo.metaTitle,
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.blog.seo.metaTitle
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.blog.seo.metaDescription
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.blog.seo.keywords
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                    content: this.blog.seo.metaImage.data.attributes.url
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.blog.seo.metaDescription
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.blog.seo.metaTitle
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.blog.seo.metaDescription
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.blog.seo.metaImage.data.attributes.url
                },
            ],
        }
    },
}
</script>