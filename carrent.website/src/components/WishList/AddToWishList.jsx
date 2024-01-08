import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axiosInstance from "../../utils/axiosConfig";

function AddToWishList({ carId, wishlist }) {
  const [isSaved, setIsSaved] = useState(
    wishlist.some((item) => item.carId === carId)
  );

  const Link = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );

  const onSaveClick = () => {
    if (!isSaved) {
      addToWishList();
    } else {
      removeFromWishList();
    }
    setIsSaved(!isSaved);
  };

  const addToWishList = () => {
    axiosInstance
      .post(
        `https://localhost:7091/Wishlist/add`,
        JSON.stringify({ CarId: carId }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromWishList = () => {
    axiosInstance
      .delete(`https://localhost:7091/Wishlist/${carId}`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
