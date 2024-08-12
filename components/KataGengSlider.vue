<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, idx) in items" :key="idx">
                <div class="life-katageng-swiper">
                    <img v-lazy-load src="~/assets/images/life-katageng.png" id="title" alt="">
                    <div id="desc">
                        <h1>{{ item.name }}</h1>
                        <h2>{{ item.departement }}</h2>
                        <p>{{ item.kata_geng }}</p>
                        <img v-lazy-load src="~/assets/images/life-katageng.png" alt="">
                    </div>
                    <div id="img">
                        <img v-lazy-load :src="item.img.data.attributes.url" alt="">
                    </div>
                </div>
            </swiper-slide>
            <div class="life-katageng-back" slot="button-prev">
                <img v-lazy-load src="~/assets/icons/life-arrow-back.svg" alt="">
            </div>
            <div class="life-katageng-next" slot="button-next">
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
                    nextEl: '.life-katageng-next',
                    prevEl: '.life-katageng-back',
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
@media only screen and (max-width: 974px) {
    .life-katageng-swiper {
        width: 100%;
        border-radius: 16px;
        background: #fff;
        padding: 24px;
        transition: opacity 1s ease;
        display: flex;
        flex-direction: column;
        #title {
            text-align: center;
            margin-bottom: 24px;
            img {
                height: 54px;
                width: 240px;
            }
        }
        #desc {
            h1 {
                color: #80BB3F;
                font-family: "PoppinsExtraBold";
                font-size: 20px;
                font-style: normal;
                font-weight: 800;
                line-height: 24px;
                margin: 0;
            }
            h2 {
                color: #484C4B;
                font-family: "PoppinsExtraBold";
                font-size: 18px;
                font-style: normal;
                font-weight: 800;
                line-height: 24px;
            }
            p {
                color: #484C4B;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 16px;
                margin-top: 16px;
                margin-bottom: 37px;
            }
            img {
                display: none;
            }
        }
        #img {
            display: flex;
            justify-content: center;
        }
    }
    .life-katageng-back {
        top:60%;
        margin-left: 24px;
        img {
            height:36px;
            width:36px
        }
    }
    .life-katageng-next {
        top:60%;
        margin-right: 24px;
        img {
            height:36px;
            width:36px
        }
    }
}
@media only screen and (min-width: 975px) {
    .life-katageng-swiper {
        // height: 370px;
        width: 100%;
        border-radius: 16px;
        background: #fff;
        padding: 40px 129px;
        transition: opacity 1s ease;
        display: flex;
        #title {
            display: none;
        }
        #desc {
            h1 {
                color: #80BB3F;
                font-family: "PoppinsExtraBold";
                font-size: 40px;
                font-style: normal;
                font-weight: 800;
                line-height: 52px;
                margin: 0;
            }
            h2 {
                color: #484C4B;
                font-family: "PoppinsExtraBold";
                font-size: 32px;
                font-style: normal;
                font-weight: 800;
                line-height: 40px;
            }
            p {
                color: #484C4B;
                font-size: 20px;
                font-style: normal;
                font-weight: 500;
                line-height: 28px;
                margin-top: 16px;
                margin-bottom: 24px;
            }
            img {
                height: 45px;
                width: 200px;
            }
        }
        #img {
            display: flex;
            align-items: center;
        }
    }
    .life-katageng-back {
        margin-left: 40px;
        top:48%;
    }
    .life-katageng-next {
        margin-right: 40px;
        top:48%;
    }
}
.life-katageng-back {
    position: absolute;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
.life-katageng-next {
    position: absolute;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
}
</style>