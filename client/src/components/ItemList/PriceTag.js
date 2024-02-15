import { HStack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
export function formatPrice(value, opts = {}) {
  const { locale = 'en-US', currency = 'USD' } = opts
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    maximumFractionDigits: 2,
  })
  return formatter.format(value)
}

export const PriceTag = (props) => {
  const { amount, currency, salePrice, rootProps, priceProps, salePriceProps } = props
  return (
    <HStack spacing="1" {...rootProps} justifyContent='space-evenly'>
      <Amount isOnSale={!!salePrice} textProps={priceProps}>
        {formatPrice(amount, {
          currency,
        })}
      </Amount>
      {salePrice && (
        <SalePrice {...salePriceProps}>
          {formatPrice(salePrice, {
            currency,
          })}
        </SalePrice>
      )}
    </HStack>
  )
}

const Amount = (props) => {
  const { isOnSale, children, textProps } = props
  const defaultColor = mode('rgb(26,27,32)Alpha.900', 'rgb(26,27,32)Alpha.900')
  const onSaleColor = mode('red.400', 'red.700')

  const color = isOnSale ? onSaleColor : defaultColor
  return (
    <Text
      as="span"
      fontWeight="medium"
      color={color}
    
      textDecoration={isOnSale ? 'line-through' : 'none'}
      {...textProps}
    >
      {children}
    </Text>
  )
}

const SalePrice = (props) => (
  <Text as="span"   fontWeight="semibold" color={mode('rgb(26,27,32)Alpha.900', 'rgb(26,27,32)Alpha.900')} {...props} />
)