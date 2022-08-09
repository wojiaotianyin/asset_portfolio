import "./inputs.css";
import React from "react";
import Axios from "axios";
import Plot from 'react-plotly.js';
// import Form from "../forms/form_.js";
Axios.defaults.baseURL = "http://127.0.0.1:5000";
Axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

/**
 * saveでDBに可視化データを保存、show past dataでDBから過去のデータを取得、visualizeで表示。
 * ADDで表示する値を増やす。
 */



class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assetsName: "", assetsAmount: "" };
    console.log(this.state);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // this.createPost();
    event.preventDefault();
    const data = {data:[this.state.assetsName, this.state.assetsAmount]};
    this.visualize(data);
    event.preventDefault();
  }




  /**
   * DBにデータを保存
   */
  createPost() {
    Axios.post("/home",{ mode: 'cors' },  {
      post_text: "hello from react",
    }).then(function (res) {
      console.log(res);
    });
  }

 

  /**
   * matplotlibでグラフを作成
   */
  visualize(data) {
    console.log(data)
    console.log("Creating graph");
    Axios.post("/visualization", data, {
      post_text: "============== lets visualize by matplotlib =========",
    }).then(function (res) {
      const data_arr = res.data;
    });
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Save this portfolio!" />
      </form>
    );
  }
}

export default Inputs;
