import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions, 
  CardContent,
  CardMedia,
  Rating, 
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia 
        component="img"
        height="100"
        image={product.image}
        alt="Image"
      />
      <CardContent>
        <Typography color="text.primary">
          {product.name}
        </Typography>
        <Typography color="text.primary">
          ${product.cost}
        </Typography>
        <Typography color="text.primary">
          <Rating 
            name="half-rating-read"
            defaultValue={product.rating}
            precision={0.5}
            readOnly
          />
        </Typography>
      </CardContent>
      <CardActions className="card-action">
        <Button 
          className="card-button" 
          variant="contained" 
          startIcon={<AddShoppingCartOutlined />}
          onClick={handleAddToCart}
          fullWidth
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
