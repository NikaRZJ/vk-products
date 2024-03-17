import { Box, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { getProducts } from "./productsSlice";
import ProductCard from "../../components/ProductCard";
import ErrorIcon from "@mui/icons-material/Error";

const Products = () => {
  const { products, status } = useAppSelector(state => state.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Box p={4}>
      <Typography variant="h3" mb={2}>
        Корзина
      </Typography>
      <Box display={"flex"} flexDirection={"column"}>
        {status === "loading" && <CircularProgress sx={{ margin: "0 auto" }} />}
        {status === "failed" && (
          <Box display={"flex"} mt={6} justifyContent={"center"}>
            <Typography textAlign={"center"} mr={1} color="text.secondary">
              Ошибка сети{" "}
            </Typography>
            <ErrorIcon color="error" />
          </Box>
        )}
        {products.length === 0 && status === "idle" && (
          <Typography textAlign={"center"} mt={6} color="text.secondary">
            Корзина пуста
          </Typography>
        )}
        {products.map((item, index) => (
          <ProductCard
            key={item.id}
            product={item}
            marginBottom={index !== products.length - 1 ? 2 : 0}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Products;
