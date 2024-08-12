import gql from 'graphql-tag'

export const querylifeAtEden = gql`
query querylifeAtEden ($locale:I18NLocaleCode) {
	lifeAtEden(locale:$locale) {
		data {
			attributes {
				banner_title
        banner_tagline
        banner_btn
        welcome_title
        welcome_description
        core_title {
          data {
            attributes {
              url
              caption
            }
          }
        }
        core_title_mobile {
          data {
            attributes {
              url
              caption
            }
          }
        }
        core_tagline
        core {
          img {
            data {
              attributes {
                url
                caption
              }
            }
          }
          title
          body
          initial
        }
        grow_title {
          data {
            attributes {
              url
              caption
            }
          }
        }
        grow_description
        grow_img {
          data {
            attributes {
              url
              caption
            }
          }
        }
        grow_video_url
        geng_tagline
        geng_title {
          data {
            attributes {
              url
              caption
            }
          }
        }
        geng {
          description
          img {
            data {
              attributes {
                url
                caption
              }
            }
          }
        }
        days_title {
          data {
            attributes {
              url
              caption
            }
          }
        }
        days_description
        days {
          img {
            data {
              attributes {
                url
                caption
              }
            }
          }
          title
          body
        }
        katageng {
          img {
            data {
              attributes {
                url
                caption
              }
            }
          }
          name
          departement
          kata_geng
        }
        discover_title {
          data {
            attributes {
              url
              caption
            }
          }
        }
        discover {
          title
          body
          url
          img {
            data {
              attributes {
                url
                caption
              }
            }
          }
        }
        instagram_url
        tiktok_url
        youtube_url
        linkedin_url
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