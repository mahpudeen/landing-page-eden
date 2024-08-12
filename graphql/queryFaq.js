import gql from "graphql-tag";

export const queryFaq = gql`
  query queryFaq($locale: I18NLocaleCode) {
    faq(locale: $locale) {
      data {
        attributes {
          title
          placeholder_search
          top_title
          topic_title
          question_about
          contact_title
          contact_desc
          contact {
            title
            url
            body
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
          category_title
          survey_title
          survey_yes
          survey_no
          survey_yes_desc
          survey_no_desc
          related_article
          no_results
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

export const queryfaqCategories = gql`
  query queryfaqCategories($locale: I18NLocaleCode) {
    faqCategories(locale: $locale) {
      data {
        id
        attributes {
          title
          slug
          img {
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
`

export const queryFaqLists = gql`
  query queryFaqLists($locale: I18NLocaleCode) {
    faqLists(
      locale: $locale
      sort: "top_faq:asc"
      filters: { top_faq: { ne: null } }
      pagination: { pageSize: 5 }
    ) {
      data {
        id
        attributes {
          title
          slug
          content
          faq_category {
            data {
              id
              attributes {
                title
                slug
              }
            }
          }
          top_faq
        }
      }
    }
  }
`

export const querySearchFaqLists = gql`
  query querySearchFaqLists($locale: I18NLocaleCode, $search: String) {
    faqLists(locale: $locale, filters: { title: { contains: $search } }) {
      data {
        id
        attributes {
          title
          slug
          content
          faq_category {
            data {
              id
              attributes {
                title
                slug
              }
            }
          }
          top_faq
        }
      }
    }
  }
`

export const queryCategoryFaqLists = gql`
  query queryCategoryFaqLists($locale: I18NLocaleCode, $category: String ,$category_id : ID) {
    faqLists(
      locale: $locale
      filters: {
        faq_category: {
          or: [{ id: { eq: $category_id } }, { slug: { eq: $category } }]
        }
      }
    ) {
      data {
        id
        attributes {
          title
          slug
          content
          faq_category {
            data {
              id
              attributes {
                title
                slug
              }
            }
          }
          top_faq
        }
      }
    }
  }
`

export const querySlugFaqLists = gql`
query querySlugFaqLists ($locale:I18NLocaleCode, $slug: String) {
  faqLists(
    locale:$locale,
    filters: { 
      slug : {
        eq : $slug
      }
    }
  ) {
      data {
        id
        attributes {
          title
          slug
          content
          faq_category {
            data {
              id
              attributes {
                title
                slug
              }
            }
          }
          top_faq
        }
      }
  }
}
`