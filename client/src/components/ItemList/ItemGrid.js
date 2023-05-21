import { SimpleGrid } from '@chakra-ui/react'
import * as React from 'react'

export const ItemGrid = (props) => {
  const columns = React.useMemo(() => {
    const count = React.Children.toArray(props.children).filter(React.isValidElement).length
    return {
      base: Math.min(2, count),
      md: Math.min(3, count),
      lg: Math.min(4, count),
      xl: Math.min(5, count),
    }
  }, [props.children])
  return (
    <SimpleGrid
    w={'100%'}
      columns={columns}
      columnGap={{
        base: '4',
        md: '6',
      }}alignItems='flex-end'
      rowGap={{
        base: '5',
        
        md: '10',
      }}
      {...props}
    />
  )
}