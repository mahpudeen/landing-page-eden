import gql from 'graphql-tag'

export const queryAbout = gql`
query queryAbout($locale:I18NLocaleCode) {
  about(locale:$locale) {
    data {
      attributes {
        about_title,
        our_story_title,
        our_story_body,
        founder_title,
        founder {
          img {
            data {
              attributes {
                url,
                caption
              }
            }
          },
          name,
          position,
          linkedin
        },
        partner_title,
        partner_body,
        partner {
          title,
          body,
          selling_point_title,
          selling_point,
          advantage_title,
          advantage,
          button,
          url,
          img1 {
            data {
              attributes {
                url,
                caption
              }
            }
          },
          img2 {
            data {
              attributes {
                url,
                caption
              }
            }
          }
        },
        investor_title,
        investor {
          img {
            data {
              attributes {
                url,
                caption
              }
            }
          }
        },
        investor_name,
        investor_company,
        investor_email,
        investor_thank,
        investor_button,
        value_title,
        value {
          img {
            data {
              attributes {
                url,
                caption
              }
            }
          },
          title,
          body,
          initial
        },
        visimisi_title,
        vision_title,
        vision,
        mission_title,
        mission {
          value
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
  glossary(locale:$locale) {
    data {
      attributes {
        read_more
      }
    }
  }
}
`