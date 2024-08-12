import gql from 'graphql-tag'

export const queryTuangtuang = gql`
query queryTuangtuang ($locale:I18NLocaleCode) {
    tuangtuang(locale:$locale) {
        data {
            attributes {
                title {
                    data {
                      attributes {
                        url
                        caption
                      }
                    }
                }
                title_mobile {
                    data {
                      attributes {
                        url
                        caption
                      }
                    }
                }
                description
                story_title
                story_desc
                story_img {
                    data {
                        attributes {
                            url
                            caption
                        }
                    }
                }
                available_title
                available_business_title
                available_business_desc
                available_business_img {
                    data {
                        attributes {
                            url
                            caption
                        }
                    }
                }
                available_retail_title
                available_retail_desc
                available_retail_img {
                    data {
                        attributes {
                            url
                            caption
                        }
                    }
                }
                product_business_title
                product_business_desc
                product_retail_title
                product_retail_desc
                product_btn
                distributor_title
                distributor_desc
                distributor_wa
                distributor_wa_url
                instagram_url
                tiktok_url
                shopee_url
                tokopedia_url
                tiktokshop_url
                distributor_img {
                    data {
                        attributes {
                            url
                            caption
                        }
                    }
                }
                seo {
                    metaTitle
                    metaDescription
                    metaImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    keywords
                }
            }
        }
    }
}
`
export const queryTuangtuangCategory = gql`
query queryTuangtuangCategory ($locale:I18NLocaleCode) {
    tuangtuang(locale:$locale) {
        data {
            attributes {
                category {
                    title
                    tag_product
                    image_url {
                        data {
                            attributes {
                                url
                                caption
                            }
                        }
                    }
                }
            }
        }
    }
}
`
export const queryProductTuangtuangs = gql`
query queryProductTuangtuangs ($locale:I18NLocaleCode) {
    productTuangtuangs(locale:$locale, sort: "title:asc", pagination : {limit:100}) {
        data {
            attributes {
              	title
              	description
              	image {
                    data {
                        attributes {
                            url
                            caption
                        }
                    }
                }
                content
                order_min_qty
                item_uom_name
                url_shopee
                url_tokopedia
                url_tiktokshop
            }
        }
    }
}
`