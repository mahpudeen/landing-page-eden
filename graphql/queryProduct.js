import gql from 'graphql-tag'

export const queryProduct = gql`
query queryFooter ($locale:I18NLocaleCode) {
  product(locale:$locale) {
    data {
      attributes {
        title
        category_title
        all
        chip
        product_list_title
        search_placeholder
        minimum_purchase
        more
        search_title
        search_body
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