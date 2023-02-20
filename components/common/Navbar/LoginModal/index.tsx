/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 15:59:26
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 14:00:38
 * @Description: login modal
 */

import React, { useContext } from "react";
import { LoginModalShowContext } from "context";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { BsFillXCircleFill } from "react-icons/bs";
import { ImageContainer, Title } from "./index.style";
import Image from "next/image";

type Props = {
  width: number;
  height?: number;
  title: string;
  children: React.ReactNode;
};

function LoginModal({ width, height, title, children }: Props) {
  const { modal, setModal } = useContext(LoginModalShowContext)!;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {modal.visible && (
        <>
          <motion.div
            key="mask"
            initial={{
              zIndex: 99999,
              width: "0px",
              height: "0px",
              position: "fixed",
              top: "0px",
              left: "0px",
            }}
            onClick={() => {
              setModal({ ...modal, visible: false });
            }}
            animate={{
              backgroundColor: "#3d3d3d4c",
              width: "100vw",
              height: "100vh",
            }}
            exit={{
              opacity: 0,
            }}
          />
          <motion.div
            key={"modal"}
            initial={{
              width: "0px",
              height: "max-content",
              position: "fixed",
              left: "100%",
              marginLeft: "0px",
              top: "0px",
              zIndex: 100000,
              backgroundColor: "#fff",
              scale: 0,
              boxShadow: "10px 10px 30px #253748,-10px -10px 30px #253748",
              borderRadius: "8px",
              padding: "8px",
            }}
            exit={{
              width: "0px",
              height: "0px",
              opacity: 0,
              scale: 0,
              left: "0px",
              top: "0px",
            }}
            animate={{
              width,
              height,
              scale: 1,
              left: "50%",
              marginLeft: -(width / 2) + "px",
              top: "18vh",
            }}
          >
            <ImageContainer
              left={width / 2 - 50}
              top={-80}
            >
              <Image
                src={"/login.svg"}
                alt={"login"}
                width={100}
                height={100}
              />
            </ImageContainer>
            <Title>{title}</Title>
            <motion.div
              initial={{
                position: "absolute",
                top: "16px",
                right: "16px",
                cursor: "pointer",
              }}
              whileHover={{
                scale: 1.5,
                right: "16px",
                top: "16px",
              }}
            >
              <BsFillXCircleFill
                size={20}
                color={"#000"}
                onClick={() => {
                  setModal({ ...modal, visible: false });
                }}
              />
            </motion.div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default LoginModal;
