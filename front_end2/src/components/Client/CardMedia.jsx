import PropTypes from "prop-types";
import { CardMedia as CardMediaP } from "@mui/material";

function CardMedia({ productoNombre, img }) {
  return (
    <>
      <CardMediaP
        component="img"
        alt={productoNombre}
        height="140"
        image={img}
        sx={{
          objectFit: "cover",
        }}
      />
    </>
  );
}

export default CardMedia;

CardMedia.propTypes = {
  productoNombre: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
