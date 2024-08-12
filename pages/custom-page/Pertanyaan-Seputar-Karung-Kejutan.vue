<template>
    <div>
        <div class="snk-rewards-box1">
            <div class="snk-rewards-box1-img">
                <div class="home-container rewards-box-align">
                    <div class="pt30">
                        <div class="rewards-btn Baloo center">
                            Pertanyaan Karung Kejutan
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="faq-dropdown OpenSans">
            <ul>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Apa perbedaan Eden Rewards dengan Kejutan Karung Bawang?</p>
                    <div class="content">
                        <p style="text-align:justify;">Eden Rewards adalah program loyalitas yang menawarkan berbagai keuntungan untuk Pelanggan bisnis di aplikasi EdenFarm, sementara Kejutan Karung Bawang adalah program tantangan belanja untuk member Eden Rewards.</p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Transaksi produk apa saja yang dapat terhitung di Kejutan Karung Bawang?</p>
                    <div class="content">
                        <p style="text-align:justify;">Pelanggan harus melakukan pembelanjaan produk Fresh (Sayur, Buah, Hidroponik, Cabe, Bawang), Meat & Seafood (Aneka Daging & Ikan), atau Processed Food (Bahan Pangan Olahan) agar dapat terhitung di Kejutan Karung Bawang. </p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Bagaimana cara membuka Kejutan Karung Bawang? </p>
                    <div class="content">
                        <p style="text-align:justify;">Pelanggan dapat memulai progres Kejutan Karung Bawang terhitung setelah menjadi level Juragan dan melakukan transaksi hingga mencapai target karung kejutan.</p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Sampai kapan masa berlaku voucher yang didapat dari Kejutan Karung Bawang?</p>
                    <div class="content">
                        <p style="text-align:justify;">Voucher berlaku hingga program Kejutan Karung Bawang berakhir. Jika voucher tidak digunakan hingga program berakhir, voucher akan hangus dan tidak dapat diuangkan. </p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Bagaimana Kejutan Karung Bawang berisi logam mulia akan dikirim?</p>
                    <div class="content">
                        <p style="text-align:justify;">Logam mulia akan dikirim di periode pengiriman terdekat ke nama penerima, kontak, dan alamat yang terdaftar pada aplikasi Edenfarm.</p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Bagaimana cara menyampaikan keluhan atau pertanyaan?</p>
                    <div class="content">
                        <p style="text-align:justify;">Silakan hubungi nomor Customer Support yang terdapat di Pusat Bantuan aplikasi EdenFarm atau Pelanggan dapat membaca syarat dan ketentuan lengkap di <a href="https://landingpage.edenfarm.tech/Syarat-dan-Ketentuan-Karung-Kejutan/">sini</a>.</p>
                    </div>
                </li>
                </ul>
        </div>
    </div>
</template>
<script>
import { querySlug } from '~/graphql/querySlug'
export default {
    layout: 'custom-page',
    head() {
        return {
            title: this.page.title+' | Eden Pangan Indonesia',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: this.page.title+' | Eden Pangan Indonesia'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.page.title
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.page.title
                },
                {
                    property:"og:type",
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    property:"og:image",
                },
                {
                    property:"og:url",
                    content: process.env.BASE_URL+this.$route.fullPath
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property:"og:description",
                    content: this.page.title
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.page.title+' | Eden Pangan Indonesia'
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.page.title
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                },
            ],
        }
    },
    data() {
        return {
            pages : [],
            page : {
                "title": "",
                "slug": "",
                "content": ""
            },
        }
    },
    created() {
        this.$apollo.queries.pages.refetch()
    },
    apollo: {
        pages: {
            prefetch: true,
            query: querySlug,
            variables () {
                return { 
                    slug: 'Pertanyaan-Seputar-Karung-Kejutan'
                }
            },
            manual: true,
            result ({ data, loading }) {
                if (!loading) {
                    if (data.pages.data.length>0) {
                        this.page = data.pages.data[0].attributes
                    } else {
                        try {
                            if (process.browser){
                                window.location.href = process.env.BASE_URL+'/404'
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            },
        },
    },
}
</script>