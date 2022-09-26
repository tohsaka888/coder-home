/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 14:17:50
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 09:49:23
 * @Description: baseUrl
 */

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://coder-home.netlify.app"
    // ? "http://localhost:3000"
    : "http://localhost:3000";
export const competitionUrl = "https://cxy-home-competition.netlify.app";
export const loginUrl = "https://cxy-home-login.netlify.app";
