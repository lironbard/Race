import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div>
      <h4>{data.title}</h4>
      <h3>{data.price}</h3>
      <img src={data.imageUrl} alt="" />
      <Link to="/products">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Card;
