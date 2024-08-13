import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploadCloudinary";
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Profile = ({ doctorData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    email: "",
    phone: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    about: "",
    qualifications: [],
    experiences: [],
    timeSlots: [],
  });

  useEffect(() => {
    setFormData({
      photo: doctorData?.photo,
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      gender: doctorData?.gender,
      specialization: doctorData.specialization,
      ticketPrice: doctorData?.ticketPrice,
      about: doctorData?.about,
      qualifications: doctorData?.qualification || [],
      experiences: doctorData?.experiences || [],
      timeSlots: doctorData?.timeSlots || [],
    });
  }, [doctorData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({
      ...formData,
      photo: data?.url,
    });
  };

  const addItem = function (key, item) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: [...prev[key], item],
      };
    });
  };

  const deleteItems = (key, index) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: [...prev[key].filter((_, i) => i !== index)],
      };
    });
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };

  const handleReusableInputChangeFunction = function (key, index, event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      const updated = [...prev[key]];
      updated[index][name] = value;
      return {
        ...prev,
        [key]: updated,
      };
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunction("qualifications", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItems("qualifications", index);
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunction("experiences", index, event);
  };

  const deleteExperiences = (e, index) => {
    e.preventDefault();
    deleteItems("experiences", index);
  };

  const handleTimeChange = (event, index) => {
    handleReusableInputChangeFunction("timeSlots", index, event);
  };

  const deleteTime = (e, index) => {
    e.preventDefault();
    deleteItems("timeSlots", index);
  };

  const updateProfileHandler = async function (e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { success, message, error } = await res.json();

      if (message === "Succesfully updated" && success && !error) {
        toast.success(message);
        navigate("/doctors/profile/me");
      } else if (error && !success) {
        toast.error(message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Inforamtion
      </h2>
      <form action="">
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            readOnly
            aria-readonly
            disabled
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            <div>
              <p className="form__label">Ticket Price</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className="form__input"
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form__label">Qualifications*</p>
          {formData?.qualifications?.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <p className="form__label">Degree*</p>
                      <input
                        type="text"
                        name="degree"
                        value={item.degree}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">University*</p>
                      <input
                        type="text"
                        name="university"
                        value={item.university}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>
                  <button
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                    onClick={(e) => deleteQualification(e, index)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            );
          })}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer w-[200px]"
            onClick={addQualification}
          >
            Add Qualification
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Experiences*</p>
          {formData.experiences.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <p className="form__label">Position*</p>
                      <input
                        type="text"
                        name="position"
                        value={item.position}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Hospital*</p>
                      <input
                        type="text"
                        name="hospital"
                        value={item.hospital}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <button
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                    onClick={(e) => deleteExperiences(e, index)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            );
          })}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer w-[200px]"
            onClick={addExperience}
          >
            Add Experience
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Time Slots*</p>
          {formData.timeSlots.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5 md:grid-cols-4 mb-[30px]">
                    <div>
                      <p className="form__label">Day*</p>
                      <select
                        name="day"
                        value={item.day}
                        className="form__input py-3.5"
                        onChange={(e) => handleTimeChange(e, index)}
                      >
                        <option value="">Select</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                      </select>
                    </div>
                    <div>
                      <p className="form__label">Starting Time*</p>
                      <input
                        type="time"
                        name="startingTime"
                        value={item.startingTime}
                        className="form__input"
                        onChange={(e) => handleTimeChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Ending Time*</p>
                      <input
                        type="time"
                        name="endingTime"
                        value={item.endingTime}
                        className="form__input"
                        onChange={(e) => handleTimeChange(e, index)}
                      />
                    </div>
                    <div className="flex items-center">
                      <button
                        className="mt-6 bg-red-600 p-2 rounded-full text-white text-[18px]  cursor-pointer"
                        onClick={(e) => deleteTime(e, index)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer w-[200px]"
            onClick={addTimeSlot}
          >
            Add Time Slot
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px] ">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />

            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
            onClick={updateProfileHandler}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;