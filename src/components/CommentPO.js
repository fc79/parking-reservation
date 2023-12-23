import CommentFormPO from "./CommentFormPO";
import UpdateFormPO from "./UpdateFormPO";
import ReplyFromPO from "./ReplyFormPO";
import "../css/commentPO.css";
import { BsReplyFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Accordion, Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Global.css";
import useFetchrate from "../hooks/useFetchRate";
import { BsReply } from "react-icons/bs";
import ShowMore from "react-show-more-button";
import Avatar from "@mui/material/Avatar";

const CommentPO = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  replyComment,
  deleteComment,
  addComment,
  parent = null,
  currentUserId,
}) => {
  // const [rate, setRate] = useState(0);
  const location = useLocation();

  //   let [rate] = useFetchrate(location.state.id);
  //   console.log("rate in comment.js: ", rate);

  //console.log(replies);
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.dateAdded) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parent ? parent : comment.id;
  const dateAdded = new Date(comment.dateAdded).toLocaleDateString();
  const [showMoreBool, setShowMoreBool] = useState(false);
  const [visible, setVisible] = useState(true);

  let firstReply = [];
  if (replies.length >= 0) firstReply[0] = replies[0];

  const first = replies.length >= 0 ? (firstReply[0] = replies[0]) : replies;

  let rateRes = null;

  let token = localStorage.getItem("ptoken");
  let auth = `Token ${token}`;

  const article = { id: localStorage.getItem("pID") };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  // useEffect(() => {
  //   // axios
  //   //   .get("http://127.0.0.1:8000/carowner/israted/", {
  //   //     headers: {
  //   //       Authorization: auth,
  //   //     },
  //   //     params: {
  //   //       id: location.state.id,
  //   //     },
  //   //   })
  //   //   .then((response) => {
  //   //     console.log("response israted : ", response.data.isRated);
  //   //     setRate(response.data.isRated);

  //   //     // setRate(response.data.isRated);
  //   //     console.log("asdasdasd", rate);
  //   //   })
  //   //   // .then((data) => {
  //   //   //   setRate(data.isRated);
  //   //   //   console.log("sec then", rate);
  //   //   // })
  //   //   .catch(() => {
  //   //     console.log("ERROR");
  //   //     setRate(1);
  //   //   });

  //   fetch(`http://127.0.0.1:8000/carowner/israted/?id=${location.state.id}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: auth,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       console.log("response israted : ", data.isRated);
  //       setRate(data.isRated);
  //       console.log("rate:", rate);
  //     })
  //     .catch((e) => {
  //       console.log("error:", e);
  //     });
  // });

  // const renderRate = () => {
  //   return rate;
  // };

  return (
    <div>
      {/* <ShowMore className="showMore-cm"> */}

      <div
        style={{
          marginRight: "5%",
          marginLeft: "5%",
          borderRight: "4px double gray",
        }}
      >
        <div key={comment.id} className="comment">
          <div className="comment-right-part ">
            <div>
              <div>
                <div
                  className="comment-content"
                  style={{
                    margin: "-3px 0 0 7px",
                    justifyContent: "flex-start",
                  }}
                >
                  <Avatar
                    style={{
                      margin: "-10px 0 15px 10px",
                    }}
                    {...stringAvatar(comment.author)}
                  />
                  <div className="comment-author">{comment.author}</div>
                  <div className="comment-date">{dateAdded}</div>
                </div>
              </div>
              <div>
                {!isEditing && (
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      borderStyle: "hidden",
                      borderRadius: "5px",
                      // borderColor: "gray",
                      background: "rgba(0,0,0,.03)",
                      padding: "3%",
                      borderBottom: "solid rgba(0,0,0,.125)",
                    }}
                  >
                    {comment.content}
                  </div>
                )}

                {isEditing && (
                  <UpdateFormPO
                    submitLabel="بروزرسانی"
                    hasCancelButton
                    initialText={comment.content}
                    handleSubmit={(text) => updateComment(text, comment.id)}
                    handleCancel={() => {
                      setActiveComment(null);
                    }}
                  />
                )}
                {isReplying && (
                  <ReplyFromPO
                    submitLabel="اضافه کردن"
                    hasCancelButton
                    // initialText={comment.content}
                    handleSubmit={(text) => replyComment(text, replyId)}
                    handleCancel={() => {
                      setActiveComment(null);
                    }}
                  />
                )}

                <div className="comment-actions d-flex justify-content-start">
                  {canEdit && (
                    <div
                      className="comment-action"
                      onClick={() =>
                        setActiveComment({ id: comment.id, type: "editing" })
                      }
                    >
                      <BiEdit size={18} />
                    </div>
                  )}
                  {canDelete && (
                    <div
                      className="comment-action"
                      onClick={() => deleteComment(comment.id)}
                    >
                      <RiDeleteBin7Line size={18} />
                    </div>
                  )}
                  {canReply && (
                    <div
                      className="comment-action"
                      onClick={() =>
                        setActiveComment({ id: comment.id, type: "replying" })
                      }
                    >
                      <BsReply size={18} />
                    </div>
                  )}
                </div>
                <br />
                {replies.length > 0 && (
                  <div>
                    {replies.map((reply) => (
                      <CommentPO
                        comment={reply}
                        key={reply.id}
                        setActiveComment={setActiveComment}
                        activeComment={activeComment}
                        updateComment={updateComment}
                        replyComment={replyComment}
                        deleteComment={deleteComment}
                        addComment={addComment}
                        parent={comment.id}
                        replies={[]}
                        currentUserId={currentUserId}
                        //currentUserId={localStorage.getItem("ptoken")}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <br /> */}
      </div>
      {/* </ShowMore> */}

      <br />
      {/* {visible && (
        <button
          onClick={(e) => {
            setShowMoreBool(true);
            setVisible(false);
          }}
        >
          نمایش بیشتر پاسخ ها
        </button>
      )} */}
    </div>
    // </ShowMore>
  );
};

export default CommentPO;
