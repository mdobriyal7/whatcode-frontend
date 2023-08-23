import React from "react";
import Header from "../../components/Header";
import location from "../../assets/cities/location.svg";
import city from "../../assets/cities/city.svg";
import right from "../../assets/cities/arrow.svg";
import { useNavigate } from "react-router-dom";
// import search from "../../assets/cities/search.svg";

const City = () => {
  const navigate = useNavigate();

  const placesAndDates = [
    { place: "Raipur", date: "2023/08/10" },
    { place: "Haryana", date: "2023/08/15" },
    { place: "Amritsar", date: "2023/08/20" },
    { place: "Mumbai", date: "2023/09/02" },
    { place: "Bangalore", date: "2023/09/10" },
    { place: "Jaipur", date: "2023/09/18" },
    { place: "Kolkata", date: "2023/10/05" },
    { place: "Chennai", date: "2023/10/15" },
  ];

  return (
    <>
      <section className=" min-h-screen w-full relative">
      <Header />
        <div className="bg-light-gray">
          <div className=" flex justify-center py-10 text-center">
            <h2 className="text-3xl font-semibold text-header ">
              Select your Location
            </h2>
            <span>
              <img src={location} alt="location" className="ml-3 " />
            </span>
          </div>
          <div className="text-center">
          <input
            className="lg:w-[757px] py-1 px-5 text-lg rounded-full mb-14"
            placeholder="Search"
            style={{ boxShadow: "0px 4px 15px 0px #00000040" }}
            />
            </div>

          <div className="pb-80">
            <ul className="list bg-white">
              {placesAndDates.map((item, index) => (
                <li key={index} className="flex py-2 border-y-1 lg:px-40">
                  <div
                    className="text-lg font-bold flex w-1/3 justify-start"
                    style={{ color: "#464646" }}
                  >
                    <img src={city} className="mr-3" />
                    {item.place}
                  </div>
                  <div className="w-1/3 text-xs text-header my-auto text-center">{item.date}</div>
                  <div className="action w-1/3 text-end">
                          <button className="underline text-lg font-bold" style={{ color: "#ABABAB" }} onClick={()=>navigate('/seats')}>Book Now<img src={right} className="ml-5 inline"/></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="absolute bottom-0 w-full text-center "
          style={{ backgroundColor: "#EAEAEA" }}
        >
          <h3 className="text-light text-2xl pt-12 pb-8 text-center">
            Not found the City you were looking for 😕?
          </h3>
          <button
            className="rounded-full px-6 py-2 text-xl font-normal mb-20 text-center"
            style={{ backgroundColor: "#F2F2F2" }}
          >
          Contact Sales ☎️
          </button>
        </div>
      </section>
    </>
  );
};

export default City;
