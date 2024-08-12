<template>
    <div class="perks-slider-mobile-container" lazy-background="~/assets/images/bg/life-perks-wawa.png">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, idx) in items" :key="idx">
                <div class="life-slide-swiper-container">
                    <div class="life-slide-swiper-mobile">
                        <img v-lazy-load :src="item.image_url" alt="">
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </swiper-slide>
            <div class="life-swiper-back" slot="button-prev">
                <img v-lazy-load src="~/assets/icons/life-arrow-back.svg" alt="">
            </div>
            <div class="life-swiper-next" slot="button-next">
                <img v-lazy-load src="~/assets/icons/life-arrow-next.svg" alt="">
            </div>
        </swiper>
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
        }
    },
    data() {
        return {
            item : {},
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
                    nextEl: '.life-swiper-next',
                    prevEl: '.life-swiper-back',
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
    }
}
</script>
<style lang="scss" scoped>
.perks-slider-mobile-container {
    background-position: bottom;
    background-repeat: no-repeat;
}
.life-slide-swiper-container {
    height: 410px;
    display: flex;
    justify-content: center;
}
.life-slide-swiper-mobile {
    height: 144px;
    width: 90%;
    border-radius: 16px;
    padding: 24px;
    background-color: #fff;
    text-align: center;
    transition: opacity 1s ease;
    margin-top: 50px;
    img {
        width: 80px;
        height: 80px;
        margin-top: -70px;
    }
    p {
        margin-top: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #000;
    }
}
.life-swiper-back {
    position: absolute;
    top: 28%;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
    img {
        height:36px;
        width:36px
    }
}
.life-swiper-next {
    position: absolute;
    top: 28%;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
    img {
        height:36px;
        width:36px
    }
}
</style>