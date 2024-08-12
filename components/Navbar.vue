<template>
    <div :class="modeDesktop?'':'sticky'">
        <b-navbar class="nav-main" v-show="modeDesktop">
            <b-navbar class="nav-main-container mx-auto">
                <b-nav-item :to="urlLocale" :class="modeDesktop?'-ml32':'nav-item-img'">
                    <img v-lazy-load alt="Icon Eden" class="nav-logo-img" src="~/assets/images/logo-eden.png"/>
                </b-nav-item>
                <b-navbar-nav class="ml-auto">
                    <div class="nav-item-link">
                        <img v-lazy-load src="~/assets/icons/Email2.png" alt="Instagram" class="mr8"> 
                        <a :href="navbar.email.url" target="_blank" rel="noopener noreferrer" class="nav-black-link">
                            {{navbar.email.title}}
                        </a>
                    </div>
                    <div class="nav-item-link">
                        <img v-lazy-load src="~/assets/icons/WhatsApp2.png" alt="Instagram" class="mr8"> 
                        <a :href="navbar.whatsapp.url" target="_blank" rel="noopener noreferrer" class="nav-black-link">
                            {{navbar.whatsapp.title}}
                        </a>
                    </div>
                    <b-nav-item-dropdown class="-mr16" variant="white" right>
                        <template #button-content>
                            <span v-if="lang == 'id'">
                                <span><img v-lazy-load alt="Icon Lang ID" class="nav-lang" src="~/assets/icons/lang-id.svg"/></span>
                            </span>
                            <span v-else>
                                <span><img v-lazy-load alt="Icon Lang EN" class="nav-lang" src="~/assets/icons/lang-en.svg"/></span>
                            </span>
                        </template>
                        <b-dropdown-item @click="$i18n.setLocale('id')" :to="switchLocalePath('id')" :active="lang == 'id'">
                            <span><img v-lazy-load alt="Icon Lang ID" src="~/assets/icons/lang-id.svg"/></span>
                            <span>Indonesia</span>
                        </b-dropdown-item>
                        <b-dropdown-item @click="$i18n.setLocale('en')" :to="switchLocalePath('en')" :active="lang == 'en'">
                            <span><img v-lazy-load alt="Icon Lang EN" src="~/assets/icons/lang-en.svg"/></span>
                            <span>English</span>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
        </b-navbar>
        <b-navbar class="nav-main2" id="nav2" v-show="modeDesktop">
            <b-navbar class="nav-main-container2 mx-auto">
                <div v-for="(item,idx) in navbar.menu" :key="idx" :class="idx == 0 ? '-ml28':''">
                    <b-nav-item class="nav-item-custom" :to="item.url" v-if="item.child.length == 0">
                        <span :class="routerName(item.name)?'nav-menu-active':'nav-menu'">
                            {{item.title}}
                        </span>
                    </b-nav-item>
                    <b-nav-item-dropdown variant="white" v-else>
                        <template #button-content>
                            <span :class="routerName2(item.child)?'nav-menu-active':'nav-menu'">{{item.title}}</span>
                        </template>
                        <div v-for="(child,idx) in item.child" :key="idx">
                            <b-dropdown-item :to="child.url" :active="routerName(child.name)">
                                {{child.title}}
                            </b-dropdown-item>
                        </div>
                    </b-nav-item-dropdown>
                </div>
                <b-navbar-nav class="ml-auto -mr20">
                    <b-nav-item class="nav-item-custom" :to="navbar.mitra.url">
                        <span class="nav-mitra">
                            {{navbar.mitra.title}}
                        </span>
                    </b-nav-item>
                </b-navbar-nav>
            </b-navbar>
        </b-navbar>
        <b-navbar class="nav-mobile" v-show="!modeDesktop">
            <b-navbar-nav>
                <b-nav-item :to="urlLocale" class="nav-item-img">
                    <img v-lazy-load alt="Icon Eden" class="nav-logo-img" src="~/assets/images/logo-eden.png"/>
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-b-toggle.sidebar-variant>
                    <img v-lazy-load alt="Logo Menu" src="~/assets/icons/menu.svg"/>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <b-sidebar id="sidebar-variant" width="100%" z-index="12" no-header bg-variant="light" right shadow>
            <template #default="{ hide }">
                <div class="nav-mobile-padding">
                    <b-nav>
                        <b-navbar-nav>
                            <b-nav-item>
                                <img v-lazy-load alt="Icon Eden" class="nav-logo-img" src="~/assets/images/logo-eden.png"/>
                            </b-nav-item>
                        </b-navbar-nav>
                        <b-navbar-nav class="ml-auto">
                            <b-nav-item @click="hide">
                                <img v-lazy-load alt="Close Icon" src="~/assets/icons/close.svg"/>
                            </b-nav-item>
                        </b-navbar-nav>
                    </b-nav>
                    <b-nav class="nav-mobile-menu-box">
                        <div>
                            <div class="nav-mobile-contact">
                                <img v-lazy-load src="~/assets/icons/Email2.png" alt="Email" class="mr8"> 
                                <a :href="navbar.email.url" target="_blank" rel="noopener noreferrer" class="nav-black-link">
                                    {{navbar.email.title}}
                                </a>
                            </div>
                            <div class="nav-mobile-contact">
                                <img v-lazy-load src="~/assets/icons/WhatsApp2.png" alt="Whatsapp" class="mr8"> 
                                <a :href="navbar.whatsapp.url" target="_blank" rel="noopener noreferrer" class="nav-black-link">
                                    {{navbar.whatsapp.title}}
                                </a>
                            </div>
                        </div>
                        <b-navbar-nav class="ml-auto">
                            <b-nav-item-dropdown variant="white" right>
                                <template #button-content>
                                    <span v-if="lang == 'id'">
                                        <span><img v-lazy-load alt="Icon Lang ID" class="nav-lang" src="~/assets/icons/lang-id.svg"/></span>
                                    </span>
                                    <span v-else>
                                        <span><img v-lazy-load alt="Icon Lang EN" class="nav-lang" src="~/assets/icons/lang-en.svg"/></span>
                                    </span>
                                </template>
                                <b-dropdown-item @click="$i18n.setLocale('id')" :to="switchLocalePath('id')" :active="lang == 'id'">
                                    <span><img v-lazy-load alt="Icon Lang ID" src="~/assets/icons/lang-id.svg"/></span>
                                    <span>Indonesia</span>
                                </b-dropdown-item>
                                <b-dropdown-item @click="$i18n.setLocale('en')" :to="switchLocalePath('en')" :active="lang == 'en'">
                                    <span><img v-lazy-load alt="Icon Lang EN" src="~/assets/icons/lang-en.svg"/></span>
                                    <span>English</span>
                                </b-dropdown-item>
                            </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </b-nav>
                    <div class="nav-mobile-menu-box">
                        <div v-for="(item,idx) in navbar.menu" :key="idx">
                            <NuxtLink :to="item.url" :class="routerName(item.name)?'nav-mobile-menu-active':'nav-mobile-menu'" @click.native="hide" v-if="item.child.length == 0">
                                {{item.title}}
                            </NuxtLink>
                            <div no-body v-else>
                                <b-button block variant="white" v-b-toggle:[`accordion-${idx}`] @click="collapse = !collapse" class="d-flex justify-content-between align-items-center shadow-none">
                                    <template v-if="!collapse">
                                        <span class="nav-accordion-title">{{item.title}}</span> <b-icon-chevron-down></b-icon-chevron-down>
                                    </template>
                                    <template v-else>
                                        <span class="nav-accordion-title">{{item.title}}</span> <b-icon-chevron-up></b-icon-chevron-up>
                                    </template>
                                </b-button>
                            </div>
                            <div class="nav-mobile-divider"></div>
                            <b-collapse :id="`accordion-${idx}`">
                                <div class="nav-accordion-box">
                                    <div v-for="(item1,idx) in item.child" :key="idx">
                                        <div class="nav-accordion-title-item">
                                            <NuxtLink :to="item1.url" :class="routerName(item1.name)?'nav-mobile-menu-active':'nav-mobile-menu'" @click.native="hide">
                                                {{item1.title}}
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                            </b-collapse>
                        </div>
                    </div>
                    <b-navbar-nav class="nav-mobile-mitra">
                        <b-nav-item :to="navbar.mitra.url">
                            <span class="nav-mitra">
                                {{navbar.mitra.title}}
                            </span>
                        </b-nav-item>
                    </b-navbar-nav>
                </div>
            </template>
        </b-sidebar>
    </div>
</template>
<script>
import { queryNavbar } from '~/graphql/queryNavbar'
export default {
    name: 'Navbar',
    data() {
        return {
            nav2top : 64,
            collapse : false,
            navbar : {
                menu : [],
                mitra: {
                    title: "",
                    url: "",
                    name: ""
                },
                whatsapp: {
                    title: "",
                    url: ""
                },
                email: {
                    title: "",
                    url: ""
                }
            }
        }
    }, 
    apollo: {
        navbar: {
            prefetch: false,
            query: queryNavbar,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    this.navbar = data.navbar.data.attributes
                }
            },
        }
    },
    methods: {
        routerName(name) {
            if (this.$route.name != null && this.$route.name.includes(name)) {
                return true
            } else {
                return false
            }
        },
        routerName2(child) {
            let active = false
            for (let i = 0; i < child.length; i++) {
                if (this.$route.name != null && this.$route.name.includes(child[i].name)) {
                    active = true
                    break;
                } 
            }
            return active
        }
    },
    computed : {
        modeDesktop() {
            return this.$store.state.modeDesktop
        },
        lang() {
            return this.$i18n.locale
        },
        urlLocale() {
            if (this.$i18n.locale == 'id') {
                return '/'
            } else {
                return '/en/'
            }
        },
    },
    created() {
        if (process.client) {
            if (window.screen.width < 975) {
                this.$store.commit('setMode', false);
            } else {
                this.$store.commit('setMode', true);
            }
        }
    },
    mounted(){
        window.onresize = () => {
            if (window.screen.width < 975) {
                this.$store.commit('setMode', false);
            } else {
                this.$store.commit('setMode', true);
            }
        }
        window.onscroll = () => {
            var navbar = document.getElementById("nav2");
            this.$store.commit('setOffsetTop', window.pageYOffset);
            if (window.pageYOffset >= this.nav2top) {
                navbar.classList.add("stickynav2")
            } else {
                navbar.classList.remove("stickynav2");
            }
        }
    },
}
</script>
