import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Link, useNavigate } from 'react-router-dom';



const RideRequestModal = ({ isOpen, onClose, onDriverAccepted }) => {
  const [loading, setLoading] = useState(true);
  const [noDriver, setNoDriver] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    if (isOpen) {
      // Simulate waiting for a driver (replace with WebSocket/API call)
      const timer = setTimeout(() => {
        const driverAccepted = Math.random() > 0.5; // Simulated response

        if (driverAccepted) {
          onDriverAccepted(); // Proceed to payment
        } else {
          setNoDriver(true);
          setLoading(false);
        }
      }, 5000); // Simulate 5s waiting time

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black opacity-90 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-lg w-80 text-center">
          {loading ? (
            <>
              <h2 className="text-lg font-semibold mb-3">Finding a Driver...</h2>
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </>
          ) : noDriver ? (
            <>
              <h2 className="text-lg font-semibold mb-3 text-red-500">No Driver Found</h2>
              <p className="text-gray-600">Please try booking another driver</p>
              <div className="flex  gap-3 " >
              <button
                onClick={onClose}
                className=" bg-red-500 mt-12 text-white px-4 h-10 rounded-lg"
              >
                Close
              </button>

              <button
                onClick={() => navigate("/booking")}
                className=" bg-gradient-to-tr from-green-400 to-gray-800 mt-12 text-xs    text-white px-4 h-10 rounded-lg w-full"
              >
                 Booking Page
              </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Dialog>
  );
};

export default RideRequestModal;
