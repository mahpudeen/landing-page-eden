<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, idx) in items" :key="idx">
                <div class="life-slide-swiper" :style="stylejustify(idx)" >
                    <div :class="[slideswiper(idx)]" :style="'background:'+item.color">
                        <img v-lazy-load :src="item.image_url" alt="">
                        <h1 v-html="$md.render(item.title)"></h1>
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
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
                    nextEl: '.life-swiper-next',
                    prevEl: '.life-swiper-back',
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
            const justifyMap = {
                [this.slideLeft]: 'flex-end',
                [this.slideCenter]: 'center',
                [this.slideRight]: 'flex-start',
            };
            return `justify-content: ${justifyMap[idx] || 'center'}`;
        },
        slideswiper(idx) {
            const swiperMap = {
                [this.slideLeft]: 'life-slide-swiper1',
                [this.slideCenter]: 'life-slide-swiper2',
                [this.slideRight]: 'life-slide-swiper1',
            }
            return swiperMap[idx] || 'life-slide-swiper1'
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
<style>
.gold {
    color: #FFF500;
}
</style>
<style lang="scss" scoped>
.pointer {
    cursor: pointer;
}
.life-slide-swiper {
    height: 340px;
    margin-bottom: 50px;
    display: flex;
}
.life-slide-swiper2 {
    height: 340px;
    width: 280px;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    transition: opacity 1s ease;
    img {
        height:100px; 
        width:100px;
        margin-top:50px
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
        font-size: 12px;
        font-weight: 400;
        color: #FFF;
    }
}
.life-slide-swiper1 {
    margin-top: 28px;
    height: 250px;
    width: 200px;
    padding: 20px;
    border-radius: 16px;
    text-align: center;
    transition: opacity 1s ease;
    img {
        height:75px; 
        width:75px;
        margin-top:10px;
        // object-fit: cover;
    }
    h1 {
        color: #FFF;
        font-size: 18px;
        font-style: normal;
        font-weight: 800;
        margin-top: 24px;
    }
    p {
        margin-top: 8px;
        font-size: 12px;
        font-weight: 400;
        color: #FFF;
    }
}
.life-swiper-back {
    position: absolute;
    top: 40%;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
.life-swiper-next {
    position: absolute;
    top: 40%;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
</style>