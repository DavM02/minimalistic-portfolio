import { motion } from "framer-motion";
import React from 'react';
import { useLocation } from "react-router-dom";

function PageTransition(props) {

  return <>
    <motion.section
       {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5}}
    >
      {props.children}
    </motion.section>
  </>
}

export default PageTransition;