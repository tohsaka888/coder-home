/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 15:03:00
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 12:53:19
 * @Description: type
 */

declare namespace HomePage {
  type ModalProps = {
    type: "login" | "register" | "forget";
    visible: boolean;
  };
}

declare namespace Context {
  type LoginModalProps = {
    modal: HomePage.ModalProps;
    setModal: React.Dispatch<React.SetStateAction<HomePage.ModalProps>>;
  };

  type TokenProps = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  };
}
