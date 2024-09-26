import React, { useState } from 'react';
import { BiMoney } from "react-icons/bi";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { MdCheck } from 'react-icons/md';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from 'react-router-dom';

const earnings = [
  {
    name: "Total Earnings",
    price: 500000000,
    icon: BiMoney,
    growth: "+2%",
    lastMonth: "from last month",
    iconColor: "#389294",
  },
  {
    name: "Available Earnings",
    price: 500000000,
    icon: BiMoney,
    iconColor: "#5FC92E",
  },
  {
    name: "Pending Earnings",
    price: 500000000,
    icon: BiMoney,
    growth: "+2%",
    lastMonth: "from last month",
    iconColor: "#EE454F",
  },
  {
    name: "Withdrawn Earnings",
    price: 500000000,
    icon: BiMoney,
    iconColor: "#CED3D3",
  },
];

const Cards = () => {
  const [step, setStep] = useState(0);
  const [state, setState] = useState({ code1: '', code2: '', code3: '', code4: '' });
  const handleChange = (e, field) => {
    setState({ ...state, [field]: e.target.value });
  };

  const [states, setStates] = useState({ code01: '', code02: '', code03: '', code04: '' });
  const handleChanges = (e, field) => {
    setState({ ...state, [field]: e.target.value });
  };

  const inputFocus = (e) => {
    const next = e.target.getAttribute("data-index");
    if (next < 3 && e.target.value !== "") {
      document.querySelectorAll("input")[parseInt(next) + 1].focus();
    }
  };

  const isPinComplete = Object.values(state).every(val => val.length === 1);

  const closeModal = () => {
    setStep(0);
    setState({ code1: '', code2: '', code3: '', code4: '' });
  };

  const handleProceed = () => {
    if (step === 1) {
      // Proceed to PIN step
      setStep(2);
    } else if (step === 2 && isPinComplete) {
      // Proceed to confirmation step
      setStep(3);
    } else if (step === 3 && isPinComplete) {
      // Final step: success message
      setStep(4);
    }
  };

  return (
    <div>
      <section>
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className='mt-10 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-4'>
            {earnings.map((item, idx) => (
              <div key={idx} className='relative flex-1 flex items-stretch flex-col p-5 rounded-xl border-2'>
                <div className='flex items-center'>
                  <div className="w-7 h-7 border rounded-full mr-1 flex items-center justify-center"
                    style={{ backgroundColor: item.iconColor }}>
                    <item.icon className="w-5 h-5" style={{ color: "#FCFDFD" }} />
                  </div>
                  <span className='text-black text-md font-medium whitespace-nowrap'>
                    {item.name}
                  </span>
                </div>
                <div className='mt-4 text-gray-800 text-2xl font-semibold'>
                  ₦{item.price.toLocaleString()}
                </div>

                {(item.name === "Total Earnings" || item.name === "Pending Earnings") && (
                  <div className="flex items-center mt-4 text-sm text-gray-500">
                    <FaArrowUp className="text-[#5FC92E] w-4 h-4 mr-1" />
                    <span className='text-[#5FC92E]'>{item.growth}</span>
                    <span className="ml-2">{item.lastMonth}</span>
                  </div>
                )}

                {item.name === "Available Earnings" && (
                  <div className="flex-1 flex items-end mt-4">
                    <button
                      onClick={() => setStep(1)}
                      className='px-4 py-2 font-medium border border-[#389294] text-[#389294] hover:bg-[#389294] hover:text-white rounded-lg'>
                      Withdraw
                      <FaArrowDown className="ml-2 inline-block" />
                    </button>
                  </div>
                )}

                {item.name === "Withdrawn Earnings" && (
                  <div className="flex-1 flex items-end mt-4">
                    <Link href="/transactions/withdraw">
                      <button className="px-4 py-2 font-medium text-[#389294] bg-transparent border border-transparent rounded-lg">
                        Withdrawal history
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Popup Modal for Withdrawal Process */}
      {step >= 1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"> {/* Modal background */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
            {step === 1 && (
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl ml-[50px] font-semibold">Setup Withdrawal PIN</CardTitle>
                <Button variant="ghost" onClick={closeModal}>
                  <IoClose className="h-4 w-4 text-muted-foreground" />
                </Button>
              </CardHeader>
            )}

            {step === 1 && (
              <CardDescription className="flex justify-center p-4">
                For Security Purposes, need to <br /> setup a withdrawal PIN to verify <br /> all withdrawals
              </CardDescription>
            )}

            {step === 1 && (
              <CardFooter>
                <Button className="w-full bg-[#389294] hover:bg-[#389294]" onClick={handleProceed}>Proceed</Button>
              </CardFooter>
            )}

            {step === 2 && (
              <>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl ml-[120px] font-semibold">Setup PIN</CardTitle>
                  <Button variant="ghost" onClick={closeModal}>
                    <IoClose className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="mt-6 flex items-center justify-center gap-x-2">
                    <input
                      type="text"
                      data-index="0"
                      value={state.code1}
                      className="w-12 h-12 rounded-lg border focus:border-[#389294] outline-none text-center text-2xl"
                      onChange={(e) => handleChange(e, "code1")}
                      onKeyUp={inputFocus}
                    />
                    <input
                      type="text"
                      data-index="1"
                      value={state.code2}
                      className="w-12 h-12 rounded-lg border focus:border-[#389294] outline-none text-center text-2xl"
                      onChange={(e) => handleChange(e, "code2")}
                      onKeyUp={inputFocus}
                    />
                    <input
                      type="text"
                      data-index="2"
                      value={state.code3}
                      className="w-12 h-12 rounded-lg border focus:border-[#389294] outline-none text-center text-2xl"
                      onChange={(e) => handleChange(e, "code3")}
                      onKeyUp={inputFocus}
                    />
                    <input
                      type="text"
                      data-index="3"
                      value={state.code4}
                      className="w-12 h-12 rounded-lg border focus:border-[#389294] outline-none text-center text-2xl"
                      onChange={(e) => handleChange(e, "code4")}
                      onKeyUp={inputFocus}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${isPinComplete ? 'bg-[#389294] hover:bg-[#389294]' : 'bg-[#CED3D3] text-gray-400 cursor-not-allowed'}`}
                    disabled={!isPinComplete}
                    onClick={handleProceed}
                  >
                    Proceed
                  </Button>
                </CardFooter>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl ml-[120px] font-semibold">Confirm PIN</CardTitle>
                  <Button variant="ghost" onClick={closeModal}>
                    <IoClose className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="mt-6 flex items-center justify-center gap-x-2">
                    <input
                      type="text"
                      data-index="0"
                      value={state.code01}
                      className="w-12 h-12 rounded-lg border focus:border-[#389294] outline-none text-center text-2xl"
                      onChange={(e) => handleChanges(e, "code01")}
                      onKeyUp={inputFocus}
                    />
                    <input
                      type="text"
                      data-index="1"
                      value={state.code02}
                      className="w-12 h-12 rounded-lg border focus:border-[#389294] outline-none text-center text-2xl"
                      onChange={(e) => handleChanges(e, "code02")}
                      onKeyUp={inputFocus}
                    />
                    <input
                      type="text"
                      data-index="2"
                      value={state.code03}
                      className="w-12 h-12 rounded-lg border focus:border-[#389294] outline-none text-center text-2xl"
                      onChange={(e) => handleChanges(e, "code03")}
                      onKeyUp={inputFocus}
                    />
                    <input
                      type="text"
                      data-index="3"
                      value={state.code04}
                      className="w-12 h-12 rounded-lg border focus:border-[#389294] outline-none text-center text-2xl"
                      onChange={(e) => handleChanges(e, "code04")}
                      onKeyUp={inputFocus}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${isPinComplete ? 'bg-[#389294] hover:bg-[#389294]' : 'bg-[#CED3D3] text-gray-400 cursor-not-allowed'}`}
                    disabled={!isPinComplete}
                    onClick={handleProceed}
                  >
                    Confirm
                  </Button>
                </CardFooter>
              </>
            )}

            {step === 4 && (
              <Card className="w-full max-w-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl ml-[50px] font-semibold">
                    </CardTitle>
                    <Button variant="ghost"  onClick={closeModal}>
                    <IoClose className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </CardHeader>
                  <CardDescription className="flex justify-center ">
                      <div className="border rounded-full text-8xl" style={{backgroundColor: "#5FC92E"}}>
                          <span className='text-white'><MdCheck/></span>
                      </div>
                  </CardDescription>
                  <CardContent className="grid gap-4">
                      <div className="font-semibold text-xl py-6">
                          Withdrawal PIN Set Successfully
                      </div>
                  </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
