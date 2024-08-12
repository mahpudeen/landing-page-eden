import gql from 'graphql-tag'

export const queryFooter = gql`query queryFooter ($locale:I18NLocaleCode) {
  footer(locale:$locale) {
    data {
      attributes {
        address_title,
        address {
          title,
          address,
          url
        }
        company_title,
        company {
          title,
          url,
          name
        },
        mitra_title,
        mitra {
          title,
          url,
          name
        },
        sosmed_title,
        sosmed {
          instagram,
          facebook,
          linkedin,
          tiktok,
          youtube
        }
        complaint_title,
        directorate,
        ministry,
        complaint_whatsapp,
        bounty,
        floating
      }
    }
  },
  navbar(locale:$locale) {
    data {
      attributes {
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
  glossary(locale:$locale) {
    data {
      attributes {
        find_us
      }
    }
  }
  home(locale:$locale) {
    data {
      attributes {
        download_playstore_url
        download_appstore_url
      }
    }
  }
}
`