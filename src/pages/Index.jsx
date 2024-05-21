import React, { useState } from "react";
import { Container, VStack, HStack, Text, Table, Thead, Tbody, Tr, Th, Td, Select, Button, Box, Stat, StatLabel, StatNumber, StatHelpText, StatGroup } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const sampleData = [
  { id: 1, productName: "Laptop", productDescription: "High-end gaming laptop", price: 1500, purchaseDateTime: "2024-05-20T14:48:00.000Z", skuID: "LAP123", productCategory: "Electronics", customerAction: "bought product" },
  { id: 2, productName: "Headphones", productDescription: "Noise-cancelling headphones", price: 200, purchaseDateTime: "2024-05-19T10:30:00.000Z", skuID: "HEAD456", productCategory: "Electronics", customerAction: "bought product" },
  { id: 3, productName: "Coffee Maker", productDescription: "Automatic coffee maker", price: 100, purchaseDateTime: "2024-05-18T08:15:00.000Z", skuID: "COF789", productCategory: "Home Appliances", customerAction: "bought product" },

  ...Array.from({ length: 100 }, (_, i) => ({
    id: i + 4,
    productName: ["Laptop", "Headphones", "Coffee Maker", "Smartphone", "Tablet"][Math.floor(Math.random() * 5)],
    productDescription: ["High-end gaming laptop", "Noise-cancelling headphones", "Automatic coffee maker", "Latest model smartphone", "Portable tablet"][Math.floor(Math.random() * 5)],
    price: [1500, 200, 100, 800, 300][Math.floor(Math.random() * 5)],
    purchaseDateTime: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    skuID: ["LAP123", "HEAD456", "COF789", "SMART123", "TAB456"][Math.floor(Math.random() * 5)],
    productCategory: ["Electronics", "Home Appliances", "Gadgets", "Accessories", "Office Supplies"][Math.floor(Math.random() * 5)],
    customerAction: "bought product",
  })),
];

const customerActions = ["bought product"];

const Index = () => {
  const [data, setData] = useState(sampleData);

  const handleActionChange = (id, newAction) => {
    const updatedData = data.map((item) => (item.id === id ? { ...item, customerAction: newAction } : item));
    setData(updatedData);
  };

  const getSummaryMetrics = () => {
    const totalEntries = data.length;
    const conceptCounts = data.reduce((acc, item) => {
      acc[item.customerAction] = (acc[item.customerAction] || 0) + 1;
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
        <Box maxH="400px" overflowY="auto" w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Product Name</Th>
                <Th>Product Description</Th>
                <Th>Price</Th>
                <Th>Purchase Date Time</Th>
                <Th>SKU ID</Th>
                <Th>Product Category</Th>
                <Th>Customer Action</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.slice(0, 15).map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.productName}</Td>
                  <Td>{item.productDescription}</Td>
                  <Td>{item.price}</Td>
                  <Td>{new Date(item.purchaseDateTime).toLocaleString()}</Td>
                  <Td>{item.skuID}</Td>
                  <Td>{item.productCategory}</Td>
                  <Td>
                    <Select value={item.customerAction} onChange={(e) => handleActionChange(item.id, e.target.value)}>
                      {customerActions.map((action) => (
                        <option key={action} value={action}>
                          {action}
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
        </Box>
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
