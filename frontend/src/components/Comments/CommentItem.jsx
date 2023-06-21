import jwtFetch from "../../store/jwt";
import { useEffect, useState, useRef } from "react";
import { updateComment, deleteComment } from "../../store/comment";
import { useDispatch, useSelector } from "react-redux";
import "./CommentItem.css";

const CommentItem = ({ comment }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const dropdownRef = useRef(null);

  const [author, setAuthor] = useState(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [isEdited, setIsEdited] = useState(
    comment.createdAt !== comment.updatedAt
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(comment._id));
    setIsDropdownOpen(false);
  };

  const handleUpdate = () => {
    setIsEditing(true);
    setIsDropdownOpen(false);
  };

  const handleSave = () => {
    // Dispatch the updateComment action to save the edited comment
    dispatch(updateComment(comment._id, { body: editedBody }));

    // Exit the editing mode
    setIsEditing(false);
    setIsEdited(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
        <div className="comment-header">
          <div className="left-header">
            <h5>{author.username}</h5>
            <h6>{timeAgo}</h6>
            {isEdited && (
              <span className="edited-indicator">
                <h6>(edited) </h6>
              </span>
            )}
          </div>
          <div className="right-header">
            {currentUser && currentUser._id === author._id && (
              <div className="event-dropdown-container" ref={dropdownRef}>
                <button className="event-dropdown-btn" onClick={toggleDropdown}>
                  ...
                </button>
                {isDropdownOpen && (
                  <div className="event-dropdown-content">
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {isEditing ? (
          <div>
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              placeholder="Edit your comment..."
              required
              className="edit-textarea"
            ></textarea>
            <button onClick={handleSave} className="save-edit-but">
              Save{" "}
            </button>
          </div>
        ) : (
          <div>
            <p>{comment.body}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
