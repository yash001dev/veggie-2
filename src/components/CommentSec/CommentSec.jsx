import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addComment } from "../../redux/actions/cartActions";
import "./CommentSec.css";

function CommentSec({ comment, Pproduct_id, setRload }) {
  const { user } = useSelector((state) => state.userLoginReducer);
  const history = useHistory();

  const [loadMore, setLoadmore] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (comment.length) {
      setShowMore(true);
    }
  }, [comment]);

  const dispatch = useDispatch();

  const [commentdata, setCommentdata] = useState("");

  const handleComment = () => {
    if (!Object.keys(user).length) {
      history.push("/login");
    }

    dispatch(addComment(Pproduct_id, commentdata));
    setRload(true);
  };

  return (
    <div className="CommentSec_container">
      <div className="CommentSec_cont">
        <div className="aboutproduct_title">
          Comments
          <div className="soloproduct_line" />
        </div>
        <div className="commentsec_comment_box">
          <div className="commentsec_comment_box_title">Leave Reply</div>
          <textarea
            name="comments"
            className="comment_sec_cmnt_box"
            placeholder="Post Your Comments"
            onChange={(e) => setCommentdata(e.target.value)}
          ></textarea>
          <div
            className="commentsec_comment_box_btn"
            onClick={() => handleComment()}
          >
            Post
          </div>
        </div>
        <div className="comments_sec_comment_container">
          {comment.length === 0 ? (
            <div
              key="123"
              style={{ color: "red", fontWeight: 500, fontSize: "1.1rem" }}
            >
              No Comments Available{" "}
            </div>
          ) : (
            comment.slice(0, loadMore ? 999 : 3).map((cmnt, key) => {
              return (
                <div key={key}>
                  <div className="comments_sec_comment">
                    <div className="comment_sec_comment_img">
                      <img
                        className="comment_sec_comment_img_data"
                        src="data:image/png;base64,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"
                        alt="comments_user"
                      />
                    </div>
                    <div className="comments_sec_comment_data">
                      <div className="comments_sec_user_name">
                        {cmnt.user_name}
                      </div>
                      <div className="comments_sec_user_date">
                        {cmnt.created_at}
                      </div>
                      <div className="comments_sec_user_comment">
                        {cmnt.comment}
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })
          )}

          {showMore ? (
            <div className="load_more" onClick={() => setLoadmore(!loadMore)}>
              {loadMore ? "See Less" : "See More"}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentSec;
