import { Blogs } from '../components/Blogs'
import { Hero } from '../components/Hero'
import { Works } from '../components/Works'

export function meta() {
  return [{ title: 'PolZ - Frontend Developer' }]
}

export default function Page() {
  return (
    <>
      <Hero />
      <Works />
      <Blogs />
    </>
  )
}
