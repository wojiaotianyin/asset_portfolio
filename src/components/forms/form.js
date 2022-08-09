import React, { useState, useEffect } from "react";
// import {useState} from "react"
import Axios from "axios";
import Plot from "react-plotly.js";
Axios.defaults.baseURL = "http://127.0.0.1:5000";
Axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

const Form = (props) => {
  const [visualized_, setVisualized] = useState(false);
  const [amountArr, setAmountArr] = useState({ amount: [] });
  const [assetsName, setAssetsName] = useState({ name: [] });
  const [sumAssets, setSumAssets] = useState("0");
  const [pastDate, setPastDate] = useState("");
  const [dates, setDates] = useState("");
  const [date_key, setDateKey] = useState("");
  const [state, setState] = useState({
    tasks: [{ assets_name: "", assets_amount: "" }],
  });
  // this.handleSubmit = this.handleSubmit.bind(this);

  /**
   * APIから値を取得する
   */
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/get_past_dates");
      const date_ = response.data.date;
      const date_arr = [];
      for (let i in date_) {
        const ele = date_[i]["portfolio"];
        const date_with_id = { el: [ele[0], datePretty(new Date(ele[1]))] };
        date_arr.push(date_with_id);
      }
      date_arr.sort();
      date_arr.reverse();
      setDates(date_arr);
    }
    fetchData();
  }, [setDates]);

  /**
   * 日付の成形を行う
   * @param {*} date
   * @returns
   */
  function datePretty(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return (
      y +
      "年" +
      m.toString().padStart(2, "0") +
      "月" +
      d.toString().padStart(2, "0") +
      "日"
    );
  }

  const addNewTask = () => {
    setState({
      tasks: [
        ...state.tasks,
        {
          assets_name: "",
          assets_amount: "",
        },
      ],
    });
    console.log(state); //これを送信側に送る
  };

  const sumNumber = (data, input) => {
    //parseIntをしないと文字列として認識される
    return parseInt(data) + parseInt(input);
  };

  const visualization = () => {
    setVisualized(true);
    const am = { amount: [] };
    const nm = { name: [] };
    for (let i of state.tasks) {
      setSumAssets((sumAssets) => sumNumber(sumAssets, i.assets_amount));
      am["amount"].push(i.assets_amount);
      setAmountArr(am);
      nm["name"].push(i.assets_name);
      setAssetsName(nm);
    }
  };

  // useEffect(() => {
  //   console.log(visualized_);
  // }, [visualized_]);

  const handleChange = (e, index) => {
    state.tasks[index][e.target.name] = e.target.value;
    setState({ tasks: state.tasks });
    //setVisualized(false);
  };

  /**
   * 表示したグラフデータをクリアにする
   */
  const clearData = () => {
    console.log("hello")
    setAmountArr({ amount: [] });
    setAssetsName({ name: [] });
    setVisualized(false);
    setSumAssets(0);
    setState({
      tasks: [{ assets_name: "", assets_amount: "" }],
    });
  };

  const getCalender = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setDateKey(e.target.options[selectedIndex].getAttribute("data-key"));
    const date__ = e.target.value;
    const d = date__.replace(/[^0-9]/g, "-");
    setPastDate(d.slice(0, -1));
  };

  const visualizeFromPast = () => {
    Axios.post("/get_past_data", pastDate).then(function (res) {
      const past_data = res.data;
      const past_task = { tasks: [] };
      for (let i of past_data.portfolio) {
        const el = { assets_name: i[0], assets_amount: parseInt(i[1]) };
        past_task["tasks"].push(el);
      }
      setState(past_task);
    });
  };

  const deletePastData = () => {
    let delete_date_ = "";
    for(let i of dates){
      if(i.el[0] == date_key){
        delete_date_ = i.el[1]
      }
    }
    const ans = window.confirm(delete_date_ + "のデータを削除してよろしいですか？");
    if (!ans) {
      return;
    } else {
      Axios.post("/delete", date_key).then(function (res) {
        const delete_data = res.data;
        console.log(delete_data);
      });
    }
  };

  // useEffect(() => {
  //   visualization();
  // }, [state]);

  // const handleSubmit=(event)=> {
  //   event.preventDefault();
  //   // this.visualized = true;
  //   // this.setVisualized=true;
  //   // const [setLabels, setValues] = useState(0);

  //   this.varArr =[];
  //   this.labelsArr = [];
  //   const data = [];
  //   for(let i of this.state["tasks"]){
  //       if (i["assets_amount"] !='' || i["assets_name"] !=''){
  //           data.push(i)
  //       }
  //       if (i["assets_amount"] !=''){
  //           this.varArr.push(i["assets_amount"])
  //       }
  //       if (i["assets_name"] !=''){
  //           this.labelsArr.push(i["assets_name"])
  //       }
  //       // setLabels(this.labelsArr)
  //       // setValues(this.varArr)
  //   }
  //   // this.visualize(data);
  // }

  /**
   * matplotlibでグラフを作成
   */
  const savePortfolio = () => {
    console.log("saving graph");
    Axios.post("/post_visualization", state, {
      post_text: "============== lets visualize by matplotlib =========",
    }).then(function (res) {
      const data_arr = res.data;
      console.log(data_arr);
      alert("Portfolio Saved!");
    });
  };

  return (
    <div className="input-wrapper">
      <div className="input-wrapper-inner">
        <div className="newOnesWrapper">
          {state.tasks.map((task, index) => {
            return (
              <div key={index}>
                <div className="middle">
                  <div className="set-wrapper">
                    <label>アセット名:&nbsp;</label>
                    <input
                      type="text"
                      value={task.assets_name}
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                      name="assets_name"
                    />
                  </div>
                  &emsp;
                  <div className="set-wrapper">
                    <label>投資金額:&nbsp;</label>
                    <input
                      type="text"
                      value={task.assets_amount}
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                      name="assets_amount"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div>総額：{sumAssets}&nbsp;円</div>
          <button type="button" onClick={() => addNewTask()}>
            追加
          </button>
          {/* <form onSubmit={this.handleSubmit}> */}
          <input
            type="submit"
            value="可視化する"
            onClick={() => visualization()}
          />
          <input
            type="submit"
            value="保存する"
            onClick={() => savePortfolio()}
          />
          <input type="button" value="クリア" onClick={() => clearData()} />
        </div>
        <div className="pastWrapper">
          <p>過去のデータを可視化する</p>
          <div className="inputs">
            {dates !== "" ? (
              <select
                onChange={(e) => {
                  getCalender(e);
                }}
              >
                (
                {dates.map((value) => {
                  return (
                    <option key={value.el[0]} data-key={value.el[0]}>
                      {value.el[1]}
                    </option>
                  );
                })}
              </select>
            ) : null}
            <input
              type="submit"
              value="可視化する"
              onClick={() => visualizeFromPast()}
            />
            <input
              type="button"
              className="delete_btn"
              value="このデータを削除する"
              onClick={() => deletePastData()}
            />
          </div>
        </div>
        {/* </form> */}
      </div>
      <div className="graph">
        {visualized_ ? (
          <Plot
            data={[
              // 線グラフと棒グラフを両方表示するのであればブラケットを一つ増やす
              // { type: 'pie', values: [130, 26, 55], labels: ['Residential', 'Non-Residential', 'Utility'], },
              {
                type: "pie",
                values: amountArr.amount,
                labels: assetsName.name,
              },
            ]}
            layout={{
              width: 500,
              height: 500,
              title: "可視化したポートフォリオ",
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Form;
