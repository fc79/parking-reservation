import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "../css/comment.css";
import React from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Accordion } from "react-bootstrap";
import "../css/Global.css";
import { BaseUrl } from "../Url";
import Rating from "@mui/material/Rating";
import Card from "react-bootstrap/Card";

const Comments = (props) => {
  const location = useLocation();
  const [backendComments, setBackendComments] = useState([]);
  const [renderAgain, setRenderAgain] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [firstComments, setFirstComments] = useState([]);
  const [visible, setVisible] = useState(true);
  const [showMoreBool, setShowMoreBool] = useState(false);
  const [showMoreTmpBool, setShowMoreTmpBool] = useState(false);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent === null
  );

  const getReplies = (commentId) => {
    const res = backendComments
      .filter((backendComment) => backendComment.parent === commentId)
      .sort(
        (a, b) =>
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      );
    return res;

    console.log(backendComments);
  };

  const addComment = (text, parent = null) => {
    //ok

    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;
    if (parent === null) {
      const body = {
        // parkingId: props.id,
        parkingId: location.state.id,
        content: text,
      };
      let fd = new FormData();
      // fd.append("parkingId", props.id);
      fd.append("parkingId", location.state.id);
      fd.append("content", text);
      fetch(`${BaseUrl}/carowner/addcomment/`, {
        headers: { authorization: auth },
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then((comment) => {
          let tmp = {
            id: `${comment.id}`,
            content: comment.content,
            author: comment.author,
            userId: localStorage.getItem("ctoken"),
            parent: null,
            dateAdded: comment.dateAdded,
          };

          console.log(tmp);
          setBackendComments([tmp, ...backendComments]);

          //console.log(activeComment);
          setActiveComment(null);
        });
      // } else {
      //   const body = {
      //     parent: parent,
      //     content: text,
      //   };
      //   fetch("http://127.0.0.1:8000/carowner/addreply/", {
      //     headers: { authorization: auth },
      //     method: "POST",
      //     body: JSON.stringify(body),
      //   })
      //     .then((response) => {
      //       if (response.ok) {
      //         return response.json;
      //       }
      //     })
      //     .then((comment) => {
      //       setBackendComments([comment, ...backendComments]);
      //       setActiveComment({ userId: localStorage.getItem("ctoken") });
      //       console.log(activeComment);
      //       setActiveComment(null);
      //     });
    }
  };

  const updateComment = (text, commentId) => {
    //OK
    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;
    const body = { id: commentId, content: text };
    let fd = new FormData();
    fd.append("id", commentId);
    fd.append("content", text);
    fetch(`${BaseUrl}/carowner/editcomment/`, {
      headers: { authorization: auth },
      method: "PUT",
      body: fd,
    })
      .then((response) => response.json())
      .then(() => {
        const updatedBackendComments = backendComments.map((backendComment) => {
          if (backendComment.id === commentId) {
            return { ...backendComment, content: text };
          }
          return backendComment;
        });
        setBackendComments(updatedBackendComments);
        setActiveComment(null);
      });
  };
  const deleteComment = (commentId) => {
    //OK
    if (window.confirm("آیا مطمئن هستید که می خواهید نظر خود را حذف کنید؟")) {
      let token = localStorage.getItem("ctoken");
      let auth = `Token ${token}`;
      const body = { id: commentId };
      let fd = new FormData();
      fd.append("id", commentId);
      fetch(`${BaseUrl}/carowner/deletecomment/`, {
        headers: { authorization: auth },
        method: "DELETE",
        body: fd,
      })
        .then((response) => {})
        .then(() => {
          const updatedBackendComments = backendComments.filter(
            (backendComment) => backendComment.id !== commentId
          );
          setBackendComments(updatedBackendComments);
        });
    }
  };

  const replyComment = (text, parrentId) => {
    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;

    let fd = new FormData();
    // fd.append("parkingId", props.id);
    fd.append("parentId", parrentId);
    fd.append("content", text);

    const info = {
      parentId: parrentId,
      content: text,
    };

    console.log("text in req:", info);
    fetch(`${BaseUrl}/carowner/addreply/`, {
      headers: {
        authorization: auth,
      },
      method: "POST",
      body: fd,
    })
      .then((response) => response.json())
      .then((comment) => {
        let tmp = {
          id: `${comment.id}`,
          content: comment.content,
          author: comment.author,
          userId: localStorage.getItem("ctoken"),
          parent: `${comment.parent}`,
          dateAdded: comment.dateAdded,
        };

        console.log("reply res:", comment);
        // setBackendComments([tmp, ...backendComments]);
        setBackendComments((prevstate) => [...prevstate, tmp]);
        setRenderAgain(backendComments);

        //console.log(activeComment);
        setActiveComment(null);
      });

    // axios
    //   .post("http://127.0.0.1:8000/carowner/addreply/", {
    //     headers: {
    //       authorization: auth,
    //     },
    //     body: {
    //       parentId: parrentId,
    //       content: text,
    //     },
    //   })
    //   .then((response) => {
    //     let tmp = {
    //       id: `${response.data.id}`,
    //       content: response.data.content,
    //       author: response.data.author,
    //       userId: localStorage.getItem("ctoken"),
    //       parent: `${response.data.parent}`,
    //       dateAdded: response.data.dateAdded,
    //     };

    //     console.log("reply res:", response.data);
    //     setBackendComments([tmp, ...backendComments]);

    //     //console.log(activeComment);
    //     setActiveComment(null);
    //   });
  };

  useEffect(() => {
    //ok

    // const id = props.id;
    const id = location.state.id;
    // let token = localStorage.getItem("ctoken");
    // let auth = `Token ${token}`;

    // let fd = new FormData();
    // fd.append("id", id);
    // fetch(`http://127.0.0.1:8000/carowner/commentlist/`, {
    //   headers: { authorization: auth },
    //   method: "POST",
    //   body: fd,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setBackendComments(data);
    //   });

    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;

    axios
      .get(`${BaseUrl}/carowner/commentlist/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          id: id,
        },
        localStorage,
      })
      .then((response) => {
        console.log("response: ", response.data);
        setBackendComments(response.data);

        let i = 0;
        let tmpList = [];
        for (let j = 0; j < response.data.length && i < 2; j++) {
          if (response.data[j]["parent"] === null) {
            tmpList[i] = response.data[j];
            i++;
          }
        }
        if (tmpList.length !== 0) {
          setFirstComments(tmpList);
          console.log("for:", tmpList);
        } else setBackendComments(response.data);
      });

    console.log("roooooot1:", rootComments.length);
    if (rootComments.length === 1 || rootComments.length === 2) {
      setShowMoreTmpBool(true);
    }
  }, []);

  useEffect(() => {
    //ok

    // const id = props.id;
    const id = location.state.id;
    // let token = localStorage.getItem("ptoken");
    // let auth = `Token ${token}`;

    // let fd = new FormData();
    // fd.append("id", id);
    // fetch(`http://127.0.0.1:8000/carowner/commentlist/`, {
    //   headers: { authorization: auth },
    //   method: "POST",
    //   body: fd,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setBackendComments(data);
    //   });

    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;

    axios
      .get(`${BaseUrl}/carowner/commentlist/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log("response: ", response.data);
        setBackendComments(response.data);
      });

    console.log("roooooot2:", rootComments.length);
    if (rootComments.length === 1 || rootComments.length === 2) {
      setShowMoreTmpBool(true);
    }
  }, [renderAgain]);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />

      {rootComments.length > 2 ? (
        showMoreBool ? (
          <div style={{ margin: "5%" }}>
            <h3 style={{ marginTop: "5%" }}>نظرات</h3>
            <CommentForm
              submitLabel="اضافه کردن"
              handleSubmit={addComment}
              style={{ marginRight: "45%" }}
            />
            <br />
            <div
              style={{
                marginRight: "5%",
                marginLeft: "5%",
                marginBottom: "4%",
              }}
            >
              <div className="comment-form-title"></div>

              <div className="comments-container">
                {rootComments.map((rootComment) => (
                  <div>
                    <Comment
                      key={rootComment.id}
                      comment={rootComment}
                      replies={getReplies(rootComment.id)}
                      activeComment={activeComment}
                      setActiveComment={setActiveComment}
                      addComment={addComment}
                      deleteComment={deleteComment}
                      updateComment={updateComment}
                      replyComment={replyComment}
                      currentUserId={localStorage.getItem("ptoken")}
                    />
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ margin: "2%" }}>
            <h3 style={{ marginTop: "2%" }}>نظرات</h3>
            <CommentForm
              submitLabel="اضافه کردن"
              handleSubmit={addComment}
              style={{ marginRight: "45%" }}
            />
            <br />
            <div
              style={{
                marginRight: "5%",
                marginLeft: "5%",
                marginBottom: "4%",
              }}
            >
              <div className="comment-form-title"></div>
              <div className="comments-container">
                {firstComments.map((rootComment) => (
                  <div>
                    <Comment
                      key={rootComment.id}
                      comment={rootComment}
                      replies={getReplies(rootComment.id)}
                      activeComment={activeComment}
                      setActiveComment={setActiveComment}
                      addComment={addComment}
                      deleteComment={deleteComment}
                      updateComment={updateComment}
                      replyComment={replyComment}
                      currentUserId={localStorage.getItem("ptoken")}
                    />
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      ) : rootComments.length === 1 || rootComments.length === 2 ? (
        <div style={{ margin: "5%" }}>
          <h3 style={{ marginTop: "5%" }}>نظرات</h3>
          <CommentForm
            submitLabel="اضافه کردن"
            handleSubmit={addComment}
            style={{ marginRight: "45%" }}
          />
          <br />
          <div
            style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "4%" }}
          >
            <div className="comment-form-title"></div>

            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <div>
                  <Comment
                    key={rootComment.id}
                    comment={rootComment}
                    replies={getReplies(rootComment.id)}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                    replyComment={replyComment}
                    currentUserId={localStorage.getItem("ptoken")}
                  />
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ margin: "5%" }}>
          <h3 style={{ marginTop: "5%" }}>نظرات</h3>
          <CommentForm
            submitLabel="اضافه کردن"
            handleSubmit={addComment}
            style={{ marginRight: "45%" }}
          />
          <br />
          <div
            style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "4%" }}
          >
            <div className="comment-form-title"></div>

            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <div>
                  <Comment
                    key={rootComment.id}
                    comment={rootComment}
                    replies={getReplies(rootComment.id)}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                    replyComment={replyComment}
                    currentUserId={localStorage.getItem("ptoken")}
                  />
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* {showMoreBool || showMoreTmpBool ? (
        <div style={{ margin: "5%" }}>
          <h3 style={{ marginTop: "5%" }}>نظرات</h3>
          <CommentForm submitLabel="اضافه کردن" handleSubmit={addComment} />
          <br />
          <div
            style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "4%" }}
          >
            <div className="comment-form-title"></div>

            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <div>
                  <Comment
                    key={rootComment.id}
                    comment={rootComment}
                    replies={getReplies(rootComment.id)}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                    replyComment={replyComment}
                    currentUserId={localStorage.getItem("ptoken")}
                  />
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ margin: "5%" }}>
          <h3 style={{ marginTop: "5%" }}>نظرات</h3>
          <CommentForm submitLabel="اضافه کردن" handleSubmit={addComment} />
          <br />
          <div
            style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "4%" }}
          >
            <div className="comment-form-title"></div>
            <div className="comments-container">
              {firstComments.map((rootComment) => (
                <div>
                  <Comment
                    key={rootComment.id}
                    comment={rootComment}
                    replies={getReplies(rootComment.id)}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                    replyComment={replyComment}
                    currentUserId={localStorage.getItem("ptoken")}
                  />
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
      {visible && rootComments.length > 2 ? (
        <button
          onClick={(e) => {
            setShowMoreTmpBool(false);
            setShowMoreBool(true);
            setVisible(false);
          }}
          style={{
            textDecoration: "underline",
            paddingBottom: "5%",
            marginRight: "45%",
          }}
        >
          نمایش بیشتر نظرات
        </button>
      ) : rootComments.length === 0 ? (
        <div style={{ paddingBottom: "5%", marginRight: "45%" }}>
          نظری وجود ندارد
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
