<template>
    <div :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop?'mt-offset':'hiddenx'">
        <div class="product-bg-title" lazy-background="~/assets/images/bg/product.jpg">
            <div class="home-container">
                <h1 class="aboutus-title">
                    {{product.title}}
                </h1>
            </div>
        </div>
        <div class="home-container">
            <div class="product-category">
                <h3>{{product.category_title}}</h3>
            </div>
            <div 
                class="product-category-list" 
                ref="scrollContainer" 
                @mousedown="handleMouseDown"
                @mouseup="handleMouseUp"
                @mousemove="handleMouseMove"
                @touchstart="handleTouchStart"
                @touchend="handleTouchEnd"
                @touchmove="handleTouchMove"
            >
                <div :class="category=='all'?'active':''" @click="selectCategory({tag_product:'all'})">
                    <img v-lazy-load src="~/assets/images/all_category.png" alt="Semua">
                    <h2>
                        {{product.all}}
                    </h2>
                </div>
                <div :class="category==item.tag_product?'active':''" v-for="(item,idx) in tuangtuang_category" :key="idx+'tuang'" @click="selectCategory(item)">
                    <span>{{product.chip}}</span>
                    <img v-lazy-load :src="item.image_url.data.attributes.url" :alt="item.title">
                    <h2>
                        {{item.title}}
                    </h2>
                </div>
                <div :class="category==item.tag_product?'active':''" v-for="(item,idx) in categories" :key="idx" @click="selectCategory(item)">
                    <span v-show="checkChip(item)">{{product.chip}}</span>
                    <img v-lazy-load :src="item.image_url" :alt="item.name">
                    <h2>
                        {{item.name}}
                    </h2>
                </div>
            </div>
            <div class="product-list-head">
                <h1>
                    {{product.product_list_title}}
                </h1>
                <form>
                    <input v-model="search" type="text" id="search-input" :placeholder="product.search_placeholder">
                    <b-icon icon="search"></b-icon>
                </form>
            </div>
            <div class="product-list">
                <div v-for="(item,idx) in products" :key="idx" :class="clickable?'pointer':''" @click="showModal(item)">
                    <img v-lazy-load :src="item.image_url" :alt="item.product_name">
                    <h2>{{item.product_name}}</h2>
                    <span>{{product.minimum_purchase}}: {{item.order_min_qty}} {{item.item_uom_name}}</span>
                </div>
            </div>
            <div class="product-more" v-show="dataproduct.limit == products.length && products.length > 0">
                <a @click="moreProduct()">
                    {{product.more}}
                    <b-icon icon="arrow-down"></b-icon>
                </a>
            </div>
            <div class="blog-not-found" v-show="products.length == 0 && isLoading == false">
                <img v-lazy-load src="~/assets/images/notfound.png" alt="">
                <h2>{{product.search_title}}</h2>
                <p>{{product.search_body}}</p>
            </div>
            <div class="product-loading" v-show="isLoading == true" >
                <b-spinner label="Loading..."></b-spinner>
            </div>
        </div>
        <TuangtuangModal :modal="modal" :item="item" />
    </div>
</template>
<script>
import { queryProduct } from '~/graphql/queryProduct'
import { queryTuangtuangCategory, queryProductTuangtuangs } from '~/graphql/queryTuangtuang'
export default {
    data() {
        return {
            isMouseDown: false,
            isTouching: false,
            startX: 0,
            scrollLeft: 0,
            search : '',
            category : 'all',
            categories : [],
            product : {
                "title": "",
                "category_title": "",
                "all": "",
                "chip": "",
                "product_list_title": "",
                "search_placeholder": "",
                "minimum_purchase": "",
                "more": "",
                "search_title": "",
                "search_body": "",
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
            products : [],
            dataproduct : {
                "offset": 1,
                "limit":12,
                "platform": "orca",
                "data":{
                    "sub_district_id": "298188800",
                    "tag_product_value":"",
                    "search":""
                }
            },
            isLoading : false,
            tuangtuang_category : [],
            tuangtuang_retail : [],
            clickable : false,
            modal : false,
            item : {},
        };
    },
    apollo: {
        product: {
            prefetch: true,
            query: queryProduct,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.product = data.product.data.attributes
                }
            },
        },
        tuangtuang_category: {
            prefetch: false,
            query: queryTuangtuangCategory,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.tuangtuang_category = data.tuangtuang.data.attributes.category
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
                        this.products = JSON.parse(JSON.stringify(this.tuangtuang_retail))
                    })
                }
            },
        },
    },
    mounted() {
        if (this.$route.query.category == 'all' || this.$route.query.category == undefined) {
            this.category = 'all'
            this.getProduct()
        } else {
            this.category = this.$route.query.category
        }
        this.getCategory()
    },
    computed: {
        modalTuang() {
            return this.$store.state.modalTuang
        }
    },
    methods: {
        showModal(item) {
            console.log('showModal', item)
            if (!this.clickable) return
            this.$store.commit('setModalTuang', true)
            this.modal = true
            this.item = item
            // if (this.$store.state.modeDesktop) {
            // }
        },
        checkChip(item) {
            if (item.name && item.name.includes("Tuang") || item.title && item.title.includes("Tuang")) {
                return true
            } else {
                return false
            }
        },
        moreProduct() {
            this.dataproduct.limit += 12
            this.getProduct()
        },
        getCategory() {
            let self = this
            let data = {
                "limit": 20,
                "order_by": "id",
                "platform": "orca",
                "data": {
                    "area_value": "jakarta_barat"
                }
            }
            this.$api.post("/tag_product",data).then(function(res){
                self.categories = res.data.data
            })
        },
        selectCategory(item) {
            this.category=item.tag_product;
            this.dataproduct.limit = 12;
            this.$router.push({ query: { category: item.tag_product }})
        },
        getProduct() {
            let self = this
            this.isLoading = true
            this.clickable = false
            this.$api.post("/product/public",this.dataproduct).then(function(res){
                self.isLoading = false
                if (res.data.data != null) {
                    self.products = res.data.data
                } else {
                    self.products = []
                }
            })
        },
        handleMouseDown(event) {
            this.isMouseDown = true;
            this.startX = event.pageX - this.$refs.scrollContainer.offsetLeft;
            this.scrollLeft = this.$refs.scrollContainer.scrollLeft;
        },
        handleMouseUp() {
            this.isMouseDown = false;
        },
        handleMouseMove(event) {
            if (!this.isMouseDown) return;
            event.preventDefault();
            const x = event.pageX - this.$refs.scrollContainer.offsetLeft;
            const walk = (x - this.startX) * 1; // Adjust the scrolling speed by changing the multiplier
            this.$refs.scrollContainer.scrollLeft = this.scrollLeft - walk;
        },
        handleTouchStart(event) {
            if (event.touches.length !== 2) return; // Only handle two-finger touch
            this.isTouching = true;
            this.startX = event.touches[0].pageX - this.$refs.scrollContainer.offsetLeft;
            this.scrollLeft = this.$refs.scrollContainer.scrollLeft;
        },
        handleTouchEnd() {
            this.isTouching = false;
        },
        handleTouchMove(event) {
            if (!this.isTouching || event.touches.length !== 2) return; // Only handle two-finger touch
            event.preventDefault();
            const x = event.touches[0].pageX - this.$refs.scrollContainer.offsetLeft;
            const walk = (x - this.startX) * 1; // Adjust the scrolling speed by changing the multiplier
            this.$refs.scrollContainer.scrollLeft = this.scrollLeft - walk;
        },
    },
    watch : {
        modalTuang(val) {
            this.modal = val
        },
        category(val) {
            if (val == 'all') {
                this.dataproduct.data.tag_product_value = ''
                this.getProduct()
            } else if (val == 'tuangtuang_retail') {
                this.$apollo.queries.tuangtuang_retail.refetch()
                this.clickable = true
            } else {
                this.dataproduct.data.tag_product_value = val
                this.getProduct()
            }
        },
        search(val) {
            let self = this
            clearTimeout(this._timerId)
            this._timerId = setTimeout(() => {
                self.dataproduct.data.search = val
                self.getProduct()
            }, 500);
        }
    },
    head() {
        return {
            title: this.product.seo.metaTitle,
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.product.seo.metaTitle
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.product.seo.metaDescription
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.product.seo.keywords
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                    content: this.product.seo.metaImage.data.attributes.url
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.product.seo.metaDescription
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.product.seo.metaTitle
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.product.seo.metaDescription
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.product.seo.metaImage.data.attributes.url
                },
            ],
        }
    },
};
</script>
