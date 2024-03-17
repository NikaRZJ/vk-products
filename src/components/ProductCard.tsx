import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import type { Product } from "../models/Product";
import { type FC, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useAppDispatch } from "../app/hooks";
import {
  decCountProduct,
  deleteProduct,
  incCountProduct,
} from "../features/products/productsSlice";

type ProductCardProps = {
  product: Product;
  marginBottom: number;
};

const ProductCard: FC<ProductCardProps> = ({ product, marginBottom }) => {
  const { id, title, image, description, price, count } = product;

  const dispatch = useAppDispatch();

  const handleRemove = useCallback(
    (amount: number, id: number, price: number) => {
      if (amount > 1) dispatch(decCountProduct({ id, price }));
    },
    [dispatch],
  );

  const handleAdd = useCallback(
    (amount: number, id: number, price: number) => {
      if (amount < 10) dispatch(incCountProduct({ id, price }));
    },
    [dispatch],
  );

  return (
    <Card variant="outlined" sx={{ marginBottom }}>
      <CardContent>
        <Box display={"flex"} justifyContent={"center"} mb={2}>
          <CardMedia
            component={"img"}
            alt={title}
            sx={{ objectFit: "contain", height: 200, width: 200 }}
            image={image}
          />
        </Box>

        <Box mr={2}>
          <Typography variant={"h6"} mb={2}>
            {title}
          </Typography>
          <Typography color={"text.secondary"} mb={2}>
            {description}
          </Typography>
          <Typography fontWeight={"bold"}>
            Стоимость: {Math.round(price * count * 90)}&nbsp;₽
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderRadius={10}
          width={120}
          border="1px solid rgba(0,0,0,0.12)"
        >
          <IconButton onClick={() => handleRemove(count, id, price)}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="h6">{count}</Typography>
          <IconButton onClick={() => handleAdd(count, id, price)}>
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          onClick={() => dispatch(deleteProduct(product))}
          sx={{ color: "rgb(174, 183, 194)" }}
        >
          <DeleteOutlinedIcon sx={{ mr: 1 }} />
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
