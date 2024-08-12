<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, idx) in items" :key="idx">
                <div class="life-day-slide-swiper-container">
                    <div :lazy-background="item.img.data.attributes.url" class="life-day-slide-swiper-mobile">
                        <div id="content">
                            <h1>{{ item.title }}</h1>
                            <p>{{ item.body }}</p>
                        </div>
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
.life-day-slide-swiper-container {
    height: 204px;
    display: flex;
    justify-content: center;
}
.life-day-slide-swiper-mobile {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 204px;
    width: 90%;
    border-radius: 16px;
    color: white;
    padding: 20px;
    text-align: left;
    display: flex;
    // flex-direction: column;
    align-items: flex-end;
    transition: opacity 1s ease;
    #content {
        display: flex;
        flex-direction: column;
        h1 {
            font-size: 14px;
            font-style: normal;
            font-weight: 800;
            line-height: 18px;
            margin: 0;
            background:rgba(0,0,0,.4);
        }
        p {
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            margin: 0;
            background:rgba(0,0,0,.4);
        }
    }
}
.life-swiper-back {
    position: absolute;
    top: 50%;
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
    top: 50%;
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