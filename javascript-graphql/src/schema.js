export default `
  type Author {
    id: ID! # the ! means that every author object _must_ have an id
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }

  type Post {
    id: ID!
    title: String
    author: Author
    votes: Int
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    upvotePost (
      postId: ID!
    ): Post
  }


  schema {
    query: Query
    mutation: Mutation
  }
`
