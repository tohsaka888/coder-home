/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 16:42:16
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 16:42:17
 * @Description: type
 */

declare namespace Activity {
  type UploadFile<T = any> = {
    uid: string;
    size?: number;
    name: string;
    fileName?: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    url?: string;
    status?: UploadFileStatus;
    percent?: number;
    thumbUrl?: string;
    crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>["crossOrigin"];
    originFileObj?: RcFile;
    response?: T;
    error?: any;
    linkProps?: any;
    type?: string;
    xhr?: T;
    preview?: string;
  };
  type Activity = {
    name: string; // 活动名称
    createdTime: string; // 创建时间
    updatedTime: string; // 更新时间
    intro: string; // 活动介绍
    images: UploadFile[]; // 活动图片
    author: string; // 活动发布者
    email: string; // 发布者邮箱
    _id: string;
  };
}
