<template>
    <div :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop ? 'mt-offset' : 'hiddenx'">
        <div class="product-bg-title" :lazy-background="bgHeader">
            <div class="home-container">
                <div class="life-banner-title" data-aos="fade-left">
                    <h1>{{lifeAtEden.banner_title}}</h1>
                    <h2>{{lifeAtEden.banner_tagline}}</h2>
                    <NuxtLink :to="urlLocale+'karir'">
                        {{lifeAtEden.banner_btn}}
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="life-core-bg" lazy-background="~/assets/images/bg/life-doodle.png" data-aos="fade-up">
            <div class="life-container">
                <div class="life-wawa-welcome" :lazy-background="welcomeWawa">
                    <div id="text">
                        <h1>
                            {{lifeAtEden.welcome_title}}
                        </h1>
                        <p>
                            {{lifeAtEden.welcome_description}}
                        </p>
                    </div>
                    <div id="img">
                        <img src="~/assets/images/bg/life-wawa2.png" alt="">
                    </div>
                </div>
            </div>
            <div class="home-container life-mb" data-aos="zoom-in">
                <div class="life-core-title">
                    <img v-lazy-load v-show="$store.state.modeDesktop" :src="lifeAtEden.core_title.data.attributes.url" :alt="lifeAtEden.core_title.data.attributes.caption">
                    <img v-lazy-load v-show="!$store.state.modeDesktop" :src="lifeAtEden.core_title_mobile.data.attributes.url" :alt="lifeAtEden.core_title.data.attributes.caption">
                    <p v-html="$md.render(lifeAtEden.core_tagline)">
                    </p>
                </div>
                <CoreValueSlider :items="core_value" v-show="$store.state.modeDesktop"/>
                <CoreValueSliderMobile :items="core_value" v-show="!$store.state.modeDesktop"/>
            </div>
        </div>
        <div class="life-perks-bg">
            <div class="life-container">
                <div class="life-video-container">
                    <div id="title">
                        <img v-lazy-load :src="lifeAtEden.grow_title.data.attributes.url" :alt="lifeAtEden.grow_title.data.attributes.caption" data-aos="fade-down">
                        <p v-html="$md.render(lifeAtEden.grow_description)" data-aos="fade-up">
                        </p>
                    </div>
                    <div id="img" data-aos="fade-left">
                        <img v-lazy-load :src="lifeAtEden.grow_img.data.attributes.url" :alt="lifeAtEden.grow_img.data.attributes.caption" @click="showModal()" class="pointer">
                    </div>
                </div>
            </div>
        </div>
        <div class="life-perks-bg2" lazy-background="~/assets/images/bg/bg-perks-awan.png">
            <div class="home-container">
                <div class="life-perks-title" data-aos="zoom-in">
                    <h2>{{lifeAtEden.geng_tagline}}</h2>
                    <img v-lazy-load :src="lifeAtEden.geng_title.data.attributes.url" :alt="lifeAtEden.geng_title.data.attributes.caption">
                </div>
                <div v-show="$store.state.modeDesktop" class="life-perks-container" lazy-background="~/assets/images/bg/life-perks-wawa.png" data-aos="zoom-in">
                    <div id="line">
                        <div class="life-card">
                            <div id="desc">
                                {{perk1.description}}
                            </div>
                            <div id="img">
                                <img v-lazy-load :src="perk1.image_url" alt="perk1">
                            </div>
                        </div>
                        <div class="life-card2">
                            <div id="img">
                                <img v-lazy-load :src="perk2.image_url" alt="perk2">
                            </div>
                            <div id="desc">
                                {{perk2.description}}
                            </div>
                        </div>
                    </div>
                    <div id="line2">
                        <div class="life-card">
                            <div id="desc">
                                {{perk3.description}}
                            </div>
                            <div id="img">
                                <img v-lazy-load :src="perk3.image_url" alt="perk3">
                            </div>
                        </div>
                        <div class="life-card2">
                            <div id="img">
                                <img v-lazy-load :src="perk4.image_url" alt="perk4">
                            </div>
                            <div id="desc">
                                {{perk4.description}}
                            </div>
                        </div>
                    </div>
                    <div id="line">
                        <div class="life-card">
                            <div id="desc">
                                {{perk5.description}}
                            </div>
                            <div id="img">
                                <img v-lazy-load :src="perk5.image_url" alt="perk5">
                            </div>
                        </div>
                        <div class="life-card2">
                            <div id="img">
                                <img v-lazy-load :src="perk6.image_url" alt="perk6">
                            </div>
                            <div id="desc">
                                {{perk6.description}}
                            </div>
                        </div>
                    </div>
                </div>
                <PerksSliderMobile :items="perks" v-show="!$store.state.modeDesktop" data-aos="zoom-in"/>
            </div>
        </div>
        <div class="life-days-bg">
            <div class="home-container">
                <div class="life-days-title" data-aos="zoom-in">
                    <img v-lazy-load :src="lifeAtEden.days_title.data.attributes.url" :alt="lifeAtEden.days_title.data.attributes.caption">
                    <p>
                        {{lifeAtEden.days_description}}
                    </p>
                </div>
                <div class="life-days-accordion" v-show="$store.state.modeDesktop">
                    <ul>
                        <li 
                            v-for="(item,idx) in lifeAtEden.days" 
                            :key="idx" :tabindex="idx+1" 
                            :lazy-background="item.img.data.attributes.url"
                            data-aos="fade-up"
                            :data-aos-delay="getAnimationDelay(idx+1)"
                        >
                            <div>
                                <span>
                                    <h2>{{item.title}}</h2>
                                    <p>{{item.body}}</p>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div data-aos="fade-up" v-show="!$store.state.modeDesktop">
                    <LifeDaysSliderMobile :items="lifeAtEden.days"/>
                </div>
            </div>
        </div>
        <div class="life-katageng-bg">
            <div class="side-container">
                <div class="life-katageng-slider" data-aos="fade-up">
                    <KataGengSlider :items="lifeAtEden.katageng"/>
                </div>
            </div>
            <div class="home-container">
                <div class="life-discover-title" data-aos="zoom-in">
                    <img v-lazy-load :src="lifeAtEden.discover_title.data.attributes.url" :alt="lifeAtEden.discover_title.data.attributes.caption">
                </div>
                <DiscoverMoreSlider :items="lifeAtEden.discover" data-aos="fade-up"/>
            </div>
        </div>
        <b-modal v-model="modalShow" size="lg" body-bg-variant="transparent" centered hide-footer bo hide-header>
            <div style="text-align:right;margin-top:-50px;margin-right:-15px">
                <b-icon icon="x-lg" class="pointer text-white" @click="showModal()"/>
            </div>
            <div style="margin-top:26px">
                <iframe width="100%" height="450" :src="lifeAtEden.grow_video_url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </b-modal>
        <div class="life-sosmed">
            <a :href="lifeAtEden.instagram_url" target="_blank">
                <img v-lazy-load src="~/assets/icons/life-instagram.png" alt="">
            </a>
            <a :href="lifeAtEden.tiktok_url" target="_blank">
                <img v-lazy-load src="~/assets/icons/life-tiktok.png" alt="">
            </a>
            <a :href="lifeAtEden.youtube_url" target="_blank">
                <img v-lazy-load src="~/assets/icons/life-youtube.png" alt="">
            </a>
            <a :href="lifeAtEden.linkedin_url" target="_blank">
                <img v-lazy-load src="~/assets/icons/life-linkedin.png" alt="">
            </a>
        </div>
        <div class="life-sosmed-mobile">
            <SosmedLifeAtEden :lifeAtEden="lifeAtEden"/>
        </div>
    </div>
</template>
<style>
.swiper-pagination-clickable .swiper-pagination-bullet {
    cursor: pointer;
    background: #81BA3F !important;
}
</style>
<script>
import CoreValueSlider from '~/components/CoreValueSlider.vue'
import { querylifeAtEden } from '~/graphql/queryLifeAtEden'
export default {
    components: { CoreValueSlider },
    data() {
        return {
            core_value : [],
            perks : [],
            perk1 : {
                image_url : '',
                description : ''
            },
            perk2 : {
                image_url : '',
                description : ''
            },
            perk3 : {
                image_url : '',
                description : ''
            },
            perk4 : {
                image_url : '',
                description : ''
            },
            perk5 : {
                image_url : '',
                description : ''
            },
            perk6 : {
                image_url : '',
                description : ''
            },
            lifeAtEden : {
                banner_title: "",
                banner_tagline: "",
                banner_btn: "",
                welcome_title: "",
                welcome_description: "",
                core_title: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                core_title_mobile: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                core_tagline: "",
                core: [],
                grow_title: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                grow_description: "",
                grow_img: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                grow_video_url: "",
                geng_tagline: "",
                geng_title: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                geng: [],
                days_title: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                days_description: "",
                days: [],
                katageng: [],
                discover_title: {
                    data: {
                        attributes: {
                            url: "",
                            caption: null
                        }
                    }
                },
                discover: [],
                instagram_url: "",
                tiktok_url: "",
                youtube_url: "",
                linkedin_url: "",
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
            modalShow: false,
        }
    },
    apollo: {
        about: {
            prefetch: false,
            query: querylifeAtEden,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.lifeAtEden = data.lifeAtEden.data.attributes
                    this.core_value = []
                    const coreData = data.lifeAtEden.data.attributes.core
                    this.core_value = coreData.map(item => ({
                        image_url: item.img.data.attributes.url,
                        title: item.title,
                        description: item.body,
                        color: item.initial
                    }));
                    this.perks = []
                    const perksData = data.lifeAtEden.data.attributes.geng
                    this.perks = perksData.map(item => ({
                        image_url: item.img.data.attributes.url,
                        description: item.description,
                    }));
                    this.perk1 = this.perks[0]
                    this.perk2 = this.perks[1]
                    this.perk3 = this.perks[2]
                    this.perk4 = this.perks[3]
                    this.perk5 = this.perks[4]
                    this.perk6 = this.perks[5]

                }
            },
        }
    },
    methods: {
        showModal() {
            this.modalShow = !this.modalShow
        },
        getAnimationDelay(idx) { //make delay for animation idx multiply 200 and convert string
            return (idx*200).toString();
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
            return this.$store.state.modeDesktop ? require('~/assets/images/bg/lifeateden.png') : require('~/assets/images/bg/lifeateden-mobile.png');
        },
        welcomeWawa() {
            return this.$store.state.modeDesktop ? require('~/assets/images/bg/life-wawa.png') : require('~/assets/images/bg/life-wawa-mobile.png');
        },
    },
    head() {
        return {
            title: this.lifeAtEden.seo.metaTitle,
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.lifeAtEden.seo.metaTitle
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.lifeAtEden.seo.metaDescription
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.lifeAtEden.seo.keywords
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                    content: this.lifeAtEden.seo.metaImage.data.attributes.url
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.lifeAtEden.seo.metaDescription
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.lifeAtEden.seo.metaTitle
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.lifeAtEden.seo.metaDescription
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.lifeAtEden.seo.metaImage.data.attributes.url
                },
            ],
        }
    },
}
</script>