import React from "react";
import Header from "../../components/Header";
import PlotGrid from "../../components/PlotGrid";
import seats from "../../assets/seats/seats.svg";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGetCartItemsQuery } from '../cart/cartApiSlice'


const consolidateData = (data) => {
  const consolidatedData = [];

  data?.forEach((item) => {
    const existingItem = consolidatedData.find((consolidatedItem) => consolidatedItem.area === item.area);
    if (existingItem) {
      existingItem.count++;
      existingItem.totalPrice += item.price;
    } else {
      consolidatedData.push({ ...item, count: 1, totalPrice: item.price });
    }
  });

  return consolidatedData;
}


const Seats = () => {
  const navigate = useNavigate();
  const { data } = useGetCartItemsQuery();
  const consolidatedData = consolidateData(data);
  
  return (
    <>
      <div className="flex flex-col justify-center w-full">
        <Header />
        <PlotGrid />
        <div
          className="flex justify-between px-40 py-3 "
          style={{ backgroundColor: "#DDDDDD" }}
        >
          <div>
            <h3 className="text-lg font-bold underline">Colour Code</h3>
          </div>
          <div className="flex">
            <p className="flex text-center">
              H1-
              <button className="rounded-full bg-green-700 h-5 w-5 ml-2"></button>
            </p>
            <p className=" flex text-center mx-10">
              H2-
              <button className="rounded-full bg-orange-700 h-5 w-5 ml-2"></button>
            </p>
            <p className="flex text-center">
              H3-
              <button className="rounded-full bg-gray-400 h-5 w-5 ml-2"></button>
            </p>
          </div>
        </div>
        {consolidatedData?.map((item)=>
          <div
            className="flex justify-between px-40 py-5"
            style={{
              borderWidth: "1px, 0px, 1px, 0px",
              borderStyle: "solid",
              borderColor: "#D1D1D154",
              background:
                "linear-gradient(0deg, rgba(209, 209, 209, 0.33), rgba(209, 209, 209, 0.33)),linear-gradient(0deg, #F2F2F2, #F2F2F2)",
            }}
          >
            <div className="flex">
              <p className="flex text-center text-lg font-semibold">
                <button className={`rounded-full ${item.area===32?"bg-green-700":(item.area===24?"bg-orange-700":"bg-gray-500")} h-5 w-5 ml-2 mr-4`}></button>
                ₹{item.totalPrice}
              </p>
              <p className="mx-20">{item.area} Sq. Mt.</p>
            </div>
            <div className="flex items-center">
              <p className="p-2 border-2">
                <AiOutlineMinus />
              </p>
              <p className="p-2">{item.count}</p>
              <p className="p-2 ">
                <AiOutlinePlus />
              </p>
            </div>
          </div>)}
        <button className="flex text-center mx-auto py-10 underline" style={{color:"#7C7C7C"}} onClick={()=>navigate('/city')}>
          <AiOutlineArrowLeft /> Back to City
        </button>
      </div>
    </>
  );
};

export default Seats;
