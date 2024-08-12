<template>
    <div>
        <div class="snk-rewards-box1">
            <div class="snk-rewards-box1-img">
                <div class="home-container rewards-box-align">
                    <div class="pt30">
                        <div class="rewards-btn Baloo center">
                            Pertanyaan Eden Rewards
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
                    <p class="header">Apa itu Eden Rewards?</p>
                    <div class="content">
                        <p>Eden Rewards adalah program loyalitas berupa tingkatan membership yang terdiri dari level Pemula, Juragan, dan Konglomerat. Semua pengguna aplikasi EdenFarm yang telah upgrade ke akun bisnis akan otomatis menjadi member Eden Rewards. Makin tinggi levelmu, makin banyak keuntungan yang Pelanggan dapatkan.</p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Apa itu Lapak?</p>
                    <div class="content">
                        <p>Lapak adalah titik pencapaian (checkpoint) yang ada di setiap level Eden Rewards. Kamu perlu melakukan transaksi untuk mencapai setiap Lapak. Setelah mencapai Lapak, kamu bisa mendapat keuntungan berupa  Bonus EdenPoint.</p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Bagaimana cara naik/mempertahankan level di Eden Rewards?</p>
                    <div class="content">
                        <p>Semua Pelanggan akan mulai dari level Pemula sejak Eden Rewards diberlakukan. Untuk level Juragan dan Konglomerat, terdapat nilai transaksi yang perlu dicapai untuk mempertahankan level atau naik level di bulan berikutnya. Cek lebih lanjut di halaman S&K.</p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Apakah bisa turun level?</p>
                    <div class="content">
                        <p>Pelanggan tidak akan turun ke level Eden Rewards yang lebih rendah saat tidak melakukan transaksi. Namun, level Eden Rewards Pelanggan akan kembali ke level Pemula di setiap awal tahun.</p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Transaksi produk apa saja yang dapat terhitung di Eden Rewards?</p>
                    <div class="content">
                        <p>Pelanggan harus melakukan pembelanjaan produk Fresh (Sayur, Buah, Hidroponik, Cabe, Bawang), Meat & Seafood (Aneka Daging & Ikan), atau Processed Food (Bahan Pangan Olahan) agar dapat terhitung di Eden Rewards.</p>
                    </div>
                </li>
                <li>
                    <input type="checkbox" checked>
                    <i></i>
                    <p class="header">Bagaimana cara menyampaikan keluhan atau pertanyaan?</p>
                    <div class="content">
                        <p>Silakan hubungi nomor Customer Support yang terdapat di Pusat Bantuan aplikasi EdenFarm atau Pelanggan dapat membaca syarat dan ketentuan lengkap di <a href="https://landingpage.edenfarm.tech/Syarat-dan-Ketentuan-Eden-Reward/">sini</a>.</p>
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
                    slug: 'Pertanyaan-Seputar-Eden-Reward'
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