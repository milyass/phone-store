import { useState, useEffect } from "react";
import ProductSimple from "./shared/ProductSimple";
import {
  Heading,
  Center,
  Select,
  Container,
  Box,
  Text,
  FormControl,
  FormLabel,
  Grid, GridItem
} from "@chakra-ui/react";
const SERVER_URL = "http://localhost:3000/api"

function CategorySubcategorySelector({ setData }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  async function fetchCategories() {
    const res = await fetch(`${SERVER_URL}/categories/`);
    const data = await res.json();
    console.log(data);
    setCategories(data.categories);
  }

  const handleCategoryChange = async (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    try {
      const response = await fetch(`${SERVER_URL}/subcategories?categoryId=${category}`);
      if (response.ok) {
        const subcategoryData = await response.json();
        setSubcategories(subcategoryData.subcategories);
      } else {
        console.error(
          "Error fetching subcategories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
  };

  const handleSubCategoryChange = async (event) => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
    try {
      const response = await fetch(`${SERVER_URL}/products?subcategoryId=${subcategory}`);
      if (response.ok) {
        const productsData = await response.json();
        setData(productsData.products);
      } else {
        console.error(
          "Error fetching subcategories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
  };

  return (
    <Box>
      <FormControl>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Select a category"
        >
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {selectedCategory && (
        <FormControl mt={4}>
          <FormLabel>Subcategory</FormLabel>
          <Select
            value={selectedSubcategory}
            onChange={handleSubCategoryChange}
            placeholder="Select a subcategory"
          >
            {subcategories?.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}

export default function Products() {
  const [data, setData] = useState([]);

  return (
    <Box
      bgGradient="linear(to-l, purple.50, whiteAlpha.200)"
      roundedRight={{ base: 150, sm: 50 }}
      marginTop={50}
      padding={8}
    >
      <Container maxW={"container.xl"}>
        <section id="category">
          <Center>
            <Heading fontSize="5xl" fontWeight="extrabold" textAlign={"center"}>
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="extrabold"
                textAlign={"center"}
              >
                Latest Products
              </Text>
            </Heading>
          </Center>
          <Center marginTop={50}>
            <CategorySubcategorySelector setData={setData} />
          </Center>
        </section>
        <section id="#category">
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            {data?.map((item) => (
              <GridItem key={item.id} height="100%">
                <ProductSimple {...item} fontSize={{ base: 'sm', md: 'md' }} lineHeight={{ base: '1.2', md: '1.4' }} />
              </GridItem>
            ))}
          </Grid>

        </section>
      </Container>
    </Box>
  );
}
