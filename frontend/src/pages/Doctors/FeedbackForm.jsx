import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, sethHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState("");

  const { id } = useParams();
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!rating || !reviewText) {
        setLoading(false);
        toast.error("Rating and review fields are required");
        return;
      }
      const response = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          rating,
          reviewText,
        }),
      });
      const res = await response.json();
      if (!response.ok) {
        throw new Error(res.messaage);
      }
      setLoading(false);
      toast.success(res.message);
      setTimeout(() => {
        window.location.href = `/doctors/${id}`;
      });
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall Experience? *
        </h3>

        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;

            return (
              <button
                key={index}
                type="button"
                onClick={() => setRating(index)}
                onMouseEnter={() => sethHover(index)}
                onMouseLeave={() => sethHover(rating)}
                onDoubleClick={() => {
                  sethHover(0);
                  setRating(0);
                }}
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your Feedback or Suggestions *
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows={5}
          placeholder="Write your message"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <button type="" className="btn" onClick={handleSubmitReview}>
        {loading ? <HashLoader size={25} color="white" /> : "Submit Feedback"}
      </button>
    </form>
  );
}

export default FeedbackForm;
