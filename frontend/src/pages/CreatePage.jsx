import {
    Box,
    Container,
    Heading,
    Input,
    Button, // Nhập khẩu Button
    useColorModeValue,
    VStack,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import React from "react";
import { useProductStore } from "../store/product";
  
  const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
      name: "",
      price: "",
      image: "",
    });

    const {createProduct} = useProductStore()
  
    const handleAddProduct = async() => {
      const {success, message} = await createProduct(newProduct)
      console.log("Success: ", success);
      console.log("Message: ", message);
    };
  
    return (
      <Container maxW={"container.sm"}>
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create New Product
          </Heading>
  
          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded={"lg"} // Sửa thành 'rounded'
            shadow={"md"}
          >
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price} // Sửa thành 'newProduct.price'
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image} // Sửa thành 'newProduct.image'
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
  
              <Button colorScheme="blue" onClick={handleAddProduct} w="full">
                Add Product
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    );
  };
  
  export default CreatePage;
  