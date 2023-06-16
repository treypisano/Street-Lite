import jwtFetch from "../../store/jwt";
import { useEffect, useState, useRef } from "react";
import { updateComment, deleteComment } from "../../store/comment";
import { useDispatch } from "react-redux";

const CommentItem = ({ comment }) => {
  const dispatch = useDispatch();
  const [author, setAuthor] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(comment._id));
    setIsDropdownOpen(false);
  };

  const fetchUserById = async (comment) => {
    const res = await jwtFetch(`/api/users/author/${comment.userId}`);
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
  const commentCreatedAt = comment.createdAt;
  const currentTime = new Date();
  const createdAt = new Date(commentCreatedAt);

  // Calculate the difference in milliseconds
  const timeDifference = currentTime - createdAt;

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Create a function to format the time difference
  function formatTimeAgo(time) {
    if (time < 60) {
      return time + "s";
    } else if (time < 60 * 60) {
      return Math.floor(time / 60) + "m";
    } else if (time < 60 * 60 * 24) {
      return Math.floor(time / (60 * 60)) + "h";
    } else {
      return Math.floor(time / (60 * 60 * 24)) + "d";
    }
  }
  // Format the time difference
  const timeAgo = formatTimeAgo(seconds);

  if (!author) return <div>loading...</div>;

  return (
    <div>
      <div className="comment-container">
        <h5>{author.username}</h5>
        <p>{comment.body}</p>
        <h6>{timeAgo}</h6>
        <button onClick={toggleDropdown}>Options</button>
        {isDropdownOpen && <button onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
};
export default CommentItem;
