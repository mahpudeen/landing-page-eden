<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, idx) in items" :key="idx">
                <div class="life-slide-swiper-container">
                    <div :style="'background:'+item.color" class="life-slide-swiper-mobile">
                        <img v-lazy-load :src="item.image_url" alt="">
                        <h1 v-html="$md.render(item.title)"></h1>
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" id="life" slot="pagination"></div>
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
<style>
.gold {
    color: #FFF500;
}
</style>
<style lang="scss" scoped>
.life-slide-swiper-container {
    height: 340px;
    display: flex;
    justify-content: center;
}
.life-slide-swiper-mobile {
    height: 280px;
    width: 220px;
    border-radius: 16px;
    margin-bottom: -24px;
    padding: 20px;
    text-align: center;
    transition: opacity 1s ease;
    img {
        width: 80px;
        height: 80px;
        margin-top: 10px;
        // object-fit: cover;
    }
    h1 {
        color: #FFF;
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        margin-top: 24px;
    }
    p {
        margin-top: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #FFF;
    }
}
.life-swiper-back {
    position: absolute;
    top: 40%;
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
    top: 40%;
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