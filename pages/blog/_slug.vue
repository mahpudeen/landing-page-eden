<template>
    <div :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop?'mt-offset':'hiddenx'">
        <div class="home-container" v-show="!nofound">
            <div class="flex-warp">
                <div class="blog-detail">
                    <div id="divcategory">
                        <h3 id="category">{{article.attributes.category.data.attributes.name}}</h3>
                        <h1 id="title">{{article.attributes.title}}</h1>
                    </div>
                    <div id="date">
                        <span>{{blog_detail.by}}</span>
                        <span>{{$moment(article.attributes.publishedAt).format('MMM DD, YYYY')}}</span>
                    </div>
                    <img id="img" :src="article.attributes.image.data.attributes.url" :alt="article.attributes.image.data.attributes.caption">
                    <div id="article" v-html="$md.render(article.attributes.content)"></div>
                </div>
                <div class="blog-detail-side">
                    <div id="title">
                        <h2>{{blog_detail.related_articles_title}}</h2>
                    </div>
                    <div id="body">
                        <NuxtLink id="list" :to="urlLocale+'blog/'+item.attributes.slug" v-for="(item,idx) in related_articles" :key="idx">
                            <h1>{{item.attributes.title}}</h1>
                            <div id="category-date">
                                <h3>{{item.attributes.category.data.attributes.name}}</h3>
                                <span>{{$moment(item.attributes.publishedAt).format('MMM DD, YYYY')}}</span>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="nofound">
            <Error404/>
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag'
import { 
    queryBlogDetail,
    queryBySlug
} from '~/graphql/queryBlog'
export default {
    data() {
        return {
            blog_detail : {
                by: "",
                related_articles_title: ""
            },
            category : '',
            nofound : false,
            isFetching : false,
            related_articles : [],
            article : {
                id: "",
                attributes: {
                    title: "",
                    slug: "",
                    description: "",
                    image: {
                        data: {
                            attributes: {
                                url: "",
                                caption: null
                            }
                        }
                    },
                    content: "",
                    publishedAt: "",
                    category: {
                        data: {
                            id: "",
                            attributes: {
                                name: ""
                            }
                        }
                    },
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
    apollo: {
        blog_detail: {
            prefetch: true,
            query: queryBlogDetail,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.blog_detail = data.blog.data.attributes
                }
            },
        },
        slug: {
            prefetch: true,
            query: queryBySlug,
            variables () {
                return { 
                    locale: this.$i18n.locale,
                    slug : this.$route.params.slug
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    if (data.articles.data.length > 0) {
                        this.nofound=false
                        this.article = data.articles.data[0]
                        this.category = JSON.parse(JSON.stringify(this.article.attributes.category.data.id))
                        this.getCategory()
                        this.addView(this.article.id)
                    } else {
                        this.nofound=true
                    }
                }
            },
        },
    },
    methods : {
        addView(id) {
            let self = this
            if (this.isFetching) {
                return; 
            }
            this.isFetching = true; 
            if (!this.add_view) {
                this.$surl.put("/api/articles/view/"+id)
                .then(function(res){
                    setTimeout(() => {
                        if (res.status==200) {
                            self.isFetching = false; 
                        }
                    }, 1000);
                })
            }
        },
        async getCategory() {
            const result = await this.$apollo.query({
                variables: {
                    locale: this.$i18n.locale,
                    "pageSize": 3,
                    "page": 1,
                    "category": [this.category]
                },
                query: gql`
                query queryBlog ($locale: I18NLocaleCode, $page: Int, $pageSize: Int, $category : [ID!]) {
                    articles(
                        filters: {
                            category: { 
                                id : {
                                    in: $category
                                }
                            }
                        }
                        sort: "publishedAt:desc"
                        locale: $locale
                        pagination: { page: $page, pageSize: $pageSize }
                    ) {
                        data {
                            id
                            attributes {
                                title
                                slug
                                description
                                image {
                                    data {
                                        attributes {
                                        url
                                        caption
                                        }
                                    }
                                }
                                category {
                                    data {
                                        id
                                        attributes {
                                            name
                                        }
                                    }
                                }
                                publishedAt
                            }
                        }
                    }
                }
                `
            })
            this.related_articles = result.data.articles.data
        }
    },
    
    head() {
        return {
            title: this.article.attributes.title,
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.article.attributes.title
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.article.attributes.description
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.article.attributes.seo ? this.article.attributes.seo.keywords:''
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                    content: this.article.attributes.image.data.attributes.url
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.article.attributes.description
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.article.attributes.title
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.article.attributes.description
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.article.attributes.image.data.attributes.url
                },
            ],
        }
    },
}
</script>