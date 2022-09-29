/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 15:03:20
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 13:14:19
 * @Description: 比赛type
 */

declare namespace Competition {
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
    crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
    originFileObj?: RcFile;
    response?: T;
    error?: any;
    linkProps?: any;
    type?: string;
    xhr?: T;
    preview?: string;
  }
  type List = {
    id: string;
    name: string;
  }
  type Participant = {
    username: string;
    email: string;
    _id: string
  }

  type CompetitionImage = {
    intro: string;
    url: string;
  }

  type Award = {
    award: string;
  }

  type AwardSetting = {
    award: string;
    limit: number;
  }

  type Winner = Participant & Award;

  type Creator = Participant;

  type Info = {
    place: string;
    way: string;
    limit: number;
    signUpStart: string;
    signUpEnd: string;
    time: string;
    duration: string;
  }

  type Competition = {
    _id: string;
    name: string;
    createdTime: string;
    updatedTime: string;
    participants: Participant[];
    winners: Winner[];
    info: Info;
    intro: string;
    banners: UploadFile[];
    creator: Creator;
    awardSetting: AwardSetting[];
  }
}