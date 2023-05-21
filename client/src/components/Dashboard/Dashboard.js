import { Container, Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Investments } from "./Finance/investments";

export const Dashboard = ({ props }) => {
  return (
    <Container>
      <SimpleGrid columns={2} spacing={4}>
        <Box>
          <Investments />
        </Box>
        <Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
};
