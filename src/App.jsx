import { useState, useCallback, useEffect } from "react";
import ReplayIcon from '@mui/icons-material/Replay';

function App() {
  // const [count, setCount] = useState(0);
  const [password, setPassword] = useState("");
  const [dependency, setDependency] = useState({
    rangeLen: 15,
    uppercase: true,
    lowercase: true,
    numbers: true,
    specialCharacter: false,
  });

  const [leastSelected, setLeastSelected] = useState(1);

  const passwardGenerator = () => {
    let pass = "";
    let str = "";
    if (dependency.uppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (dependency.lowercase) str += "abcdefghijklmnopqrstuvwxyz";
    if (dependency.numbers) str += "0123456789";
    if (dependency.specialCharacter) str += "!@#$%^&*-_+=[]{}~`";

    console.log(dependency.rangeLen);

    for (let i = 0; i < dependency.rangeLen; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    console.log(pass);
    console.log(str);
    setPassword(pass);
  };

  // useEffect(() => {
  //   passwardGenerator();
  // }, [dependency, passwardGenerator]);


  const handleRange = (e) => {
    setDependency((prevState) => ({
      ...prevState,
      rangeLen: parseInt(e.target.value),
    }));
    // console.log("dep", dependency);
  };

  useEffect(() => {
    passwardGenerator();
  }, [dependency])

  return (
    <div className="flex justify-center py-8">
      <div className="w-[85%]">
        <div className="flex flex-col justify-center items-center m-4">
          <h1 className="text-5xl font-bold p-5">Random Password Generator</h1>
          <h3 className="from-neutral-100 p-2 text-xl">
            Create strong and secure passwords to keep your account safe online.
          </h3>
        </div>

        <div className="flex tracking-wide text-[22px]">
          {/* img parameters */}
          <div className="flex basis-2/5">
            <img src="./public/download.svg" alt="" />
          </div>

          {/* input parameters  */}
          <div className="flex flex-col basis-3/5 gap-4 my-4">
            <div className="flex basis-1/3 border-red-200 border-[1px] gap-1 justify-center items-center pl-5">
              <div className="flex flex-row basis-4/5  w-full">
                <div className="">
                  <input
                    type="text"
                    className="outline-none w-[80%] py-1 px-3 rounded-md"
                    placeholder="password"
                    readOnly
                    value={password}
                  />
                </div>
                <div>
                  <button className="bg-[#0070F6] px-1 py-1 rounded-3xl text-center hover:scale-110 hover:ease-in-out duration-300 font-semibold text-white"
                  onClick={passwardGenerator}>
                    {/* <ReplayIcon/> */}
                  </button>
                </div>
              </div>
              <div className="basis-1/5 flex justify-center items-center text-center">
                <button className="bg-[#0070F6] px-5 py-1 rounded-3xl text-center hover:scale-110 hover:ease-in-out duration-300 font-semibold text-white">
                  Copy
                </button>
              </div>
            </div>

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
                  <button
                    className="w-12 h-12 rounded-full m-1 bg-transparent border-[1px] hover:bg-[#e3e3e3] hover:scale-110 hover:ease-in-out duration-300 hover:text-[#181A1B] font-bold text-white"
                    onClick={(e) =>
                      setDependency((prevState) => ({
                        ...prevState,
                        rangeLen: parseInt(prevState.rangeLen - 1),
                      }))
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
                    onClick={(e) =>
                      setDependency((prevState) => ({
                        ...prevState,
                        rangeLen: parseInt(prevState.rangeLen + 1),
                      }))
                    }
                  >
                    <i class="bx bx-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex basis-1/3 border-yellow-200 border-[1px] justify-center items-center pl-5">
              <div className="basis-2/5 ">Characters Used: </div>
              {/* checkbox input */}
              <div className="basis-4/5 flex font-semibold">
                <div className="basis-1/4">
                  <input
                    type="checkbox"
                    defaultChecked={dependency.uppercase}
                    id="UppercaseInput"
                    className="w-5 h-5 rounded-full mx-2 bg-none"
                  />
                  <label htmlFor="UppercaseInput">ABC</label>
                </div>
                <div className="basis-1/4">
                  <input
                    type="checkbox"
                    defaultChecked={dependency.lowercase}
                    id="LowercaseInput"
                    className="w-5 h-5 rounded-full mx-2 bg-none"
                  />
                  <label htmlFor="LowercaseInput">abc</label>
                </div>
                <div className="basis-1/4">
                  <input
                    type="checkbox"
                    defaultChecked={dependency.numbers}
                    id="NumberInput"
                    className="w-5 h-5 rounded-full mx-2 bg-none"
                  />
                  <label htmlFor="NumberInput">123</label>
                </div>
                <div className="basis-1/4">
                  <input
                    type="checkbox"
                    defaultChecked={dependency.specialCharacter}
                    id="SpecialCharacterInput"
                    className="w-5 h-5 rounded-full mx-2 bg-none"
                    // onClick={(e) =>
                    //   setDependency(prevState => {

                    //   })
                    // }
                    onClick={(e) =>
                      setDependency((prevState) => ({
                        ...prevState,
                        specialCharacter: !prevState,
                      }))
                    }
                  />
                  <label htmlFor="SpecialCharacterInput">@#$</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
