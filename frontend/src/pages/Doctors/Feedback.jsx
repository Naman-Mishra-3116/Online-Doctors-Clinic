import React, { useState } from "react";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

function Feedback({ reviews, totalRating }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  console.log(reviews)
  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All Reviews ({totalRating})
        </h4>

        {reviews?.map((item, index) => {
          return (
            <div className="flex justify-between gap-10 mb-[30px] " key={index}>
              <div className="flex gap-3 ">
                <figure className="w-10 h-10 rounded-full">
                  <img className="w-full" src={item?.user?.photo} alt="" />
                </figure>

                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {item?.user?.name}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">
                    {formateDate(item?.createdAt)}
                  </p>
                  <p className="text_para mt-3 font-medium text-[15px]">
                    {item.reviewText}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(item?.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#0067FF" />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
}

export default Feedback;
