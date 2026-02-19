import React from 'react'
import { motion } from "framer-motion";

const ButtonLoading = ({isLoading,buttonName,buttonWidth}) => {
    return (
        <>

            {/* <motion.button
                className={`w-full ${buttonWidth} py-3 rounded-full ${isLoading ? "bg-gray-200 text-gray-700 cursor-not-allowed " : "bg-[#FFC300] text-white"} font-semibold transform transition-transform hover:scale-105`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
            > */}
                {
                    isLoading ?
                        <div className="flex items-center justify-center">
                            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>

                            <h3 className='ms-3 text-gray-500 '>Processing...</h3>
                        </div>
                        :
                        buttonName
                }
            {/* </motion.button> */}
        </>
    )
}

export default ButtonLoading