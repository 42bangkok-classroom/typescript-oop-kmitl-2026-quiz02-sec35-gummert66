import axios from 'axios';

interface Comment {
  postId?: number | null;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentCounts {
  [key: number]: number;
}

export const countCommentsByPost = async (): Promise<CommentCounts> => {
  try { 
    const { data } = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments');

    if (!data || data.length === 0) {
      return {}; 
    }

    return data.reduce((acc, comment) => {
      if (comment.postId != null) {
        acc[comment.postId] = (acc[comment.postId] || 0) + 1;
      }
      return acc;
    }, {} as CommentCounts);

  } catch (error) {
    throw error;
  }
};