<Card  {...cardProps}>
<CardBody w="100%" h={"70%"}>
  <Link key={company.id} to={`/companies/${name}`}>
    <Container
      display={"flex"}
      h={'100%'}
      flexDir={"column"}
    >
        <Flex
          width="100%"
          height="100%"
          justifyContent={'flex-start'}
          alignItems={'flex-start'}>
          {/* <Img
            src={logo}
            color={colorMode === "dark" ? "dark.text" : "light.text"}
            width="40px"
            marginLeft={'-20px'}
            height="40px"
          /> */}
          <Flex w={'100%'}  justifyContent={'flex-start'} alignSelf={'left'} ><Text marginTop={'0'} fontSize="md" color="gray.100">USD</Text></Flex>
        
        <Text w={'100%'} 
          color={colorMode === "dark" ? "dark.text" : "light.text"}
          style={{ fontWeight: "bold", fontSize: "18px", letterSpacing: "1.6px" }}
          >
          U{balanceData.balance_usd}
        </Text>
          </Flex>
    </Container>
  </Link>
</CardBody>
<Divider />
<CardFooter
  display="flex"
  flexDirection="row"
  alignItems="center"
  width="100%"
  height="30%"
  justifyContent="space-between"
  // Adjust the gap as needed
>
  <Text fontSize="sm" color="gray.500">
    {balanceData.last_updated}
  </Text>
  <Button
    size="md"
    title="Refrescar balances"
    background="transparent"
    color={"white"}
    _hover={{ color: '#66a400', background: 'transparent' }}
  >
    <Icon
      alignContent={"flex-end"}
      onClick={updateData}
      justifyContent={"flex-end"}
      _hover={{ color: '#66a400', background: 'rgb(26,27,32)' }}
      display={"flex"}
      as={FaSyncAlt}
      boxSize={4}
      color="white"
    />
  </Button>
</CardFooter>
</Card>


<Card  {...cardProps}>
<CardBody w="100%" h={"70%"}>
  <Link key={company.id} to={`/companies/${name}`}>
    <Container
      display={"flex"}
      h={'100%'}
      flexDir={"column"}
    >
        <Flex
          width="100%"
          height="100%"
          justifyContent={'flex-start'}
          alignItems={'flex-start'}>
          {/* <Img
            src={logo}
            color={colorMode === "dark" ? "dark.text" : "light.text"}
            width="40px"
            marginLeft={'-20px'}
            height="40px"
          /> */}
         <Flex w={'100%'}  justifyContent={'flex-start'} alignSelf={'left'} ><Text marginTop={'0'} fontSize="md" color="gray.100">
            AR$
          </Text>
        
        </Flex>
        <Text
          w={'100%'} 
          color={colorMode === "dark" ? "dark.text" : "light.text"}
          style={{ fontWeight: "bold", fontSize: "18px", letterSpacing: "1.6px" }}
        >
          {balanceData.balance_ars}
        </Text>
        </Flex>
    </Container>
  </Link>
</CardBody>
<Divider />
<CardFooter
  display="flex"
  flexDirection="row"
  alignItems="center"
  width="100%"
  height="40px"
  justifyContent="space-between"
  // Adjust the gap as needed
>
  <Text fontSize="sm" color="gray.500">
    {balanceData.last_updated}
  </Text>
  <Button
    size="md"
    title="Refrescar balances"
    background="transparent"
    color={"white"}
    _hover={{ color: '#66a400', background: 'transparent' }}
  >
    <Icon
      alignContent={"flex-end"}
      onClick={updateData}
      justifyContent={"flex-end"}
      _hover={{ color: '#66a400', background: 'rgb(26,27,32)' }}
      display={"flex"}
      as={FaSyncAlt}
      boxSize={4}
      color="white"
    />
  </Button>
</CardFooter>
  </Card>
