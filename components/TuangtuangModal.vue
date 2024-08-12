<template>
    <b-modal v-model="modal" size="lg" centered hide-footer scrollable>
        <template #modal-header>
            <div class="tuang-title-modal">
                <h1>{{item_show.product_name}}</h1>
            </div>
            <div class="items-center">
            <button type="button" aria-label="Close" class="close" @click="hideModal">×</button>
            </div>
        </template>
        <div class="tuang-body-modal">
            <div id="img">
                <img v-lazy-load id="img-main" :src="item_show.image_url" alt="">
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
</template>
<script>
export default {
    props: {
        modal: {
            type: Boolean,
            required: true,
        },
        item: {
            type: Object
        },
    },
    data() {
        return {
            item_show: {
                imageUrl: '',
                title: '',
                description: '',
            },
        }
    },
    methods: {
        hideModal() {
            this.$store.commit('setModalTuang', false)
        },
    },
    watch: {
        item: {
            handler: function (val) {
                this.item_show = val
            },
            deep: true
        }
    }
}
</script>