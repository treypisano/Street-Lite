import React, { useEffect, useState } from "react";
import jwtFetch from "../../store/jwt";

const CommentItem = ({ comment }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchUserById = async (userId) => {
      try {
        const res = await jwtFetch(`/api/users/${userId}`);
        if (res.ok) {
          const author = await res.json();
          setAuthor(author);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUserById(comment.userId);
  }, []);

  return (
    <div>
      <p>{comment.body}</p>
      <p>Posted by: {author ? author.username : "Unknown"}</p>
    </div>
  );
};

export default CommentItem;
