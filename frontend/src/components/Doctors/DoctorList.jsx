import DoctorCard from "./DoctorCard";
import { BASE_URL } from "../../config";
import Loading from "../Loader/Loading";
import Error from "../Error/Error";
import useFetchData from "../../hooks/useFetchData";

function DoctorList() {
  const { data, loading, error } = useFetchData(`${BASE_URL}/doctors/`);
  return (
    <>
      {loading && <Loading />}

      {error && <Error errMessage={error} />}
      {!loading && !error && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] "
          key={123}
        >
          {data.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
}

export default DoctorList;
