import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const OtpVerify = () => {
  let navigate = useNavigate();
  const [Otp, setOtp] = useState(Array(6).fill());
  let [query] = useSearchParams();
  const [email, setEmail] = useState("");
  const otpBoxReference = useRef([]);

  useEffect(() => {
    let o = query.get("email");
    setEmail(o);
  }, []);

  function handleChange(value, index) {
    let newArr = [...Otp];
    newArr[index] = value;

    setOtp(newArr);

    if (value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const hanldeVerify = async () => {
    let otp = Otp.join("");
    let res = await axios.post(
      `${import.meta.env.VITE_PUBLIC_SERVER_HOST}/User/OtpVerify`,
      { email, otp }
    );

    if (res.data.success) {
      toast.success("Verified");
      setTimeout(() => {
        navigate(`/NewPassword?email=${email}&verify=true`);
      }, 800);
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-md shadow-gray-300 border border-gray-300 mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {email}</p>
              </div>
            </div>

            <div>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {Otp.map((digit, index) => (
                    <input
                      key={index}
                      value={digit}
                      type="number"
                      maxLength={1}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                      ref={(reference) =>
                        (otpBoxReference.current[index] = reference)
                      }
                      className={`w-12 h-12 flex flex-col items-center justify-center text-center px-2 outline-none shadow-sm shadow-gray-200 rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700`}
                    />
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      onClick={hanldeVerify}
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p> <Link to={"s"}>Resend</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtpVerify;