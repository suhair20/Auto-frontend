import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const DriverOtp = ({ isOpen, onRequestClose, onSubmit, onResendOtp,error }) => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60); 
    const [canResend, setCanResend] = useState(false);
  
    const startTimer=() => {
      if (isOpen) {
        setTimer(60); 
        setCanResend(false);
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(interval); 
      }
    }
    useEffect(() => {
      if (isOpen) {
        startTimer();
      }
    }, [isOpen]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(otp);
    };
  
    const handleResendOtp = (e) => {
      e.preventDefault();
      e.stopPropagation();
      startTimer()
      setCanResend(false); 
      onResendOtp();
    };
    return(
    <div>
       <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="OTP Modal"
      className="fixed inset-0 flex items-center justify-center "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
      <h1 className="text-3xl font-serif  bg-clip-text bg-gradient-to-br from-green-900 to-gray-800 text-transparent mb-4 text-center">  OTP</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
             className="p-2 border-1 border-gray-600 font-bold rounded-md w-full"
          />
            {error && (
            <div className="text-red-500 mt-2 text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
           className="  text-white py-3  bg-gradient-to-tr from-green-900 to-gray-800 rounded-md  "
          >
            Verify OTP
          </button>
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-600">
              {canResend ? 'You can resend OTP now.' : `Resend OTP in ${timer}s`}
            </span>
            {canResend && (
              <button
                onClick={handleResendOtp}
                className="text-teal-600 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
    </div>
  )
}

export default DriverOtp
