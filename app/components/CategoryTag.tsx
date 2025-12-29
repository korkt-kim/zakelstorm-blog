export const CategoryTag = ({ category }: { category: string }) => {
  return (
    <span className='capitalize bg-grey px-[12px] py-[4px] rounded-2xl'>
      {category}
    </span>
  )
}
