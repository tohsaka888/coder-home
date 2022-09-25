// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import svgCaptcha from 'svg-captcha'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let authcode: { text: string; data: string } = { text: '', data: '' }
  if (Math.random() > 0.5) {
    authcode = svgCaptcha.create({
      size: 4,
      noise: 6,
      color: true,
      width: 100,
      height: 30
    })

  } else {
    authcode = svgCaptcha.createMathExpr({
      size: 4,
      noise: 6,
      color: true,
      width: 100,
      height: 30
    })
  }
  res.status(200).json({ ...authcode })
}