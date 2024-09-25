import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [dependency, setDependency] = useState({
    rangeLen: 15,
    uppercase: true,
    lowercase: true,
    numbers: true,
    specialCharacter: false,
  });

  const [leastSelected, setLeastSelected] = useState(1);
  const passwordRef = useRef(null)

  const passwardGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    if (dependency.uppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (dependency.lowercase) str += "abcdefghijklmnopqrstuvwxyz";
    if (dependency.numbers) str += "0123456789";
    if (dependency.specialCharacter) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < dependency.rangeLen; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  },[dependency, leastSelected])

  useEffect(() => {
    passwardGenerator();
  }, [dependency, passwardGenerator]);


  const handleRange = (e) => {
    setDependency((prevState) => ({
      ...prevState,
      rangeLen: parseInt(e.target.value),
    }));
  };

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)

    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    }).catch((error) => {
      console.error("Failed to copy the text to clipboard: ", error);
    })
    
  }, [password])



  return (
    <div className="flex justify-center py-8">
      <div className="w-[85%]">
        <div className="flex flex-col justify-center items-center m-4">
          <h1 className="text-5xl font-bold p-5 text-center">Random Password Generator</h1>
          <h3 className="from-neutral-100 p-2 text-xl text-center">
            Create strong and secure passwords to keep your account safe online.
          </h3>
        </div>

        <div className="flex tracking-wide text-[22px] flex-col lg:flex-row">
          {/* img parameters */}
          <div className="flex basis-2/5">
            <img src="./public/download.svg" alt="" className="hidden lg:block"/>
          </div>

          {/* input parameters  */}
          <div className="flex flex-col basis-3/5 gap-4 my-4">

{/*----------------------------------------------------------------------------------------------------*/}          
            <div className="flex basis-1/3 border-red-200 border-[1px] gap-1 justify-center items-center pl-5 text-[20px]">
              <div className="flex flex-row basis-4/5 w-full relative">
                <div className="outline-none w-[100%] py-2 px-3 rounded-3xl shadow-inner bg-blue-100 ">
                  <input
                    type="text"
                    className=" outline-none bg-blue-100 w-[90%] overflow-x-visible text-[#212121] text-ellipsis"
                    placeholder="password"
                    readOnly
                    value={password}
                  />
                </div>
                <div className="flex justify-center items-center absolute py-2 px-4 right-0 top-0 bottom-0 ">
                  <button   
                    className="w-4 hover:scale-110 hover:ease-in-out duration-300 font-semibold flex justify-center items-center text-center"
                    onClick={() => passwardGenerator()}
                  >
                    <img src="./public/replay.svg" alt="Replay Button" className="flex justify-center items-center"/>
                  </button>
                </div>
              </div>
              <div className="basis-1/5 flex justify-center items-center text-center">
                <button 
                  className="bg-[#0070F6] px-5 py-2 rounded-3xl text-center hover:scale-110 hover:ease-in-out duration-300 font-semibold text-white"
                  onClick={copyPasswordToClipboard}
                  
                >
                  Copy
                </button>
              </div>
            </div>
{/*  ---------------------------------------------------------------------------------------------------------*/}



{/*  ---------------------------------------------------------------------------------------------------------*/}
            {/* length slider */}
            <div className="flex basis-1/3 border-blue-200 border-[1px] justify-center items-center pl-5">
              <div className="flex flex-col basis-2/5">
                Password length:
                <span className="text-xl font-semibold mx-5">
                  {dependency.rangeLen}
                </span>
              </div>
              <div className="flex basis-3/5">
                <div className="flex justify-center items-center ">
                  {/* decrease count function */}
                  <button
                    className="w-12 h-12 rounded-full m-1 bg-transparent border-[1px] hover:bg-[#e3e3e3] hover:scale-110 hover:ease-in-out duration-300 hover:text-[#181A1B] font-bold text-white"
                    
                    onClick={(e) => setDependency(prevState => {
                      if (prevState.rangeLen > 1) {
                        return {
                          ...prevState,
                          rangeLen: prevState.rangeLen - 1
                        };
                      } else {
                        return prevState;  // If the condition is not met, return the state unchanged
                      }})
                    }
                  >
                    <i class="bx bx-minus"></i>
                  </button>
                </div>
                <div className="flex justify-center items-center basis-2/3">
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={document.length}
                    className="cursor-pointer w-full mx-2"
                    onChange={handleRange}
                  />
                </div>
                <div className="flex justify-center items-center ">
                  <button
                    className="w-12 h-12 rounded-full m-1 bg-transparent border-[1px] hover:bg-[#e3e3e3] hover:scale-110 hover:ease-in-out duration-300 hover:text-[#181A1B] font-bold text-white "
                    onClick={(e) => setDependency(prevState => {
                      if (prevState.rangeLen < 50) {
                        return {
                          ...prevState,
                          rangeLen: prevState.rangeLen + 1
                        };
                      } else {
                        return prevState;  // If the condition is not met, return the state unchanged
                      }})
                    }
                  >
                    <i class="bx bx-plus"></i>
                  </button>
                </div>
              </div>
            </div>


{/*  ---------------------------------------------------------------------------------------------------------*/}
            {/* check box input section */}
            <div className="flex basis-1/3 border-yellow-200 border-[1px] justify-center items-center pl-5">
              <div className="basis-2/5 ">Characters Used: </div>




  {/*  ---------------------------------------------------------------------------------------------------------*/}
              {/* checkbox input */}
              <div className="basis-4/5 flex font-semibold">

                {/* upper case checkbox  */}
                <div className="basis-1/4">
                  <input
                    type="checkbox"
                    defaultChecked={dependency.uppercase}
                    id="UppercaseInput"
                    className="w-5 h-5 rounded-full mx-2 bg-none"
                    onClick={(e) =>
                      setDependency(prevState => ({
                        ...prevState,
                        uppercase: !prevState.uppercase,
                      }))
                    }
                  />
                  <label htmlFor="UppercaseInput">ABC</label>
                </div>
                {/* lowercase checkbox */}
                <div className="basis-1/4">
                  <input
                    type="checkbox"
                    defaultChecked={dependency.lowercase}
                    id="LowercaseInput"
                    className="w-5 h-5 rounded-full mx-2 bg-none"
                    onClick={(e) =>
                      setDependency(prevState => ({
                        ...prevState,
                        lowercase: !prevState.lowercase,
                      }))
                    }
                  />
                  <label htmlFor="LowercaseInput">abc</label>
                </div>
                {/* number checkbox */}
                <div className="basis-1/4">
                  <input
                    type="checkbox"
                    defaultChecked={dependency.numbers}
                    id="NumberInput"
                    className="w-5 h-5 rounded-full mx-2 bg-none"
                    onClick={(e) =>
                      setDependency(prevState => ({
                        ...prevState,
                        numbers: !prevState.numbers,
                      }))
                    }
                  />
                  <label htmlFor="NumberInput">123</label>
                </div>
                {/* special character checkbox */}
                <div className="basis-1/4">
                  <input
                    type="checkbox"
                    defaultChecked={dependency.specialCharacter}
                    id="SpecialCharacterInput"
                    className="w-5 h-5 bg-gray-100 border-none rounded-xl"
                    onClick={(e) =>
                      setDependency(prevState => ({
                        ...prevState,
                        specialCharacter: !prevState.specialCharacter,
                      }))
                    }
                  />
                  <label htmlFor="SpecialCharacterInput">@#$</label>
                </div>
                
              </div>
{/*  ---------------------------------------------------------------------------------------------------------*/}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


