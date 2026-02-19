"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { EllipsisVertical, Phone, User } from "lucide-react";
import Pagination from "../../Container/AdminPages/Pagination";

import dummyprofilepic from "../../../public/dummyprofilepic.png";

const UserListCard = ({
  userList,
  handleOpenModle,
  handleBlockAndUnClockUSer,
  isLoading,
  userDetails,
  isOpen,
  setIsOpen,
  isBlock,
  router,
  currentPage,
  setCurrentPage,
  searchTerm
}) => {

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // Ensure the component is mounted
  const [status, setStatus] = useState("")
  const usersPerPage = 8;

  const filteredUsers = userList?.filter((user) =>
    user?.first_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    user?.last_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const toggleDropdown = (userId) => {
    if (openDropdownId === userId) {
      setOpenDropdownId(null); // Close the dropdown if clicked again
    } else {
      setOpenDropdownId(userId); // Open the dropdown for the clicked user
    }
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-button") &&
        !event.target.closest(".dropdown-menu")
      ) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Set the component as mounted after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Only render the content if the component is mounted on the client side
  if (!isMounted) return null;

  const handleProductClick = (user) => {
    const userData = {
      ...user,
      profile: user.profile, // Assuming you're using next/image, access the src property.
    };
    const queryString = new URLSearchParams(userData).toString();
    router.push(`/admin/users/user-details?${queryString}`);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-2 border-[#FFC300] border-t-transparent rounded-full"></div>
        </div>
      ) : currentUsers?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-3">
          {currentUsers.map((user, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 border-b-4 border-[#FFC300] pb-6 m-4"
              whileHover={{ scale: 1.05 }}
            >
              {/* Avatar Image */}
              <div className="flex justify-center">
                <div className="absolute -top-6">
                  {user.profile ? (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-16 h-16"
                    >
                      <img
                        src={user.profile}
                        alt="Avatar"
                        className="h-full w-full object-cover rounded-full border-2 border-white"
                      />
                    </motion.div>
                  ) : (
                    <Image
                      width={60}
                      height={60}
                      src={dummyprofilepic}
                      alt="Avatar"
                      className="rounded-full border-2 border-white shadow-md"
                    />
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="pt-16 px-4">
                {/* <h3 className="text-gray-900 text-base font-bold flex items-center">
                  <div className="bg-[#fff9e5] rounded mr-2 p-1">
                    <User className="w-5 h-5 text-yellow-500" />
                  </div>
                  {`${(user?.first_name + " " + user?.last_name).substring(
                    0,
                    12
                  )}${
                    user?.first_name.length + user?.last_name.length + 1 > 12
                      ? "..."
                      : ""
                  }`}
                </h3> */}
                <h3 className="text-gray-900 text-base font-bold flex items-center">
                  <div className="bg-[#fff9e5] rounded mr-2 p-1">
                    <User className="w-5 h-5 text-yellow-500" />
                  </div>
                  {user?.first_name && user?.last_name
                    ? (user.first_name + " " + user.last_name)?.length > 12
                      ? (user.first_name + " " + user.last_name).substring(
                        0,
                        12
                      ) + "..."
                      : user.first_name + " " + user.last_name
                    : ""}
                </h3>

                <p className="text-gray-600 mt-2 flex items-center text-sm">
                  <div className="bg-[#fff9e5] rounded mr-2 p-1">
                    <Phone className="w-5 h-5 text-yellow-500" />
                  </div>
                  +91 {user.phone_no}
                </p>
              </div>

              {/* Dropdown Button */}
              <motion.button
                onClick={() => toggleDropdown(user._id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 dropdown-button"
                whileTap={{ scale: 0.9 }}
              >
                <EllipsisVertical size={15} />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {openDropdownId === user._id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-4 top-10 bg-white shadow-lg rounded-xl w-28 z-10 border dropdown-menu"
                  >
                    <ul className="py-2 text-gray-700 text-center">
                      <li
                        className="px-4 py-2 hover:bg-[#fff9e5] hover:text-[#FFC300] duration-300 cursor-pointer text-sm font-medium"
                        onClick={() => handleProductClick(user)}
                      >
                        View
                      </li>
                      <li
                        onClick={() => {
                          setStatus(user?.block_status === false ? "block" : "unblock")
                          handleOpenModle(user)
                        }}
                        className="px-4 py-2 hover:bg-[#fff9e5] hover:text-[#FFC300] duration-300 cursor-pointer text-sm font-medium"
                      >
                        {user?.block_status === false ? "Block" : "Unblock"}
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">
          <h5 className="">user not found</h5>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && filteredUsers?.length > usersPerPage && (
        <div className="flex justify-between items-center mt-6">
          <span className="text-gray-600 text-sm font-normal">
            Showing {usersPerPage} entries
          </span>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers?.length / usersPerPage)}
            onPageChange={paginate}
          />
        </div>
      )}
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
              {` Are you sure you want to ${status} this user?`}
            </h2>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              {/* Yes Button */}
              <motion.button
                className={`px-6 py-2 rounded-full ${isBlock
                  ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                  : "bg-[#FFC300] text-white"
                  }  font-semibold`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBlockAndUnClockUSer}
                disabled={isBlock}
              >
                {isBlock ? "Yes..." : "Yes"}
              </motion.button>
              {/* <ButtonLoading /> */}

              {/* No Button */}
              <motion.button
                className={`px-6 py-2 rounded-full border ${isBlock
                  ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                  : "border-[#FFC300] text-[#FFC300]"
                  }  font-semibold bg-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                disabled={isBlock}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default UserListCard;
