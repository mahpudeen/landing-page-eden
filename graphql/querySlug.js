import gql from 'graphql-tag'

export const querySlug = gql`
query queryPageBySlug($slug : String) {
  pages(filters: {
    slug : { eq : $slug}
  }) {
    data {
      attributes {
        title
        slug
        content
      }
    }
  }
}
`