<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, idx) in items" :key="idx" @click="showModal(item)">
                <div class="slide-swiper" :style="stylejustify(idx)" >
                    <div @click.capture="showModal(item)" :class="[slideswiper(idx), clickable ? 'pointer' : '']">
                        <img v-lazy-load :src="item.image_url" alt="">
                        <h1>{{ item.product_name }}</h1>
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-back" slot="button-prev">
                <img v-lazy-load src="~/assets/icons/arrow-back.svg" alt="">
            </div>
            <div class="swiper-next" slot="button-next">
                <img v-lazy-load src="~/assets/icons/arrow-next.svg" alt="">
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
            slideLeft: 0,
            slideCenter: 1,
            slideRight: 2,
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
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-back',
                },
                loop: true, 
                slidesPerView: 3,
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
        stylejustify(idx) {
            if (idx === this.slideLeft) {
                return 'justify-content: flex-end'
            } else if (idx === this.slideCenter) {
                return 'justify-content: center'
            } else if (idx === this.slideRight) {
                return 'justify-content: flex-start'
            } else {
                return 'justify-content: center'
            }
        },
        slideswiper(idx) {
            if (idx === this.slideLeft || idx === this.slideRight) {
                return 'slide-swiper1'
            } else if (idx === this.slideCenter) {
                return 'slide-swiper2'
            } else {
                return 'slide-swiper1'
            }
        }
    },
    mounted() {
        this.swiper.on('slideChange', () => {
            this.slideLeft = (this.swiper.realIndex) % this.items.length;
            this.slideCenter = (this.swiper.realIndex + 1) % this.items.length;
            this.slideRight = (this.swiper.realIndex + 2) % this.items.length;
        });
    }
}
</script>
<style lang="scss" scoped>
.pointer {
    cursor: pointer;
}
.slide-swiper {
    height: 408px;
    background-color: white;
    margin-bottom: 50px;
    display: flex;
}
.slide-swiper2 {
    height: 408px;
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
.slide-swiper1 {
    margin-top: 28px;
    height: 352px;
    width: 200px;
    text-align: center;
    background-color: white;
    transition: opacity 1s ease;
    img {
        width: 142.857px;
        height: 200px;
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
.swiper-back {
    position: absolute;
    top: 40%;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
.swiper-next {
    position: absolute;
    top: 40%;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
</style>