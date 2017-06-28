export default {
  Query: {
    posts () {
      return posts
    },
  },
  Mutation: {
    upvotePost (_, { postId }) {
      const post = find(posts, { id: postId })
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`)
      }
      post.votes += 1
      return post
    },
  },
  Author: {
    posts (author) {
      return filter(posts, { authorId: author.id })
    },
  },
  Post: {
    author (post) {
      return find(authors, { id: post.authorId })
    },
  },
}
