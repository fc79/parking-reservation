import { useState, useEffect } from "react";
import CommentFormPO from "./CommentFormPO";
import CommentPO from "./CommentPO";
import "../css/commentPO.css";
import React from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Accordion } from "react-bootstrap";
import "../css/Global.css";
import { BaseUrl } from "../Url";
import { useContext } from "react";
import { ParkingOwnerContext } from "../ParkingOwnerContext";
import ShowMore from "react-show-more-button";
import Card from "react-bootstrap/Card";

const CommentsPO = (props) => {
  const [parkingList, setParkingList, currentParking, setCurrentParking] =
    useContext(ParkingOwnerContext);
  const location = useLocation();
  const [showMoreBool, setShowMoreBool] = useState(false);
  const [backendComments, setBackendComments] = useState([]);
  const [firstComments, setFirstComments] = useState([]);
  const [visible, setVisible] = useState(true);
  const [renderAgain, setRenderAgain] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent === null
  );
  const rootFirstComments = firstComments.filter(
    (firstComments) => firstComments.parent === null
  );
  const [commentCount, setCommentCount] = useState(null);

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

    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    if (parent === null) {
      const body = {
        // parkingId: props.id,
        parkingId: currentParking.id,
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
            userId: localStorage.getItem("ptoken"),
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
      //       setActiveComment({ userId: localStorage.getItem("ptoken") });
      //       console.log(activeComment);
      //       setActiveComment(null);
      //     });
    }
  };

  const updateComment = (text, commentId) => {
    //OK
    let token = localStorage.getItem("ptoken");
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
    if (window.confirm("Are you sure you want to remove comment?")) {
      let token = localStorage.getItem("ptoken");
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
    let token = localStorage.getItem("ptoken");
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
          userId: localStorage.getItem("ptoken"),
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
    //       userId: localStorage.getItem("ptoken"),
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
    const id = localStorage.getItem("pID");
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

    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;

    axios
      .get(`${BaseUrl}/parkingowner/parkingdetail/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log("response: ", response.data);
        setCurrentParking({
          parkingName: response.data.parkingName,
          address: response.data.location,
          id: response.data.id,
          capacity: response.data.capacity,
          image: response.data.parkingPicture,
          isPrivate: response.data.isPrivate,
          pricePerHour: response.data.pricePerHour,
          number: response.data.parkingPhoneNumber,
        });
      });

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
        console.log("num:", response.data.length);
        if (response.data.length === 0) {
          setCommentCount("1");
        } else {
          setCommentCount("0");
        }
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
  }, []);

  useEffect(() => {
    //ok

    // const id = props.id;
    const id = localStorage.getItem("pID");
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

    let token = localStorage.getItem("ptoken");
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
  }, [renderAgain]);
  return (
    <div className="main-div-comment-po">
      <br />
      <br />
      <br />
      <br />
      {/* {showMoreBool ? (
        <Card style={{ margin: "5%" }}>
          <Card.Title style={{ marginTop: "5%" }}>نظرات</Card.Title>
          <Card
            style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "4%" }}
          >
            <div className="comment-form-title"></div>
            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <div>
                  <CommentPO
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
          </Card>
        </Card>
      ) : (
        <Card style={{ margin: "5%" }}>
          <Card.Title style={{ marginTop: "5%" }}>نظرات</Card.Title>
          <Card
            style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "4%" }}
          >
            <div className="comment-form-title"></div>

            <div className="comments-container">
              {firstComments.map((rootComment) => (
                <div>
                  <CommentPO
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
          </Card>
        </Card>
      )} */}
      {showMoreBool ? (
        <div style={{ margin: "5%" }}>
          {/* <h5 style={{ background: "rgba(0,0,0,.03)", marginTop: "5%" }}>نظرات</h5> */}
          <h3
            style={{
              marginTop: "5%",
              padding: "5%",
              background: "rgba(0,0,0,.03)",
              borderBottom: "1px solid rgba(0,0,0,.125)",
              borderRadius: "5px",
            }}
          >
            نظرات
          </h3>
          <div
            style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "4%" }}
          >
            <div className="comment-form-title"></div>
            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <div>
                  <CommentPO
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
          <h3
            style={{
              marginTop: "5%",
              padding: "5%",
              background: "rgba(0,0,0,.03)",
              borderBottom: "1px solid rgba(0,0,0,.125)",
              borderRadius: "5px",
            }}
          >
            نظرات
          </h3>
          <div
            style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "4%" }}
          >
            <div className="comment-form-title"></div>

            <div className="comments-container">
              {firstComments.map((rootComment) => (
                <div>
                  <CommentPO
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
                  {/* <br /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {visible && rootComments.length > 2 ? (
        <button
          onClick={(e) => {
            setShowMoreBool(true);
            setVisible(false);
          }}
          style={{
            textDecoration: "underline",
            paddingBottom: "5%",
            marginRight: "45%",
          }}
        >
          نمایش بیشتر
        </button>
      ) : rootComments.length === 0 ? (
        <div style={{ paddingBottom: "5%", marginRight: "45%" }}>
          نظری وجود ندارد
        </div>
      ) : null}
    </div>
  );
};

export default CommentsPO;
