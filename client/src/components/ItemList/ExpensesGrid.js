import { Flex, SimpleGrid } from '@chakra-ui/react'
import * as React from 'react'

export const ExpensesGrid = (props) => {
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
    <Flex
    height={'xl'}
    
      columns={columns}
      columnGap={{
      
        base: '15',
        md: '18',
      }}
      rowGap={{
        base: '12',
        md: '14',
      }}
      {...props}
    />
  )
}