import { Grid } from "@mui/material";
import Products from "./features/products/Products";
import Total from "./components/Total";

const App = () => {
  return (
    <Grid container direction={"row"} justifyContent={"center"} spacing={4}>
      <Grid item xs={4}>
        <Products />
      </Grid>
      <Grid item xs={4}>
        <Total />
      </Grid>
    </Grid>
  );
};

export default App;
