/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 14:17:50
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 16:38:43
 * @Description: baseUrl
 */

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://coder-home.tohsaka888.asia"
    : // ? "http://localhost:3000"
      "http://localhost:3000";

export const activityUrl = `https://cxy-home-activity.tohsaka888.asia`;
export const competitionUrl = "https://cxy-home-competition.tohsaka888.asia";
export const loginUrl = "https://cxy-home-login.tohsaka888.asia";
