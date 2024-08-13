import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import DoctorCard from "./../../components/Doctors/DoctorCard";

const MyBookings = () => {
  const {
    data: appoinements,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);
  
  return (
    <div>
      {loading && <Loading />}
      {error ? (
        <Error errMessage={error} />
      ) : (
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
          {appoinements.length > 0 ? (
            appoinements.map((item) => {
              return <DoctorCard key={docotor._id} doctor={item} />;
            })
          ) : (
            <h2 className="mt-5 text-center text-primaryColor leading-7 text-[17px] font-5">
              You don't have any appointment scheduled
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
