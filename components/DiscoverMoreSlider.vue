<template>
    <div class="discover-container">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, idx) in items" :key="idx">
                <div class="life-discover-container" :style="stylejustify(idx)">
                    <a :href="item.url" target="_blank" class="life-discover">
                        <div id="img" :lazy-background="item.img.data.attributes.url"/>
                        <div id="content">
                            <h1>{{ item.title }}</h1>
                            <p>{{ item.body }}</p> 
                        </div>
                    </a>
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
                slidesPerView: this.$store.state.modeDesktop ? 3 : 1,
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
        stylejustify(idx) {
            if (!this.$store.state.modeDesktop) {
                return `justify-content: center`;
            }
            const justifyMap = {
                [this.slideLeft]: 'flex-end',
                [this.slideCenter]: 'center',
                [this.slideRight]: 'flex-start',
            };
            return `justify-content: ${justifyMap[idx] || 'center'}`;
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
@media only screen and (max-width: 974px) {
    .life-discover-container {
        height: 283px;
        display: flex;
        justify-content: center;
    }
    .life-discover {
        height: 283px;
        text-decoration: none;
        width: 90%;
        border-radius: 16px;
        background: #fff;
        text-align: center;
        transition: opacity 1s ease;
        #img {
            background-size: cover ;
            background-position: center center;
            background-repeat: no-repeat;
            height: 166px;
            border-radius: 16px 16px 0 0;
        }
        #content {
            padding: 16px;
            text-align: left;
            h1 {
                color: #484C4B;
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                line-height: normal
            }
            p {
                color: #484C4B;
                font-size: 13px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                margin: 0;
            }
        }
    }
    .life-swiper-back {
        img {
            height: 36px;
            width: 36px;
        }
    }
    .life-swiper-next {
        img {
            height: 36px;
            width: 36px;
        }
    }
}
@media only screen and (min-width: 975px) {
    .life-discover-container {
        height: 313px;
        display: flex;
        justify-content: center;
    }
    .life-discover {
        text-decoration: none;
        height: 313px;
        width: 254px;
        border-radius: 16px;
        background: #fff;
        text-align: center;
        transition: opacity 1s ease;
        #img {
            background-size: cover ;
            background-position: center center;
            background-repeat: no-repeat;
            height: 170px;
            border-radius: 16px 16px 0 0;
        }
        #content {
            padding: 16px;
            text-align: left;
            h1 {
                color: #484C4B;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: normal
            }
            p {
                color: #484C4B;
                font-size: 13px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                margin: 0;
            }
        }
    }
}
.life-swiper-back {
    position: absolute;
    top: 48%;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
.life-swiper-next {
    position: absolute;
    top: 48%;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
</style>