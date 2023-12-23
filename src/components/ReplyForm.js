import { useState } from "react";
import "../css/comment.css";
import ReactStars from "react-rating-stars-component";
import React from "react";
import "../css/Global.css";

const ReplyFrom = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
}) => {
  const [text, setText] = useState("");
  let isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    console.log("texxxxxxxt: ", text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div class="mb-3">
        <textarea
          className="comment-form-textarea-update"
          placeholder="نظر خود را در مورد پارکینگ وارد کنید..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          لغو
        </button>
      )}
    </form>
  );
};

export default ReplyFrom;
