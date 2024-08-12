<template>
    <div>
        <div class="rewards-box1">
            <div class="karung-box1-img">
                <div class="home-container rewards-box-align">
                    <div class="karung-box1-title1 Baloo">
                        Yuk kenali apa itu <br> Karung Kejutan Bawang
                    </div>
                    <div class="rewards-box1-body">
                        <strong>Kejutan Karung Bawang EdenFarm</strong> merupakan program tantangan belanja di aplikasi EdenFarm untuk mendapatkan reward berupa voucher diskon dan logam mulia bernilai total jutaan rupiah.
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="home-container">
                <div class="rewards-btn Baloo center">
                    Reward <br> Karung Kejutan Bawang
                </div>
                <div class="rewards-box2-body">
                    <div class="rewards-scrollmenu">
                        <img height="200px" src="~/assets/images/karung-kejutan-rewards.png">
                    </div>
                </div>
                <div class="rewards-btn Baloo center">
                    Syarat dan Ketentuan
                </div>
                <div class="rewards-box3-body mr10">
                    <ol>
                        <li>Program Kejutan Karung Bawang EdenFarm berlaku khusus untuk pelanggan bisnis yang bertransaksi melalui aplikasi EdenFarm.</li>
                        <li>Periode program berlaku efektif terhitung dari tanggal 5 Januari - 30 November 2023.</li>
                        <li>Program Kejutan Karung Bawang EdenFarm berlaku untuk Pelanggan level Juragan dan Konglomerat.</li>
                        <li>Program Kejutan Karung Bawang EdenFarm berlaku untuk tipe pelanggan bisnis Kuliner Tradisional, Pasar Basah, HORECA (Hotel, Restoran & Cafe), dan Rekan Eden.</li>
                        <li>Hanya nominal transaksi dari pembelanjaan produk Fresh (Sayur, Buah, Hidroponik, Cabe, Bawang), Meat & Seafood (Aneka Daging & Ikan), atau Processed Food (Bahan Pangan Olahan) yang diperhitungkan sebagai pencapaian nominal transaksi untuk dapat mengikuti program Kejutan Karung Bawang EdenFarm.</li>
                        <li>Transaksi yang sah dan dapat mengikut program Kejutan Karung Bawang EdenFarm adalah transaksi dengan status selesai dan lunas pembayaran.</li>
                        <li>Progres Kejutan Karung Bawang EdenFarm akan terhitung maksimal 3x24 jam setelah status transaksi selesai dan pembayaran lunas.</li>
                        <li>Isi karung yang sudah terbuka <strong>minimal 7 hari sebelum tanggal periode pengiriman</strong>, akan mulai dikirim pada tanggal pengiriman dibawah ini:
                            <ol type="a">
                                <li>Periode pengiriman 1: Mulai 3 April 2023</li>
                                <li>Periode pengiriman 2: Mulai 3 Juli 2023</li>
                            </ol>
                        </li>
                        <li>Khusus untuk isi karung yang terbuka pada akhir periode program atau tepat di tanggal berakhirnya program yaitu tanggal 30 November 2023, isi karung kejutan akan mulai dikirim pada tanggal 12 Desember 2023.</li>
                        <li>Karung yang telah terbuka dalam kurun waktu 7 (Tujuh) hari sebelum tanggal periode pengiriman sebagaimana dimaksud pada poin 6 dan 7 Syarat dan Ketentuan ini, EdenFarm akan melakukan pengiriman Karung Kejutan kepada pelanggan selambat-lambatnya 90 (Sembilan puluh) hari setelah tanggal periode pengiriman (sesuai dengan Periode Pengiriman yang berlaku).</li>
                        <li>Isi Karung berupa voucher akan dikirimkan ke halaman voucher aplikasi EdenFarm pelanggan secara otomatis.</li>
                        <li>Isi Karung berupa Logam Mulia akan dikirim oleh Edenfarm kepada Pelanggan sesuai dengan nama penerima, kontak dan alamat yang terdaftar pada aplikasi Edenfarm tanpa ada konfirmasi terlebih dahulu.</li>
                        <li>Apabila pelanggan tidak menggunakan reward Karung berupa voucher yang telah didapatkan sampai periode program berakhir, maka voucher tersebut akan menjadi hangus dan tidak berlaku.</li>
                        <li>Isi karung yang hangus sebagaimana disebutkan dalam poin 11 ini, tidak dapat ditukarkan dalam bentuk uang dan/atau bentuk lainnya kepada EdenFarm.</li>
                        <li>Segala bentuk kesalahan, kelalaian dan/atau penipuan yang mengatasnamakan EdenFarm yang dilakukan oleh Pelanggan maupun pihak ketiga lainnya sehingga menyebabkan tidak sesuainya alamat pengiriman isi Karung, maka hal tersebut merupakan tanggung jawab dan risiko dari Pelanggan.</li>
                        <li>Jika di kemudian hari dalam pelaksanaan Kejutan Karung Bawang EdenFarm telah ditemukan adanya indikasi kecurangan, manipulasi dan peretasan aplikasi atau bentuk pelanggaran lainnya, maka isi Karung yang telah terbuka akan menjadi tidak berlaku dan ditarik kembali selama dapat dibuktikan oleh EdenFarm.</li>
                        <li>Syarat dan ketentuan dapat berubah sewaktu-waktu tanpa ada pemberitahuan sebelumnya.</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { querySlug } from '~/graphql/querySlug'
export default {
    layout: 'custom-page',
    head() {
        return {
            title: 'Karung Kejutan Bawang | Eden Pangan Indonesia',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property:"og:title",
                    content: 'Karung Kejutan Bawang | Eden Pangan Indonesia'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Karung Kejutan Bawang'
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'Karung Kejutan Bawang'
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
                    content: 'Karung Kejutan Bawang'
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: "summary"
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: 'Karung Kejutan Bawang | Eden Pangan Indonesia'
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: 'Karung Kejutan Bawang'
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
            prefetch: false,
            query: querySlug,
            variables () {
                return { 
                    slug: 'Syarat-dan-Ketentuan-Karung-Kejutan'
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