<template>
    <div class="home-container" :class="$store.state.offsetTop >= 64 && $store.state.modeDesktop?'mt-offset':''">
        <div class="error-page">
            <img src="~/assets/images/notfound.png" alt="">
            <h2>{{glossary.error_title}}</h2>
            <p>{{glossary.error_body}}</p>
        </div>
    </div>
</template>
<script>
import { queryNoFound } from '~/graphql/queryHome'
export default {
    data() {
        return {
            glossary: {
                "error_title": "",
                "error_body": ""
            }
        }
    },
    apollo: {
        glossary: {
            prefetch: true,
            query: queryNoFound,
            variables () {
                return { 
                    locale: this.$i18n.locale
                }
            },
            manual : true,
            result ({ data, loading }) {
                if (!loading) {
                    this.glossary = data.glossary.data.attributes
                }
            },
        }
    },
    computed : {
        urlLocale() {
            if (this.$i18n.locale == 'id') {
                return '/'
            } else {
                return '/en/'
            }
        }
    },
}
</script>