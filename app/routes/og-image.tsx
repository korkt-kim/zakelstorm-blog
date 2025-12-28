import { Resvg } from '@resvg/resvg-js'
import { type LoaderFunctionArgs } from 'react-router'
import satori from 'satori'
import { FreesentationFont } from '~/utils/fonts'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title') || ''

  // Fetch font files from public directory
  const origin = new URL(request.url).origin
  const fontData = await Promise.all(
    Object.values(FreesentationFont).map(async ({ filename, weight }) => {
      const fontUrl = `${origin}/fonts/${filename}`
      const response = await fetch(fontUrl)
      const data = await response.arrayBuffer()

      return {
        name: 'Freesentation',
        data,
        weight,
      }
    })
  )

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: 40,
        justifyContent: 'center',
      }}>
      <h1 className='text-[60px] mb-[20px]'>{title}</h1>
      <p>By PolZ</p>
    </div>,
    {
      width: 600,
      height: 400,
      fonts: fontData,
    }
  )

  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  return new Response(pngBuffer as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
