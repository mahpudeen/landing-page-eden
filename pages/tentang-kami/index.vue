<template>
    <div :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop?'mt-offset':'hiddenx'">
        <div class="aboutus-bg-title" data-aos="fade-up" lazy-background="~/assets/images/bg/tentang-kami-title.jpg">
            <div class="home-container">
                <h1 class="aboutus-title" data-aos="flip-up" data-aos-delay="600">
                    {{about.about_title}}
                </h1>
            </div>
        </div>
        <div class="home-bg-white">
            <div class="side-container">
                <div class="aboutus-story">
                    <div data-aos="fade-right">
                        <h1>
                            {{about.our_story_title}}
                        </h1>
                    </div>
                    <div data-aos="fade-left">
                        <p>
                            {{about.our_story_body}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-bg-white">
            <div class="home-container">
                <div class="aboutus-founder" data-aos="fade-down">
                    <h1 data-aos="fade-left">
                        {{about.founder_title}}
                    </h1>
                </div>
                <div class="aboutus-founder-bg" data-aos="fade-up"/>
                <div class="aboutus-founder-warp">
                    <div class="aboutus-founder-mauto" v-for="(item,idx) in about.founder" :key="idx">
                        <div class="aboutus-founder-container-box">
                            <div class="aboutus-founder-back-box" data-aos="fade-down-right"></div>
                            <div class="aboutus-founder-front-box" data-aos="fade-up-left">
                                <img v-lazy-load :src="item.img.data.attributes.url" :alt="item.img.data.attributes.caption">
                            </div>
                        </div>
                        <div class="aboutus-founder-linkedin-box">
                            <a data-aos="fade-up" :href="item.linkedin" target="_blank" class="aboutus-founder-linkedin">
                                <b-icon icon="linkedin"></b-icon>
                                {{item.name}}
                            </a>
                            <div class="aboutus-founder-position" data-aos="fade-up">
                                {{item.position}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-bg-cyan">
            <div class="side-container">
                <div class="aboutus-mitra" data-aos="zoom-in-up">
                    <h1 data-aos="fade-right">
                        {{about.partner_title}}
                    </h1>
                    <span data-aos="fade-left">
                        {{about.partner_body}}
                    </span>
                </div>
            </div>
        </div>
        <div class="home-bg-white">
            <div class="home-container">
                <div class="aboutus-mitra-list">
                    <div 
                        @click="callModal(item)" 
                        v-for="(item,idx) in about.partner" :key="idx" 
                        :lazy-background="item.img1.data.attributes.url"
                        data-aos-easing="ease-out-sine"
                        :data-aos="getAnimationService(idx)"
                    >
                        <h2>
                            {{item.title}}
                        </h2>
                        <p>
                            <span>{{glossary.read_more}}</span>
                            <b-icon icon="arrow-up" size="24"></b-icon>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="aboutus-bg-investor" lazy-background="~/assets/images/bg/investor.jpg" data-aos="flip-up">
            <div class="home-container">
                <h1 class="aboutus-investor-title" data-aos="zoom-in">
                    {{about.investor_title}}
                </h1>
                <div class="aboutus-investor-container" v-show="investor == 'list'">
                    <div class="aboutus-investor-item" v-for="(item,idx) in about.investor" :key="idx">
                        <img 
                            v-lazy-load 
                            data-aos="fade-left"
                            :data-aos-delay="getAnimationDelay(idx+1)"
                            :src="item.img.data.attributes.url" 
                            :alt="item.img.data.attributes.caption"
                        >
                    </div>
                </div>
                <form class="aboutus-investor-form" v-show="investor == 'form'" data-aos="fade-up">
                    <div class="aboutus-investor-form1">
                        <label class="white-label" for="nama-anda">{{about.investor_name}}<span class="text-red">*</span></label>
                        <input type="text" v-model="form.name" id="nama-anda" name="nama-anda" required class="white-input" ref="nameInput" :class="{ 'about-error': nameError }">
                    </div>
                    <div class="aboutus-investor-form1">
                        <label class="white-label" for="nama-perusahaan">{{about.investor_company}}<span class="text-red">*</span></label>
                        <input type="text" v-model="form.company" id="nama-perusahaan" name="nama-perusahaan" required class="white-input" ref="companyInput" :class="{ 'about-error': companyError }">
                    </div>
                    <div class="aboutus-investor-form2">
                        <label class="white-label" for="alamat-email">{{about.investor_email}}<span class="text-red">*</span></label>
                        <input type="email" v-model="form.email" id="alamat-email" name="alamat-email" required class="white-input" ref="emailInput" :class="{'about-error': emailValid }">
                        <label for="alamat-email" class="text-red" v-if="emailValid">Must be a valid email</label>
                    </div>
                </form>
                <div class="center" data-aos="fade-up">
                    <button class="aboutus-investor-button" @click="getDeck()" v-show="investor != 'finish'">{{about.investor_button}}</button>
                    <div class="aboutus-investor-finish" v-show="investor == 'finish'">{{about.investor_thank}}</div>
                </div>
            </div>
        </div>
        <div class="home-bg-white">
            <div class="side-container">
                <div class="aboutus-prinsip-box" data-aos="fade-up">
                    <h1 data-aos="fade-left">
                        {{about.value_title}}
                    </h1>
                </div>
                <div class="about-accordion">
                    <ul>
                        <li 
                            v-for="(item,idx) in about.value" 
                            :key="idx" :tabindex="idx+1" 
                            :lazy-background="item.img.data.attributes.url"
                            data-aos="fade-up"
                            :data-aos-delay="getAnimationDelay(idx+1)"
                        >
                            <h1>
                                {{item.initial}}
                            </h1>
                            <div>
                                <span>
                                    <h2>{{item.title}}</h2>
                                    <p>{{item.body}}</p>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="home-bg-white">
            <div class="home-container">
                <div class="aboutus-visi-misi">
                    <div>
                        <h2 data-aos="fade-down">
                            {{about.vision_title}}
                        </h2>
                        <p data-aos="fade-up">
                            {{about.vision}}
                        </p>
                    </div>
                    <div data-aos="fade-left">
                        <h1 data-aos="fade-right">
                            {{about.visimisi_title}}
                        </h1>
                    </div>
                </div>
                <div class="aboutus-misi">
                    <h2 data-aos="fade-down">
                        {{about.mission_title}}
                    </h2>
                    <ol data-aos="fade-up">
                        <li v-for="(item,idx) in about.mission" :key="idx">
                            {{item.value}}
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="full-screen-element" v-if="modal" @click="modal = !modal">
            <div class="about-modal-overlay" data-aos="fade-up" data-aos-delay="100">
                <div class="about-modal-container">
                    <div class="about-box-header">
                        <button class="close-button" @click="modal = !modal" v-show="modeDesktop"><img v-lazy-load src="~/assets/icons/close.png" alt=""></button>
                    </div>
                    <div class="about-modal-body">
                        <div>
                            <div>
                                <div>
                                    <h1 data-aos="fade-down">
                                        {{partner.title}}
                                    </h1>
                                    <p data-aos="fade-up">
                                        {{partner.body}}
                                    </p>
                                </div>
                                <div>
                                    <div>
                                        <h2 data-aos="fade-down-right">
                                            {{partner.selling_point_title}}
                                        </h2>
                                        <p data-aos="fade-up-right">
                                            {{partner.selling_point}}
                                        </p>
                                    </div>
                                    <div>
                                        <h2 data-aos="fade-down-left">
                                            {{partner.advantage_title}}
                                        </h2>
                                        <p data-aos="fade-up-left">
                                            {{partner.advantage}}
                                        </p>
                                    </div>
                                </div>
                                <div data-aos="fade-up">
                                    <button @click="goPartner(partner.url)">{{partner.button}}</button>
                                </div>
                            </div>
                            <div>
                                <button class="close-button" @click="modal = !modal" v-show="!modeDesktop"><img v-lazy-load src="~/assets/icons/close.png" alt=""></button>
                                <img v-lazy-load 
                                    id="imgside"
                                    :src="partner.img2.data.attributes.url" 
                                    :alt="partner.img2.data.attributes.caption"
                                    data-aos="fade-left"
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag'
import { queryAbout } from '~/graphql/queryAbout'
export default {
    name : "tentang-kami",
    data() {
        return {
            modal : false,
            investor : 'list',
            form : {
                name: '',
                company: '',
                email: ''
            },
            nameError: false,
            companyError: false,
            emailValid: false,
            about : {
                about_title: "",
                our_story_title: "",
                our_story_body: "",
                founder_title: "",
                founder: [],
                partner_title: "",
                partner_body: "",
                partner: [],
                investor_title: "",
                investor : [],
                investor_name: "",
                investor_company: "",
                investor_email: "",
                investor_thank: "",
                investor_button: "",
                value_title: "",
                value: [],
                visimisi_title: "",
                vision_title: "",
                vision: "",
                mission_title: "",
                mission: [],
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
            partner : {
                title: "",
                body: "",
                selling_point: "",
                advantage: "",
                button: "",
                url: "",
                img1: {
                    data: {
                        attributes: {
                            url: "",
                            caption: ""
                        }
                    }
                },
                img2: {
                    data: {
                        attributes: {
                            url: "",
                            caption: ""
                        }
                    }
                }
            },
            glossary : {
                read_more: ""
            }
        }
    },
    apollo: {
        about: {
            prefetch: false,
            query: queryAbout,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.about = data.about.data.attributes
                    this.glossary = data.glossary.data.attributes
                }
            },
        }
    },
    methods : {
        getAnimationService(idx) {
            if (idx === 0) {
                return 'fade-down-right';
            } else if (idx === 1) {
                return 'fade-down-left';
            } else if (idx === 2) {
                return 'fade-up-right';
            } else {
                return 'fade-up-left';
            }
        },
        getAnimationDelay(idx) { //make delay for animation idx multiply 200 and convert string
            return (idx*200).toString();
        },
        callModal(item) {
            if (item) {
                this.partner = item
            }
            this.modal = !this.modal
        },
        goPartner(url) {
            window.open(url, '_blank');
        },
        getDeck() {
            console.log(this.investor)
            if (this.investor == 'list') {
                this.investor = 'form'
            } else if (this.investor == 'form'){
                this.nameError = this.form.name.length === 0
                this.companyError = this.form.company.length === 0
                this.emailValid = this.validateEmail(this.form.email)
                if (this.nameError) {
                    this.$refs.nameInput.focus()
                } else if (this.companyError) {
                    this.$refs.companyInput.focus()
                } else if (this.emailValid) {
                    this.$refs.emailInput.focus()
                } else {
                    this.investor = 'finish'
                    this.saveInvestorDeck()
                }
            }
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return !re.test(email)
        },
        async saveInvestorDeck() {
            const result = await this.$apollo.mutate({
                mutation: gql`
                mutation {
                    createInvestorDeck(
                        data : {
                        name : "${this.form.name}"
                        company : "${this.form.company}"
                        email : "${this.form.email}"
                        }
                    ) {
                        data {
                            id
                            attributes {
                                name,
                                company,
                                email
                            }
                        }
                    }
                }
                `
            })
        }
    },
    computed : {
        modeDesktop() {
            return this.$store.state.modeDesktop
        }
    },
    head() {
        return {
            title: this.about.seo.metaTitle,
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.about.seo.metaTitle
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.about.seo.metaDescription
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.about.seo.keywords
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                    content: this.about.seo.metaImage.data.attributes.url
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.about.seo.metaDescription
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.about.seo.metaTitle
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.about.seo.metaDescription
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.about.seo.metaImage.data.attributes.url
                },
            ],
        }
    },
}
</script>