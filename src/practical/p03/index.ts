import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostWithCommentCount {
  postId: number;
  title: string;
  totalComments: number; 
}

export const mapPostWithCommentCount = async (): Promise<PostWithCommentCount[]> => {
  try {
    const [postsResponse, commentsResponse] = await Promise.all([
      axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts'),
      axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
    ]);

    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    if (!posts || posts.length === 0) {
      return [];
    }

    return posts.map((post) => {
      const count = comments.filter((comment) => comment.postId === post.id).length;
      
      return {
        postId: post.id,
        title: post.title,
        totalComments: count,
      };
    });

  } catch (error) {
    throw error;
  }
};