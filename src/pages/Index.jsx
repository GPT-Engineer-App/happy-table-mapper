import React, { useState } from "react";
import { Container, VStack, HStack, Text, Table, Thead, Tbody, Tr, Th, Td, Select, Button, Box, Stat, StatLabel, StatNumber, StatHelpText, StatGroup } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const sampleData = [
  { id: 1, name: "John Doe", age: 28, email: "john@example.com", businessConcept: "Customer" },
  { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com", businessConcept: "Customer" },
  { id: 3, name: "Acme Corp", age: null, email: "contact@acme.com", businessConcept: "Vendor" },
];

const businessConcepts = ["Customer", "Vendor", "Employee", "Product"];

const Index = () => {
  const [data, setData] = useState(sampleData);

  const handleConceptChange = (id, newConcept) => {
    const updatedData = data.map((item) => (item.id === id ? { ...item, businessConcept: newConcept } : item));
    setData(updatedData);
  };

  const getSummaryMetrics = () => {
    const totalEntries = data.length;
    const conceptCounts = data.reduce((acc, item) => {
      acc[item.businessConcept] = (acc[item.businessConcept] || 0) + 1;
      return acc;
    }, {});

    return { totalEntries, conceptCounts };
  };

  const { totalEntries, conceptCounts } = getSummaryMetrics();

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Text fontSize="3xl" fontWeight="bold">
          AI Output Analysis
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Email</Th>
              <Th>Business Concept</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.age}</Td>
                <Td>{item.email}</Td>
                <Td>
                  <Select value={item.businessConcept} onChange={(e) => handleConceptChange(item.id, e.target.value)}>
                    {businessConcepts.map((concept) => (
                      <option key={concept} value={concept}>
                        {concept}
                      </option>
                    ))}
                  </Select>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button colorScheme="green" leftIcon={<FaCheck />}>
                      Accept
                    </Button>
                    <Button colorScheme="red" leftIcon={<FaTimes />}>
                      Reject
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box w="100%">
          <StatGroup>
            <Stat>
              <StatLabel>Total Entries</StatLabel>
              <StatNumber>{totalEntries}</StatNumber>
            </Stat>
            {Object.keys(conceptCounts).map((concept) => (
              <Stat key={concept}>
                <StatLabel>{concept}</StatLabel>
                <StatNumber>{conceptCounts[concept]}</StatNumber>
                <StatHelpText>{((conceptCounts[concept] / totalEntries) * 100).toFixed(2)}%</StatHelpText>
              </Stat>
            ))}
          </StatGroup>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
