<template>
    <div :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop ? 'mt-offset' : 'hiddenx'">
        <div class="faq-bg-title" lazy-background="~/assets/images/bg/faq.jpg">
            <div class="faq-title">
                <h1>{{faq.title}}</h1>
                <form class="faq-search-input">
                    <input v-model="search" type="text" id="search-input" :placeholder="faq.placeholder_search" @input="fetchSuggestions">
                    <b-icon icon="search"></b-icon>
                </form>
                <ul v-if="showSuggestions" class="autocomplete-list">
                    <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion, true)" v-show="suggestions.length > 0">
                        {{ suggestion.title }}
                    </li>
                    <li v-show="suggestions.length == 0">
                        {{faq.no_results}}
                    </li>
                </ul>
            </div>
        </div>
        <div v-show="showIndex">
        <div class="side-container">
            <div class="faq-top">
                <div id="title">
                    <h1>{{faq.top_title}}</h1>
                </div>
                <div id="body">
                    <ul>
                        <li v-for="(top, index) in tops" :key="index" @click="selectFaq(top)">
                            {{ top.title }}
                            <img src="~/assets/icons/faq-arrow-right.svg" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="home-container">
            <div class="faq-topic">
                <div id="title">
                    <h1>{{faq.topic_title}}</h1>
                </div>
                <div id="category">
                    <div v-for="(item, idx) in categories" :key="idx" :class="item.id == category.id?'active':''" @click="chooseCategory(item)">
                        <img :src="item.img.data.attributes.url" :alt="item.img.data.attributes.caption">
                        <h3> {{item.title}} </h3>
                    </div>
                </div>
                <div id="body">
                    <h2>{{faq.question_about}} {{category.title}}</h2>
                    <ul>
                        <li v-for="(item, index) in items" :key="index" @click="selectFaq(item)">
                            {{ item.title }}
                            <img src="~/assets/icons/faq-arrow-right.svg" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="faq-bg-question">
            <div class="home-container">
                <div class="faq-question">
                    <h1>{{faq.contact_title}}</h1>
                    <p>{{faq.contact_desc}}</p>
                    <div id="contact">
                        <a :href="item.url" target="_blank" v-for="(item, idx) in faq.contact" :key="idx">
                            <div id="title">
                                <img :src="item.img.data.attributes.url" alt="Contact">
                                <h2>
                                    {{item.title}}
                                </h2>
                            </div>
                            <p>
                                {{item.body}}
                            </p>
                            <p>
                                {{item.description}}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div v-show="!showIndex" class="home-container">
            <nav aria-label="breadcrumb">
                <ol class="faq-breadcrumb">
                    <li v-for="(item, index) in breadcrumb" :key="index">
                        <NuxtLink :to="item.href">{{ item.text }}</NuxtLink> <span>/</span>
                    </li>
                </ol>
            </nav>
            <div class="faq-body">
                <div id="category">
                    <h2>{{faq.category_title}}</h2>
                    <ol>
                        <li v-for="(item, index) in categories" :key="index">
                            <NuxtLink :class="item.id == category.id?'active':''" :to="urlLocale+'pusat-bantuan?c='+item.slug">{{ item.title }}</NuxtLink> 
                        </li>
                    </ol>
                </div>
                <div id="body" v-show="showCategory">
                    <h1>{{category.title}}</h1>
                    <ul>
                        <li id="li" v-for="(item, index) in items" :key="index" @click="selectFaq(item)">
                            {{ item.title }}
                            <img src="~/assets/icons/faq-arrow-right.svg" alt="">
                        </li>
                    </ul>
                </div>
                <div id="body" v-show="!showCategory">
                    <h1>{{content.title}}</h1>
                    <p id="content" v-html="$md.render(content.body)">
                    </p>
                    <div id="question">
                        <div id="title">
                            <h5>
                                {{faq.survey_title}}
                            </h5>
                            <button @click="chooseVote('yes')" :class="vote_yes?'active':''"><b-icon icon="hand-thumbs-up" ></b-icon>{{faq.survey_yes}}</button>
                            <button @click="chooseVote('no')" :class="vote_no?'active':''"><b-icon icon="hand-thumbs-down" ></b-icon>{{faq.survey_no}}</button>
                        </div>
                        <div id="body2">
                            <p v-show="vote_yes">{{faq.survey_yes_desc}}</p>
                            <p v-show="vote_no">{{faq.survey_no_desc}}</p>
                            <div id="contact" v-show="vote_no">
                                <a :href="item.url" target="_blank" v-for="(item, idx) in faq.contact" :key="idx">
                                    <div id="title">
                                        <img :src="item.img.data.attributes.url" alt="Contact">
                                        <h2>
                                            {{item.title}}
                                        </h2>
                                    </div>
                                    <p>
                                        {{item.body}}
                                    </p>
                                    <p>
                                        {{item.description}}
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <h3>{{faq.related_article}}</h3>
                    <ul>
                        <li id="li" v-for="(item, index) in items" :key="index" @click="selectFaq(item)" v-show="index < 3">
                            {{ item.title }}
                            <img src="~/assets/icons/faq-arrow-right.svg" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { 
    queryFaq, 
    queryfaqCategories, 
    queryFaqLists, 
    querySearchFaqLists, 
    queryCategoryFaqLists,
    querySlugFaqLists
} from '~/graphql/queryFaq'
export default {
    data() {
        return {
            search: '',
            suggestions: [],
            showSuggestions: false,
            tops : [],
            showIndex : true,
            breadcrumb: [],
            categories : [],
            category : {
                id : "1",
                title: "",
                slug: "",
            },
            showCategory : false,
            content : {
                id : "",
                title: "",
                body: "",
            },
            faq : {
                title: "",
                placeholder_search: "",
                top_title: "",
                topic_title: "",
                question_about: "",
                contact_title: "",
                contact_desc: "",
                contact: [],
                category_title: "",
                survey_title: "",
                survey_yes: "",
                survey_no: "",
                survey_yes_desc: "",
                survey_no_desc: "",
                related_article: "",
                no_results: "",
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
            items: [],
            vote_yes : false,
            vote_no : false,
        }
    },
    apollo: {
        faq: {
            prefetch: false,
            query: queryFaq,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.faq = data.faq.data.attributes
                }
            },
        },
        categories: {
            prefetch: false,
            query: queryfaqCategories,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.categories = []
                    let data2 = data.faqCategories.data
                    data2.forEach((e, idx) => {
                        if (idx == 0) {
                            this.category.id = e.id
                            this.category.title = e.attributes.title
                            this.category.slug = e.attributes.slug
                        }
                        this.categories.push(e.attributes)
                        this.categories[idx].id = e.id
                    });
                }
            },
        },
        tops: {
            prefetch: false,
            query: queryFaqLists,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.tops = []
                    let data2 = data.faqLists.data
                    data2.forEach(e => {
                        this.tops.push(e.attributes)
                        this.tops[this.tops.length - 1].id = e.id
                    });
                }
            },
        },
        suggestions: {
            prefetch: false,
            query: querySearchFaqLists,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    search: this.search
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.suggestions = []
                    let data2 = data.faqLists.data
                    data2.forEach(e => {
                        this.suggestions.push(e.attributes)
                        this.suggestions[this.suggestions.length - 1].id = e.id
                    });
                }
            },
        },
        items: {
            prefetch: false,
            query: queryCategoryFaqLists,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    category_id: this.category.id,
                    category: this.category.slug,
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.items = []
                    let data2 = data.faqLists.data
                    data2.forEach(e => {
                        this.items.push(e.attributes)
                        this.items[this.items.length - 1].id = e.id
                    });
                }
            },
        },
        slug: {
            prefetch: false,
            query: querySlugFaqLists,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    slug: this.content.slug,
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    let data2 = data.faqLists.data
                    let item = data2[0].attributes
                    item.id = data2[0].id
                    this.setContent(item)
                }
            },
        },
    },
    mounted() {
        this.checkQuery()
    },
    computed: {
        urlLocale() {
            if (this.$i18n.locale == 'id') {
                return '/'
            } else {
                return '/en/'
            }
        }
    },
    methods: {
        chooseVote(item) {
            if (item == 'yes') {
                this.vote_yes = true
                this.vote_no = false
                this.$surl.put("/api/faq/yes/"+this.content.id)
                .then(function(res){
                    console.log(res)
                })
            } else {
                this.vote_yes = false
                this.vote_no = true
                this.$surl.put("/api/faq/no/"+this.content.id)
                .then(function(res){
                    console.log(res)
                })
            }
        },
        chooseCategory(item) {
            this.category.id = item.id
            this.category.title = item.title
            this.category.slug = item.slug
            this.$apollo.queries.items.refetch()
        },
        fetchSuggestions() {
            if (this.search.length > 0) {
                // Make an API call to fetch suggestions based on this.search
                this.$apollo.queries.suggestions.refetch()
                this.showSuggestions = true;
            } else {
                this.suggestions = [];
                this.showSuggestions = false;
            }
        },
        selectSuggestion(suggestion) {
            // this.search = suggestion.title;
            this.search = '';
            this.suggestions = [];
            this.showSuggestions = false;
            this.selectFaq(suggestion);
        },
        selectFaq(item) {
            new Promise((resolve, reject) => {
                this.$router.push({ path: this.urlLocale + 'pusat-bantuan', query: { q: item.slug } }, resolve, reject);
            }).then(() => {
                this.setContent(item)
            });
        },
        setContent(item) {
            this.vote_yes = false
            this.vote_no = false
            let e = item.faq_category.data
            let category = {}
            category.id = e.id
            category.title = e.attributes.title
            category.slug = e.attributes.slug
            this.chooseCategory(category)
            this.content.id = item.id
            this.content.title = item.title
            this.content.body = item.content
            this.checkQuery();
            this.breadcrumb = [
                {
                    text: this.faq.title,
                    href: this.urlLocale +'pusat-bantuan'
                },
                {
                    text: category.title,
                    href: this.urlLocale +'pusat-bantuan?c='+category.slug
                },
                {
                    text: item.title,
                    href: ''
                }
            ]
        },
        checkQuery() {
            if (this.$route.query.c || this.$route.query.q ) {
                this.showIndex = false
                if (this.$route.query.c) {
                    this.showCategory = true
                    this.category.slug = this.$route.query.c
                    this.categories.forEach(e => {
                        if (e.slug == this.$route.query.c) {
                            this.category.id = e.id
                            this.category.title = e.title
                            this.breadcrumb = [
                                {
                                    text: this.faq.title,
                                    href: this.urlLocale +'pusat-bantuan'
                                },
                                {
                                    text: e.title,
                                    href: ''
                                }
                            ]
                        }
                    })
                } else if (this.$route.query.q) {
                    this.content.slug = this.$route.query.q
                    this.showCategory = false
                } else {
                    this.showCategory = false
                }
            } else {
                this.showIndex = true
            }
        }
    },
    watch: {
        $route() {
            this.checkQuery();
        },
    },head() {
        return {
            title: this.faq.seo.metaTitle,
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.faq.seo.metaTitle
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.faq.seo.metaDescription
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.faq.seo.keywords
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                    content: this.faq.seo.metaImage.data.attributes.url
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.faq.seo.metaDescription
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.faq.seo.metaTitle
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.faq.seo.metaDescription
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.faq.seo.metaImage.data.attributes.url
                },
            ],
        }
    },
}
</script>