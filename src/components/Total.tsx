import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { useCallback } from "react";

const Total = () => {
  const total = useAppSelector(state => state.products.total);
  const totalCount = useAppSelector(state => state.products.totalCount);

  const getWordEnd = useCallback((count: number) => {
    if (count > 20 || count < 10) {
      const lastNumber = count % 10;
      if (lastNumber === 1) return "";
      if (lastNumber > 1 && lastNumber < 5) return "а";
    }
    return "ов";
  }, []);

  return (
    <Box mt={14} p={4} display={"flex"} justifyContent={"space-between"}>
      <Typography variant="h5">
        Итого {totalCount} товар{getWordEnd(totalCount)}:
      </Typography>
      <Typography variant="h5">{Math.round(total * 90)}&nbsp;₽</Typography>
    </Box>
  );
};

export default Total;
