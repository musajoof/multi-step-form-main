import React, { useState, useEffect } from "react";
import ThankYouImage from './assets/images/icon-thank-you.svg'
import AcadaImage from './assets/images/icon-arcade.svg'
import AdvanceImage from './assets/images/icon-advanced.svg'
import ProImage from './assets/images/icon-pro.svg'
import ToggleleftImage from './assets/images/toggle-left.svg'
import TogglerightImage from './assets/images/toggle-right.svg'

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [sidebarStep, setSidebarStep] = useState(1);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const saveFormDataToLocalStorage = (data) => {
    localStorage.setItem("formData", JSON.stringify(data));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    saveFormDataToLocalStorage({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing in a field
    if (name === "name") {
      setNameError("");
    }
    if (email === "email") {
      setEmailError("");
    }
    if (phone === "phone") {
      setPhoneError("");
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    setSidebarStep(step);
  };

  const validateStep = () => {
    // Add validation logic for each step
    if (currentStep === 1) {
      if (!formData.name) {
        setNameError("Name is required.");
        return false;
      }
      if (!formData.email) {
        setEmailError("Email is required.");
        return false;
      }
      if (!formData.phone) {
        setPhoneError("Phone is required.");
        return false;
      }
    }
    return true;
  };

  // const nextStep = () => {
  //   if (validateStep()) {
  //     setCurrentStep(currentStep + 1);
  //   }
  // };

  // const prevStep = () => {
  //   setCurrentStep(currentStep - 1);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  // };


  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
};

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="border-2 max-w-3xl w-full h-[500px] m-auto mt-10 rounded-md p-4 flex justify-center space-x-5">
        <div className="w-1/3 h-full border-2 rounded-md bg-[url('./assets/images/bg-sidebar-desktop.svg')] bg-cover bg-no-repeat bg-center text-white">
          {/* Add step navigation here */}
          <div className="flex justify-start ml-2 items-center space-y-3 relative mt-6">
            <div className="block">
            <div className="flex justify-start items-center">
              <div className={`rounded-full w-10 h-10 border-white bg-blue-800 p-2 text-center mr-2 text-lg text-white  ${sidebarStep === 1 && 'bg-lime-400 text-black'}`}  onClick={() => goToStep(1)}>1</div>
              <div onClick={() => goToStep(1)}>
                <h2>step 1</h2>
                <h1>PERSONAL INFO</h1>
              </div>
            </div>
            <div className="flex justify-start items-center mt-3">
              <div className={`rounded-full w-10 h-10 border-white bg-blue-800 p-2 text-center mr-2 text-lg text-white ${sidebarStep === 2 && 'bg-lime-400 text-black'}`}  onClick={() => goToStep(2)}>2</div>
              <div onClick={() => goToStep(2)}>
                <h2>step 2</h2>
                <h1>SELECT PLAN</h1>
              </div>
            </div>
            <div className="flex justify-start items-center mt-3">
              <div className={`rounded-full w-10 h-10 border-white bg-blue-800 p-2 text-center mr-2 text-lg text-white ${sidebarStep === 3 && 'bg-lime-400 text-black'}`} onClick={() => goToStep(3)}>3</div>
              <div onClick={() => goToStep(3)}>
                <h2>step 3</h2>
                <h1>ADD ONS</h1>
              </div>
            </div>
            <div className="flex justify-start items-center mt-3 cursor-pointer">
              <div className={`rounded-full w-10 h-10 border-white bg-blue-800 p-2 text-center mr-2 text-lg text-white ${sidebarStep === 4 && 'bg-lime-400 text-black'}`}  onClick={() => goToStep(4)}>4</div>
              <div  onClick={() => goToStep(4)}>
                <h2>step 4</h2>
                <h1>SUMMARY</h1>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 h-full border-none rounded-md p-5 text-slate-700">
          {currentStep === 1 && (
            <>
              <h1 className="text-3xl font-bold text-slate-700">Personal info</h1>
              <p className="text-sm mb-8 mt-3">Please provide your name, email address, and phone number</p>

              <form onSubmit={nextStep} id="1">
                <label htmlFor="name" >Name</label>
                <input
                  className="w-full h-10 border rounded-md p-2"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="eg your name"
                  required
                />
                <span className="text-red-500 text-sm block text-right">{nameError}</span>

                <label htmlFor="email">Email</label>
                <input
                  className="w-full h-10 border rounded-md p-2"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="eg your email"
                  required
                />
                <span className="text-red-500 text-sm block text-right">{emailError}</span>

                <label htmlFor="phone" >Phone</label>
                <input
                  className="w-full h-10 border rounded-md p-2"
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="eg your phone"
                  required
                />
                <span className="text-red-500 text-sm block text-right">{phoneError}</span>

                <button
                  type="submit"
                  onClick={nextStep}
                  className="bg-blue-950 p-3 text-slate-100 rounded-md ml-[335px] mt-15 "
                >
                  Next Step
                </button>
              </form>
            </>
          )}

          {/* Add forms for other steps Select Your Plan*/}
          {currentStep === 2 && (
          <form onSubmit={nextStep} id="2">
            <h1 className="text-3xl font-bold text-slate-700">Select Your Plan </h1>
              <p className="text-sm mb-8 mt-3">You have an option for monthly or yearly</p>
            <div className="flex justify-center items-center gap-x-3">
              <div className="border-2 p-3 w-1/3 h-32 rounded-md text-center">
                <div className="mt-2">
                  <img className="m-auto" src={AcadaImage} alt={"Acada image"} />
                </div>
                <div className="mt-2">
                  <strong>Arcade</strong>
                  <p>$9/mo</p>
                </div>
              </div>
              <div className="border-2 p-3 w-1/3 h-32 rounded-md text-center">
                <div className="mt-2">
                  <img className="m-auto" src={AdvanceImage} alt={"Advance image"} />
                </div>
                <div className="mt-2">
                  <strong>Advance</strong>
                  <p>$9/mo</p>
                </div>
              </div>
              <div className="border-2 p-3 w-1/3 h-32 rounded-md  text-center">
                <div className="mt-2 text-center">
                  <img className="m-auto" src={ProImage} alt={"pro Image"} />
                </div>
                <div className="mt-2 ">
                  <strong>Pro</strong>
                  <p>$9/mo</p>
                </div>
              </div>
            </div>
              <div className="block mt-3">
                <div className="flex justify-center items-center p-2 bg-slate-200 w-full rounded-md gap-x-3">
                  <span>Monthly</span>
                  <img src={ToggleleftImage} alt={"Ceck Image"} />
                  <span>Yearly</span>
                </div>
              </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                onClick={prevStep}
                className=" p-3 rounded-md font-bold mt-20 "
              >
                Go Back
              </button>
              <button
                type="submit"
                onClick={nextStep}
                className="bg-blue-950 p-3 text-slate-100 rounded-md  mt-20 "
              >
                Next Step
              </button>
            </div>
          </form>
          )}

          {/* {Add another form Pick Add Ons} */}
          {currentStep === 3 && (
          <form onSubmit={nextStep} id="3">
            <h1 className="text-3xl font-bold text-slate-700">Pick Add Ons </h1>
            <p className="text-sm mb-8 mt-3">Add-ons help enhabce your gaming experience.</p>
            <div className="">
              <div className="flex justify-between items-center w-full p-2 bg-slate-200 rounded-md">
                <input type="checkbox" />
                <div>
                  <p>Online Sevice</p>
                  <p>Access to multiple games</p>
                </div>
                <p>+$1/mo</p>
              </div>
              <div className="flex justify-between items-center w-full p-2 bg-slate-200 rounded-md mt-3">
                <input type="checkbox" />
                <div>
                  <p>Online Sevice</p>
                  <p>Access to multiple games</p >
                </div>
                <p>+$1/mo</p>
              </div>
              <div className="flex justify-between items-center w-full p-2 bg-slate-200 rounded-md mt-3">
                <input type="checkbox" />
                <div>
                  <p>Online Sevice</p>
                  <p>Access to multiple games</p>
                </div>
                <p>+$1/mo</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                onClick={prevStep}
                className=" p-3 rounded-md font-bold mt-20 "
              >
                Go Back
              </button>
              <button
                type="submit"
                onClick={nextStep}
                className="bg-blue-950 p-3 text-slate-100 rounded-md  mt-20 "
              >
                Next Step
              </button>
            </div>
          </form>
          )}

          {/* {Add another form Finishing Up} */}
          {currentStep === 4 && (
          <form onSubmit={handleSubmit} id="4">
            <h1 className="text-3xl font-bold text-slate-700">Finishing Up </h1>
            <p className="text-sm mb-8 mt-3">Double  check everything looks OK before confirming.</p>
            <div className="bg-slate-100 p-3 rounded-md">
               <div className="flex justify-between items-center">
                <div className="hover:font-bold hover:text-slate-800">
                  <p>Acade (monthly)</p>
                  <a className="underline hover:text-blue-600" href="">change</a>
                </div>
                <p>$9/mo</p>
               </div >
               <hr  className="mt-3"/>
               <div className="flex justify-between items-center mt-3 hover:font-bold hover:text-slate-800">
                <p>Online service</p>
                <p>+$1/mo</p>
               </div>
               <div className="flex justify-between items-center mt-3 hover:font-bold hover:text-slate-800">
                <p>Large storage</p>
                <p>+$2/mo</p>
               </div>
            </div>
            <div className=" flex justify-between items-center mt-5 hover:font-bold hover:text-slate-800">
              <p>Total per Month </p>
              <p>+$12/mo</p>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                onClick={prevStep}
                className=" p-3 rounded-md font-bold mt-20 "
              >
                Go Back
              </button>
              <button
                type="submit"
                onClick={nextStep}
                className="bg-blue-950 p-3 text-slate-100 rounded-md  mt-20 "
              >
                Confirm
              </button>
            </div>
          </form>
          )}

          {/* {Thank you card} */}
          {currentStep === 5 && (
          <div className="m-auto text-slate-700 text-center p-3">
            <div>
              <img className="m-auto mt-3 mb-5" src={ThankYouImage} alt={"Thank You Image"} />
            </div>
            <h1 className="text-3xl font-extrabold mb-5">Thank You!</h1>
            <p className="text-sm text-slate-500 font-semibold">Thanks for confirming your sbscribtion! We hope you have fun using our platform. if you ever need support feel free to contact on <a href="">musajoof447@gmail.com</a></p>
          </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
