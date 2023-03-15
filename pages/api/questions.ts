// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send([
    {
      question: "What is the answer to life, the universe, and everything?",
      id: 1,
      answer: {
        A: "42",
        B: "sdkjowqej1290dksajdkl121313123123",
        C: "asl;dk,a.smdm23io44u3294uijasjndj",
        D: "pxiclmkdwe,lmo3kjdoplpdkaklmewkomklmcx,mkewm",
      },
      correctAnswer: "A",
    },
    {
      question:
        "可视对讲喀什角动量喀什假大空拉升阶段看喀什觉得啦数据库的卡拉健康垃圾的绿卡？",
      id: 2,
      answer: {
        A: "ask到了",
        B: "哦哦睡觉哦实际上",
        C: "asl;dk,a.啊实打实的",
        D: "pxiclmkdwe,lmo3kjdoplpdkaklmewkomklmcx,奥克兰排毒就昂宿",
      },
      correctAnswer: "B",
    },
    {
      question:
        "可视对讲喀什角动量喀什假大空拉升阶段看喀什觉得啦数据库的卡拉健康垃圾的绿卡？",
      id: 3,
      answer: {
        A: "ask到了",
        B: "哦哦睡觉哦实际上",
        C: "asl;dk,a.啊实打实的",
        D: "pxiclmkdwe,lmo3kjdoplpdkaklmewkomklmcx,奥克兰排毒就昂宿",
      },
      correctAnswer: "A",
    },
    {
      question:
        "可视对讲喀什角动量喀什假大空拉升阶段看喀什觉得啦数据库的卡拉健康垃圾的绿卡？",
      id: 4,
      answer: {
        A: "ask到了",
        B: "哦哦睡觉哦实际上",
        C: "asl;dk,a.啊实打实的",
        D: "pxiclmkdwe,lmo3kjdoplpdkaklmewkomklmcx,奥克兰排毒就昂宿",
      },
      correctAnswer: "A",
    },
    {
      question:
        "可视对讲喀什角动量喀什假大空拉升阶段看喀什觉得啦数据库的卡拉健康垃圾的绿卡？",
      id: 5,
      answer: {
        A: "ask到了",
        B: "哦哦睡觉哦实际上",
        C: "asl;dk,a.啊实打实的",
        D: "pxiclmkdwe,lmo3kjdoplpdkaklmewkomklmcx,奥克兰排毒就昂宿",
      },
      correctAnswer: "D",
    },
  ]);
}
