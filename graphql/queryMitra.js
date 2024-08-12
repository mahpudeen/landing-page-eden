import gql from 'graphql-tag'

export const queryMitra = gql`
query queryMitra ($locale:I18NLocaleCode) {
  mitra(locale:$locale) {
    data {
      attributes {
        title
        advantage_title
        advantage {
          title
          body
          img {
            data {
              attributes {
                url
                caption
              }
            }
          }
        }
        theysaid_title
        theysaid {
          img {
            data {
              attributes {
                url
                caption
              }
            }
          }
          body
        }
        register_title
        register_body
        register_term
        register_customer
        register_supplier
        register_now
        mitra {
          title
          url
          img {
            data {
              attributes {
                url
                caption
              }
            }
          }
          list {
            list
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
        supplier {
          title
          url
          img {
            data {
              attributes {
                url
                caption
              }
            }
          }
          list {
            list
          }
        }
      }
    }
  }
}
`