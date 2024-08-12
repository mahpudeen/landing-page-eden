import gql from 'graphql-tag'

export const queryNavbar = gql`
query queryNavbar ($locale:I18NLocaleCode) {
  navbar(locale:$locale) {
    data {
      attributes {
        menu {
          id,
          title,
          url,
          name,
          child {
            id,
            title,
            url,
            name
          }
        },
        mitra {
          title,
          url,
          name
        },
        whatsapp {
          title,
          url
        },
        email {
          title,
          url
        }
      }
    }
  }
}
`