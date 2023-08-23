import React, { useState } from "react";
import Header from "../../components/Header";
import shopping from "../../assets/cart/shopping.svg";
import cart from "../../assets/cart/cart.svg";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useGetSubtotalQuery } from "./cartApiSlice";
import { useGetCartItemsQuery } from "../cart/cartApiSlice";

const consolidateData = (data) => {
  const consolidatedData = [];

  data?.forEach((item) => {
    const existingItem = consolidatedData.find(
      (consolidatedItem) => consolidatedItem.area === item.area
    );
    if (existingItem) {
      existingItem.count++;
      existingItem.totalPrice += item.price;
    } else {
      consolidatedData.push({ ...item, count: 1, totalPrice: item.price });
    }
  });

  return consolidatedData;
};

const Cart = () => {
  //   const [cart, setCart] = useState(false);
  const { data } = useGetSubtotalQuery();
  const { data: cartData } = useGetCartItemsQuery();
  const consolidatedData = consolidateData(cartData);

  return (
    <div className="min-h-screen relative flex flex-col">
      <Header />
      <div className="bg-light-gray flex flex-col flex-grow items-center h-full">
        <img src={shopping} alt="shopping" className="pt-16" />
        {consolidatedData.length === 0 && (
          <div className="">
            <img src={cart} alt="cart" className="mt-8" />
            <p
              className="text-xl text-center text-bold pb-4"
              style={{ color: "#A5A5A5" }}
            >
              Add Items to cart to get Started!
            </p>
          </div>
        )}

        {consolidatedData?.map((item) => (
          <div className="flex justify-between px-40 py-full w-full h-16">
            <div className="flex items-center">
              <p className="flex text-center text-lg font-semibold">
                <button
                  className={`rounded-full ${
                    item.area === 32
                      ? "bg-green-700"
                      : item.area === 24
                      ? "bg-orange-700"
                      : "bg-gray-500"
                  } h-5 w-5 ml-2 mr-4`}
                ></button>
                <span
                  className={`${
                    item.area === 32
                      ? "text-green-700"
                      : item.area === 24
                      ? "text-orange-700"
                      : "text-gray-500"
                  }`}
                >
                  ₹{item.totalPrice}
                </span>
              </p>
            </div>
          </div>
        ))}
        <div></div>
      </div>
      <div
        className="py-8 absolute bottom-0 w-full"
        style={{
          background:
            "linear-gradient(0deg, rgba(224, 224, 224, 0.33), rgba(224, 224, 224, 0.33)),linear-gradient(0deg, #F2F2F2, #F2F2F2)",
        }}
      >
        <ul className="list-disc">
          <li className="px-40 text-xl py-8" style={{ color: "#EB008B" }}>
            We levy a 50% Advance on all our Stall sales. The rest 50% shall be
            credited post the event.
          </li>
        </ul>
        <div className=" px-40 ">
          <p
            className="flex justify-between text-xl"
            style={{ color: "#A1A1A1" }}
          >
            <span>Subtotal</span>
            <span>₹{data?.subtotal}</span>
          </p>
          <p
            className="flex justify-between text-xl"
            style={{ color: "#A1A1A1" }}
          >
            <span>Tax</span>
            <span>₹{data?.tax}</span>
          </p>
          <p className="flex justify-between text-2xl text-black font-bold">
            <span>Total</span>
            <span>₹{data?.total}</span>
          </p>
          <div className="flex justify-center pt-2">
            <button
              className="text-3xl rounded-full px-24 text-white font-bold py-2"
              style={{
                background:
                  "linear-gradient(98.44deg, #F54874 52.42%, #EC008C 107.37%)",
              }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
