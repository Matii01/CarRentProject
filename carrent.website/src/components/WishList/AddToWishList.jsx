import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../../api/userApi";

function AddToWishList({ carId, wishlist }) {
  const [isSaved, setIsSaved] = useState(
    wishlist.some((item) => item.carId === carId)
  );
  const [addToWishlist, result] = useAddToWishlistMutation();
  const [removeFromWishlist, res] = useRemoveFromWishlistMutation();

  const Link = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );

  const onSaveClick = async () => {
    if (!isSaved) {
      addToWishlist(carId);
    } else {
      await removeFromWishlist(carId);
    }
    setIsSaved(!isSaved);
  };

  return (
    <>
      {!isSaved && (
        <Link title="Save" id="t-1">
          <i className="fa-regular fa-star" onClick={onSaveClick}></i>
        </Link>
      )}
      {isSaved && (
        <Link title="Saved" id="t-1">
          <i className="fa-solid fa-star" onClick={onSaveClick}></i>
        </Link>
      )}
    </>
  );
}

export default AddToWishList;
