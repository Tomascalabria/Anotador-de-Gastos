import React from "react";
import { Flex } from "@chakra-ui/react";

export default function IconBox(props) {
  const { children, ...rest } = props;

  return (
    <Flex
      alignItems={"flex-end"}
      justifyContent={"flex-start"}
      borderRadius={"12px"}
      {...rest}
      _hover={{cursor:'pointer'}}
    >
      {children}
    </Flex>
  );
}
