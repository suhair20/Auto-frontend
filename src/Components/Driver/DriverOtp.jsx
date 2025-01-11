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
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="p-3 border border-gray-300 rounded-md w-full"
          />
            {error && (
            <div className="text-red-500 mt-2 text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
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
