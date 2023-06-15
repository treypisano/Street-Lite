// import React, { useEffect, useState } from "react";
// import jwtFetch from "../../store/jwt";

// const CommentItem = ({ comment }) => {
//   const [author, setAuthor] = useState(null);

//   useEffect(() => {
//     const fetchUserById = async (userId) => {
//       try {
//         const res = await jwtFetch(`/api/users/${userId}`);
//         if (res.ok) {
//           const author = await res.json();
//           setAuthor(author);
//         } else {
//           throw new Error(
//             `Failed to fetch user: ${res.status} ${res.statusText}`
//           );
//         }
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };
//     fetchUserById(comment.userId);
//   }, []);

//   return (
//     <div>
//       <p>{comment.body}</p>
//       <p>Posted by: {author ? author.username : "Unknown"}</p>
//     </div>
//   );
// };

// export default CommentItem;

import jwtFetch from "../../store/jwt";
import { useEffect, useState } from "react";

const CommentItem = ({ comment }) => {
  const [author, setAuthor] = useState();
  const fetchUserById = async (comment) => {
    debugger;
    const res = await jwtFetch(`/api/users/${comment.userId}`);
    if (res.ok) {
      const author = await res.json();
      return author;
    }
  };
  useEffect(() => {
    fetchUserById(comment).then((user) => {
      setAuthor(user);
    });
  }, []);
  return (
    <div>
      <p>{comment.body}</p>
      <p>Posted by: {comment.userId}</p>
    </div>
  );
};
export default CommentItem;
