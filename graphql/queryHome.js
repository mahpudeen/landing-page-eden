import gql from 'graphql-tag'

export const queryHome = gql`
query queryHome ($locale:I18NLocaleCode) {
  home(locale:$locale) {
    data {
      attributes {
        banner {
          data {
            attributes {
              url,
              caption
            }
          }
        },
        banner_mobile {
          data {
            attributes {
              url,
              caption
            }
          }
        },
        tagline_title,
        tagline_body,
        tagline_image {
          data {
            attributes {
              url,
              caption
            }
          }
        },
        service_title,
        service {
          title,
          body
        },
        product_title,
        product_body,
        product {
          title,
          url,
          img {
            data {
              attributes {
                url,
                caption
              }
            }
          }
        },
        client_title,
        client_body,
        client {
          img  {
            data {
              attributes {
                url,
                caption
              }
            }
          }
        },
        media_title,
        media {
          img {
            data {
              attributes {
                url,
                caption
              }
            }
          }
        },
        news_title,
        statistic_title,
        statistic {
          title,
          value
        },
        benefit_title,
        benefit {
          title,
          body,
          img {
            data {
              attributes {
                url,
                caption
              }
            }
          }
        },
        download_img {
            data {
              attributes {
                url,
                caption
              }
            }
        },
        download_title,
        download_playstore_url,
        download_appstore_url,
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
  },
  blog(locale:$locale) {
    data {
      attributes {
        all
      }
    }
  }
}
`
export const queryNoFound = gql`
query queryNoFound($locale : I18NLocaleCode) {
  glossary(locale:$locale) {
    data {
      attributes {
        error_title
        error_body
        back_to_home
      }
    }
  }
}
`