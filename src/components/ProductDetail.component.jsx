import React from "react";
import data from "../data";
import Card from "./Card.component";

class ProductsDetail extends React.Component {
  state = { product: null };
  componentDidMount() {
    const id = Number(this.props.match.params.id);
    const findProduct = data.find((item) => {
      return item.id === id;
    });
    this.setState({ product: findProduct });
  }
  render() {
    return <div>{this.state.product && <Card data={this.state.product} />}</div>;
  }
}

export default ProductsDetail;
