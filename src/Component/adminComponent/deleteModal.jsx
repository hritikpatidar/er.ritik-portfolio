"use client";
import { AnimatePresence, motion } from "framer-motion";
// import { clearLocalStorage } from "../Utils/browserServices";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import { LogoutService } from "../Redux/reduxSlice/userServices/userLoginSlice";
// import { removeProfileService } from "../Redux/reduxSlice/userServices/userProfileSlice";

const DeleteModal = ({title, isOpen, setIsOpen, handleDelete, isLoading }) => {

  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Prevent scrolling on the body */}
          <style>{`
            body {
              overflow: hidden;
            }
          `}</style>

          {/* Modal Content */}
          <motion.div
            className="bg-white rounded-lg p-8 shadow-lg text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {title}
            </h2>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              {/* Yes Button */}
              <motion.button
                className={`px-6 py-2 rounded-full ${isLoading
                    ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                    : "bg-[#FFC300] text-white"
                  }  font-semibold`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? "Yes..." : "Yes"}
              </motion.button>
              {/* <ButtonLoading /> */}

              {/* No Button */}
              <motion.button
                className={`px-6 py-2 rounded-full border ${isLoading
                    ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                    : "border-[#FFC300] text-[#FFC300]"
                  }  font-semibold bg-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                disabled={isLoading}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
