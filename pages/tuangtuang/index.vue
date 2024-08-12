<template>
    <div :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop ? 'mt-offset' : 'hiddenx'">
        <div class="product-bg-title" :lazy-background="bgHeader">
            <div class="home-container">
                <div class="tuang-head" data-aos="fade-right">
                    <img v-lazy-load v-show="$store.state.modeDesktop" :src="tuangtuang.title.data.attributes.url" alt="Tuangtuang Edenfarm">
                    <img v-lazy-load v-show="!$store.state.modeDesktop" :src="tuangtuang.title_mobile.data.attributes.url" alt="Tuangtuang Edenfarm">
                    <p>{{tuangtuang.description}}</p>
                </div>
            </div>
        </div>
        <div class="bg-tuang-story" data-aos="fade-up">
            <div class="side-container">
                <div class="tuang-story">
                    <h1>
                        {{tuangtuang.story_title}}
                    </h1>
                    <p v-html="$md.render(tuangtuang.story_desc)">
                    </p>
                    <img v-lazy-load :src="tuangtuang.story_img.data.attributes.url" :alt="tuangtuang.story_img.data.attributes.caption">
                </div>
            </div>
        </div>
        <div class="bg-tuang-desc">
            <div class="home-container">
                <h1 class="tuang-desc-title" data-aos="fade-left">{{tuangtuang.available_title}}</h1>
                <div class="tuang-desc-flex" data-aos="fade-right">
                    <div id="tuang-desc-img">
                        <img v-lazy-load :src="tuangtuang.available_retail_img.data.attributes.url" :alt="tuangtuang.available_retail_img.data.attributes.caption">
                    </div>
                    <div id="tuang-desc">
                        <h1>
                            {{tuangtuang.available_retail_title}}
                        </h1>
                        <p>
                            {{tuangtuang.available_retail_desc}}
                        </p>
                    </div>
                </div>
                <div class="tuang-desc2-flex" data-aos="fade-left">
                    <div id="tuang-desc">
                        <h1>
                            {{tuangtuang.available_business_title}}
                        </h1>
                        <p>
                            {{tuangtuang.available_business_desc}}
                        </p>
                    </div>
                    <div id="tuang-desc-img">
                        <img v-lazy-load :src="tuangtuang.available_business_img.data.attributes.url" :alt="tuangtuang.available_business_img.data.attributes.caption">
                    </div>
                </div>
            </div>
        </div>
        <div class="home-container">
            <div class="tuang-title" data-aos="zoom-in-up">
                <h1>
                    {{tuangtuang.product_retail_title}}
                </h1>
                <p>
                    {{tuangtuang.product_retail_desc}}
                </p>
            </div>
            <div class="tuang-product2" data-aos="zoom-in-up">
                <TuangtuangSlider :clickable="true" v-show="$store.state.modeDesktop && tuangtuang_retail.length > 0" :items="tuangtuang_retail"/>
                <TuangtuangMobileSlider :clickable="true" v-show="!$store.state.modeDesktop && tuangtuang_retail.length > 0" :items="tuangtuang_retail"/>
                <div class="tuang-btn-div">
                    <NuxtLink :to="urlLocale+'produk-segar?category=tuangtuang_retail'" class="tuang-btn">
                        {{tuangtuang.product_btn}}
                    </NuxtLink>
                </div>
            </div>
            <div class="tuang-title" data-aos="zoom-in-up">
                <h1>
                    {{tuangtuang.product_business_title}}
                </h1>
                <p>
                    {{tuangtuang.product_business_desc}}
                </p>
            </div>
            <div class="tuang-product" data-aos="zoom-in-up">
                <TuangtuangSlider :clickable="false" v-show="$store.state.modeDesktop" :items="items"/>
                <TuangtuangMobileSlider :clickable="false" v-show="!$store.state.modeDesktop" :items="items"/>
                <div class="tuang-btn-div">
                    <NuxtLink :to="urlLocale+'produk-segar?category=tuangtuang'" class="tuang-btn">
                        {{tuangtuang.product_btn}}
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="bg-tuang-distributor">
            <div class="home-container">
                <div class="tuang-distributor">
                    <div id="desc" data-aos="fade-right">
                        <h1>
                            {{tuangtuang.distributor_title}}
                        </h1>
                        <p>
                            {{tuangtuang.distributor_desc}}
                        </p>
                        <button class="tuang-btn" @click="openNewTab(tuangtuang.distributor_wa_url)">
                            <img v-lazy-load src="~/assets/icons/whatsapp-fill.svg" alt="">
                            {{tuangtuang.distributor_wa}}
                        </button>
                    </div>
                    <div id="img" data-aos="fade-left">
                        <img v-lazy-load :src="tuangtuang.distributor_img.data.attributes.url" :alt="tuangtuang.distributor_img.data.attributes.caption">
                    </div>
                </div>
            </div>
        </div>
        <div class="life-sosmed">
            <a :href="tuangtuang.instagram_url" target="_blank">
                <img v-lazy-load src="~/assets/icons/tuang_instagram.png" alt="">
            </a>
            <a :href="tuangtuang.tiktok_url" target="_blank">
                <img v-lazy-load src="~/assets/icons/tuang_tiktok.png" alt="">
            </a>
            <a :href="tuangtuang.tokopedia_url" target="_blank">
                <img v-lazy-load src="~/assets/icons/tuang_tokopedia.png" alt="">
            </a>
            <a :href="tuangtuang.shopee_url" target="_blank">
                <img v-lazy-load src="~/assets/icons/tuang_shopee.png" alt="">
            </a>
            <a :href="tuangtuang.tiktokshop_url" target="_blank">
                <img v-lazy-load src="~/assets/icons/tuang_tiktokshop.png" alt="">
            </a>
        </div>
        <div class="life-sosmed-mobile">
            <SosmedTuangtuang :tuangtuang="tuangtuang"/>
        </div>
    </div>
</template>
<script>
import { queryTuangtuang, queryProductTuangtuangs } from '~/graphql/queryTuangtuang'
export default {
    data() {
        return {
            modal : true,
            idx: 0,
            items : [],
            dataproduct : {
                "offset": 1,
                "limit":12,
                "platform": "orca",
                "data":{
                    "sub_district_id": "298188800",
                    "tag_product_value":"tuangtuang",
                    "search":""
                }
            },
            tuangtuang : {
                title: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                title_mobile: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                description: "",
                story_title: "",
                story_desc: "",
                story_img: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                available_title: "",
                available_business_title: "",
                available_business_desc: "",
                available_business_img: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                available_retail_title: "",
                available_retail_desc: "",
                available_retail_img: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                product_business_title: "",
                product_business_desc: "",
                product_retail_title: "",
                product_retail_desc: "",
                product_btn: "",
                distributor_title: "",
                distributor_desc: "",
                distributor_wa: "",
                distributor_wa_url: "",
                distributor_img: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                instagram_url: "",
                tiktok_url: "",
                shopee_url: "",
                tokopedia_url: "",
                tiktokshop_url: "",
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
            tuangtuang_retail : []
        };
    },
    apollo: {
        tuangtuang: {
            prefetch: false,
            query: queryTuangtuang,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.tuangtuang = data.tuangtuang.data.attributes
                }
            },
        },
        tuangtuang_retail: {
            prefetch: false,
            query: queryProductTuangtuangs,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.tuangtuang_retail = []
                    data.productTuangtuangs.data.forEach((item) => {
                        item.attributes.product_name = item.attributes.title
                        item.attributes.image_url = item.attributes.image.data.attributes.url
                        this.tuangtuang_retail.push(item.attributes)
                    })
                }
            },
        },
    },
    computed: {
        urlLocale() {
            if (this.$i18n.locale == 'id') {
                return '/'
            } else {
                return '/en/'
            }
        },
        bgHeader() {
            return this.$store.state.modeDesktop ? require('~/assets/images/bg/tuangtuang.jpg') : require('~/assets/images/bg/tuangtuang-mobile.jpg');
        },
        titleHeader() {
            return this.$store.state.modeDesktop ? require('~/assets/images/tuang-title.png') : require('~/assets/images/tuang-title-mobile.png');
        },
    },
    created() {
        this.getProduct()
    },
    methods: {
        openNewTab(url) {
            window.open(url, '_blank');
        },
        getProduct() {
            let self = this
            this.$api.post("/product/public",this.dataproduct).then(function(res){
                if (res.data.data != null) {
                    self.items = res.data.data
                } else {
                    self.items = []
                }
            })
        },
    },
    head() {
        return {
            title: this.tuangtuang.seo.metaTitle,
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.tuangtuang.seo.metaTitle
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.tuangtuang.seo.metaDescription
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.tuangtuang.seo.keywords
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                    content: this.tuangtuang.seo.metaImage.data.attributes.url
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.tuangtuang.seo.metaDescription
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.tuangtuang.seo.metaTitle
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.tuangtuang.seo.metaDescription
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.tuangtuang.seo.metaImage.data.attributes.url
                },
            ],
        }
    },
};
</script>
