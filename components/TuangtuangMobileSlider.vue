<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, idx) in items" :key="idx" @click="showModal(item)">
                <div class="slide-swiper-container">
                    <div class="slide-swiper-mobile" @click.capture="showModal(item)" :class="clickable ? 'pointer' : ''">
                        <img v-lazy-load :src="item.image_url" alt="">
                        <h1>{{ item.product_name }}</h1>
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-back-mobile" slot="button-prev">
                <img v-lazy-load style="height:36px;width:36px" src="~/assets/icons/arrow-back.svg" alt="">
            </div>
            <div class="swiper-next-mobile" slot="button-next">
                <img v-lazy-load style="height:36px;width:36px" src="~/assets/icons/arrow-next.svg" alt="">
            </div>
        </swiper>
        <b-modal v-model="modal" size="lg" centered hide-footer scrollable>
            <template #modal-header>
                <div class="tuang-title-modal">
                    <h1>{{item.product_name}}</h1>
                </div>
                <div class="items-center">
                    <button type="button" aria-label="Close" class="close" @click="modal = false">×</button>
                </div>
            </template>
            <div class="tuang-body-modal">
                <div id="img">
                    <img v-lazy-load id="img-main" :src="item.image_url" alt="">
                    <div id="market">
                        <h3 v-show="this.$i18n.locale == 'id'">Beli online disini:</h3>
                        <h3 v-show="this.$i18n.locale == 'en'">Buy online here:</h3>
                        <div id="icon">
                            <a v-show="item.url_shopee != null" :href="item.url_shopee" target="_blank" rel="noopener noreferrer">
                                <img v-lazy-load id="img-icon" src="~/assets/icons/icon-shopee.png" alt="">
                            </a>
                            <a v-show="item.url_tokopedia != null" :href="item.url_tokopedia" target="_blank" rel="noopener noreferrer">
                                <img v-lazy-load id="img-icon" src="~/assets/icons/icon-tokopedia.png" alt="">
                            </a>
                            <a v-show="item.url_tiktokshop != null" :href="item.url_tiktokshop" target="_blank" rel="noopener noreferrer">
                                <img v-lazy-load id="img-icon" src="~/assets/icons/icon-tiktokshop.png" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div id="desc">
                    <p v-if="item.content" v-html="$md.render(item.content)">
                    </p>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'

export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        clickable: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            item : {},
            modal : false,
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-next-mobile',
                    prevEl: '.swiper-back-mobile',
                },
                loop: true, 
                slidesPerView: 1,
            }
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper
        }
    },
    methods : {
        showModal(item) {
            if (!this.clickable) return
            this.modal = true
            this.item = item
        },
    }
}
</script>
<style lang="scss" scoped>
.slide-swiper-container {
    height: 384px;
    background-color: white;
    margin-bottom: 35px;
    justify-content: center;
    display: flex;
}
.slide-swiper-mobile {
    height: 384px;
    width: 280px;
    background-color: white;
    text-align: center;
    transition: opacity 1s ease;
    img {
        width: 224.047px;
        height: 280px;
        object-fit: cover;
    }
    h1 {
        font-size: 14px;
        font-weight: 600;
        margin-top: 24px;
    }
    p {
        margin-top: 8px;
        font-size: 12px;
        font-weight: 400;
    }
}
.swiper-back-mobile {
    position: absolute;
    top: 40%;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
.swiper-next-mobile {
    position: absolute;
    top: 40%;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
</style>