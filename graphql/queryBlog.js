import gql from 'graphql-tag'

export const queryBlog = gql`
query queryBlog ($locale:I18NLocaleCode) {
  blog(locale:$locale) {
    data {
      attributes {
        title
        placeholder
        pick_title
        promo_title
        blog_title
        all
        press_release_title
        result_title
        notfound_title
        find_other
        new_articles_title
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

export const queryBlogDetail = gql`
query queryBlog ($locale:I18NLocaleCode) {
  blog(locale:$locale) {
    data {
      attributes {
        by
        related_articles_title
      }
    }
  }
}
`

export const queryTopPicks = gql`
query queryTopPicks ($locale:I18NLocaleCode, $page:Int, $pageSize:Int, $pick:Boolean) {
  articles(
    filters: {
      top_pick: { eq: $pick }
    }
    locale: $locale
    sort: "publishedAt:desc"
    pagination: { page: $page, pageSize: $pageSize }
  ) {
    data {
      id,
      attributes {
        title
        slug
        description
        image {
          data {
            attributes {
              url
              caption
            }
          }
        }
        category {
          data {
            attributes {
              name
            }
          }
        }
        publishedAt
      }
    }
  }
}
`
export const queryPromo = gql`
query queryPromo($locale: I18NLocaleCode, $page: Int, $pageSize: Int) {
  articles(
    filters: {
      category: { 
        id : {
          in: [2, 7]
        }
      }
    }
    sort: "publishedAt:desc"
    locale: $locale
    pagination: { page: $page, pageSize: $pageSize }
  ) {
    data {
      id
      attributes {
        title
        slug
        image {
          data {
            attributes {
              url
              caption
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
`
export const queryCategory = gql`
query queryCategory ($locale: I18NLocaleCode) {
  categories(
    filters: {
      id : {
        in : [3, 4, 5, 8, 9, 10]
      }
    }
    locale: $locale
  ){
    data {
      id,
      attributes {
        name
      }
    }
  }
}
`

export const queryCategoryAll = gql`
query queryCategory ($locale: I18NLocaleCode) {
  categories(
    locale: $locale
  ){
    data {
      id,
      attributes {
        name
      }
    }
  }
}
`

export const queryOurBlog = gql`
query queryOurBlog($locale: I18NLocaleCode, $page: Int, $pageSize: Int, $category : [ID!]) {
  articles(
    filters: {
      category: { 
        id : {
          in: $category
        }
      }
    }
    sort: "publishedAt:desc"
    locale: $locale
    pagination: { page: $page, pageSize: $pageSize }
  ) {
    data {
      id
      attributes {
        title
        slug
        image {
          data {
            attributes {
              url
              caption
            }
          }
        }
        category {
          data {
            attributes {
              name
            }
          }
        }
        publishedAt
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
`
export const queryPressRelease = gql`
query queryPressRelease($locale: I18NLocaleCode, $page: Int, $pageSize: Int, $category : [ID!]) {
  articles(
    filters: {
      category: { 
        id : {
          in: $category
        }
      }
    }
    sort: "publishedAt:desc"
    locale: $locale
    pagination: { page: $page, pageSize: $pageSize }
  ) {
    data {
      id
      attributes {
        title
        slug
        image {
          data {
            attributes {
              url
              caption
            }
          }
        }
        category {
          data {
            attributes {
              name
            }
          }
        }
        publishedAt
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
`
export const querySearch = gql`
query querySearch($title : String, $locale:I18NLocaleCode, $page:Int, $pageSize:Int) {
  articles(
    filters: {
      title: { contains: $title }
    }
    locale: $locale
    sort: "publishedAt:desc"
    pagination: { page: $page, pageSize: $pageSize }
  ) {
    data {
      id,
      attributes {
        title
        slug
        description
        image {
          data {
            attributes {
              url
              caption
            }
          }
        }
        category {
          data {
            attributes {
              name
            }
          }
        }
      }
    },
    meta {
      pagination {
        total,
        page,
        pageSize,
        pageCount
      }
    }
  }
}
`
export const queryBySlug = gql`
query queryBySlug($locale:I18NLocaleCode, $slug:String) {
  articles(
    filters : {
      slug : {
        eq : $slug
      }
    }
    locale:$locale
  ) {
    data {
      id,
      attributes {
        title
        slug
        description
        image {
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
        content
        publishedAt
        category {
          data {
            id
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
`