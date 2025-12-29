import { useState } from 'react'
import { cn } from '~/utils/cn'
import { Flex } from './shared/Flex'

export interface CategoryFilterProps<T extends string> {
  value: T | undefined
  onChange: (value: T | undefined) => void
  categories: T[]
}

export const CategoryFilter = <T extends string>({
  value: _value,
  onChange: _onChange,
  categories,
}: CategoryFilterProps<T>) => {
  const [value, setValue] = useState<T | undefined>()

  return (
    <Flex gap={8} wrap>
      <button
        onClick={() => {
          _onChange(undefined)
          setValue(undefined)
        }}
        className={cn([
          'px-4 py-2 rounded-lg font-ubuntu font-medium text-sm text-white transition-colors',
          value === undefined ? 'bg-brand-primary' : 'bg-brand-primary/10',
        ])}>
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => {
            _onChange(category)
            setValue(category)
          }}
          className={cn([
            'px-4 py-2 rounded-lg font-ubuntu font-medium text-sm text-white transition-colors',
            value === category ? 'bg-brand-primary' : 'bg-brand-primary/10',
          ])}>
          {category}
        </button>
      ))}
    </Flex>
  )
}
