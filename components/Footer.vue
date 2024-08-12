<template>
    <div class="footer-bg-black">
        <div class="home-container">
            <div>
                <img v-lazy-load alt="Icon Eden" class="nav-logo-img" src="~/assets/images/logo-eden.png"/>
            </div>
            <div class="footer-container1">
                <div class="footer-1">
                    <h2 class="footer-title">
                        {{footer.address_title}}
                    </h2>
                    <div class="footer-1-container">
                        <div class="footer-1-box" v-for="(item,idx) in footer.address" :key="idx">
                            <h3 class="footer-1-title">
                                {{item.title}}
                            </h3>
                            <p class="footer-1-body">
                                {{item.address}} <br>
                                <a class="green-link" :href="item.url" target="_blank" rel="noopener noreferrer">{{glossary.find_us}}</a> 
                            </p>
                        </div>
                    </div>
                </div>
                <div class="footer-2">
                    <div class="footer-2-container">
                        <div class="footer-2-box">
                            <h2 class="footer-title">
                                {{footer.company_title}}
                            </h2>
                            <div class="footer-2-link">
                                <div v-for="(item,idx) in footer.company" :key="idx">
                                    <NuxtLink :to="item.url" rel="noopener noreferrer" class="white-link">
                                        {{item.title}}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div class="footer-2-box">
                            <h2 class="footer-title">
                                {{footer.mitra_title}}
                            </h2>
                            <div class="footer-2-link">
                                <div v-for="(item,idx) in footer.mitra" :key="idx">
                                    <NuxtLink :to="item.url" rel="noopener noreferrer" class="white-link">
                                        {{item.title}}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div class="footer-2-box">
                            <h2 class="footer-title">
                                {{footer.sosmed_title}}
                            </h2>
                            <div class="footer-2-link">
                                <div>
                                    <img v-lazy-load src="~/assets/icons/Instagram.png" alt="Instagram" class="mr8"> 
                                    <a target="_blank" :href="footer.sosmed.instagram" rel="noopener noreferrer" class="white-link">
                                        Instagram
                                    </a>
                                </div>
                                <div>
                                    <img v-lazy-load src="~/assets/icons/Facebook.png" alt="Facebook" class="mr8"> 
                                    <a target="_blank" :href="footer.sosmed.facebook" rel="noopener noreferrer" class="white-link">
                                        Facebook
                                    </a>
                                </div>
                                <div>
                                    <img v-lazy-load src="~/assets/icons/LinkedIn.png" alt="LinkedIn" class="mr8"> 
                                    <a target="_blank" :href="footer.sosmed.linkedin" rel="noopener noreferrer" class="white-link">
                                        LinkedIn
                                    </a>
                                </div>
                                <div>
                                    <img v-lazy-load src="~/assets/icons/TikTok.png" alt="Youtube" class="mr8"> 
                                    <a target="_blank" :href="footer.sosmed.tiktok" rel="noopener noreferrer" class="white-link">
                                        Tiktok
                                    </a>
                                </div>
                                <div>
                                    <img v-lazy-load src="~/assets/icons/YouTube.png" alt="Youtube" class="mr8"> 
                                    <a target="_blank" :href="footer.sosmed.youtube" rel="noopener noreferrer" class="white-link">
                                        Youtube
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-container2">
                <div class="footer-1">
                    <h2 class="footer-title">
                        {{footer.complaint_title}}
                    </h2>
                    <h3 class="footer-1-title">
                        PT Eden Pangan Indonesia
                    </h3>
                    <div class="footer-2-link">
                        <div>
                            <img v-lazy-load src="~/assets/icons/Email.png" alt="Instagram" class="mr8"> 
                            <a :href="navbar.email.url" target="_blank" rel="noopener noreferrer" class="white-link">
                                {{navbar.email.title}}
                            </a>
                        </div>
                        <div>
                            <img v-lazy-load src="~/assets/icons/WhatsApp.png" alt="Instagram" class="mr8"> 
                            <a :href="navbar.whatsapp.url" target="_blank" rel="noopener noreferrer" class="white-link">
                                {{navbar.whatsapp.title}}
                            </a>
                        </div>
                        <div>
                            {{footer.directorate}}
                        </div>
                        <div>
                            {{footer.ministry}}
                        </div>
                        <div>
                            <img v-lazy-load src="~/assets/icons/WhatsApp.png" alt="Instagram" class="mr8"> 
                            {{footer.complaint_whatsapp}}
                        </div>
                    </div>
                </div>
                <div class="footer-2">
                    <div class="footer-bounty">
                        {{footer.bounty}}
                    </div>
                    <div class="footer-download">
                        <a target="_blank" :href="home.download_playstore_url" rel="noopener noreferrer">
                            <img v-lazy-load src="~/assets/images/GooglePlay.png" alt="PlayStore" class="home-download-img-app">
                        </a>
                        <a target="_blank" :href="home.download_appstore_url" rel="noopener noreferrer">
                            <img v-lazy-load src="~/assets/images/AppStore.png" alt="Appstore" class="home-download-img-app">
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                Copyright © 2023 PT. Eden Pangan Indonesia
            </div>
        </div>
        <!-- <div class="btn-fab" @click.prevent="scrollToDiv()">
            <NuxtLink :to="urlLocale+'mitra'" >
                <img v-lazy-load alt="Icon Box Vegetable" class="shake" src="~/assets/images/float.png">
                <div>
                    {{footer.floating}}
                </div>
            </NuxtLink>
        </div> -->
    </div>
</template>
<script>
import { queryFooter } from '~/graphql/queryFooter'
export default {
    name: 'Navbar',
    data() {
        return {
            footer : {
                address_title: "",
                address: [],
                company_title: "",
                company: [],
                mitra_title: "",
                mitra: [],
                sosmed_title: "",
                sosmed: {
                    instagram: "",
                    facebook: "",
                    linkedin: "",
                    tiktok: "",
                    youtube: ""
                },
                complaint_title: "",
                directorate: "",
                ministry: "",
                complaint_whatsapp: "",
                bounty: "",
                floating :""
            },
            navbar : {
                whatsapp: {
                    title: "",
                    url: ""
                },
                email: {
                    title: "",
                    url: ""
                }
            },
            glossary : {
                find_us: ""
            },
            home : {
                download_playstore_url: "",
                download_appstore_url: "",
            }
        }
    },
    methods: {
        scrollToDiv() {
            this.$store.commit('setRegisterMitra', true);
        }
    },
    computed: {
        urlLocale() {
            return this.$i18n.locale == 'id' ? '/' : '/en/'
        }
    },
    apollo: {
        footer: {
            prefetch: false,
            query: queryFooter,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.footer = data.footer.data.attributes
                    this.navbar = data.navbar.data.attributes
                    this.home = data.home.data.attributes
                    this.glossary = data.glossary.data.attributes
                }
            },
        }
    }
}
</script>