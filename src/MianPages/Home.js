import React, { useState } from "react";
import Chart from "./components/Chart";

function Home(props) {
  let [chosen, setChosen] = useState(null);
  let [result, setResult] = useState(null);
  let [suggestions, setSuggestions] = useState(null);
  let [statements, setStatements] = useState(null);
  let [suggestions_s, setSuggestions_s] = useState(null);
  let options = [];
  let donemembers = [];
  for (var i = 0; i < props.teammembers.length; i++) {
    options.push(props.teammembers[i].name);
    if (props.done.includes(props.teammembers[i].email)) {
      donemembers.push(props.teammembers[i].name);
    }
  }
  const buttons = options.map((option) => (
    <button
      className="options"
      key={option}
      id={option}
      name={option}
      style={{
        background: chosen === option && "#F6511D",
        border: donemembers.includes(option) && "3px solid #FFF",
      }}
      onClick={() => {
        // setChosen(option)
        updateChosen(option);
      }}
    >
      {option}
    </button>
  ));

  function formatData(object) {
    let values = Object.values(object).sort((a, b) => b - a);
    let keys = [];
    let x;
    var copy = JSON.parse(JSON.stringify(object));
    function getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    }
    for (var i = 0; i < values.length; i++) {
      x = getKeyByValue(copy, values[i]);
      delete copy[x];
      keys.push(x);
    }
    let result = {};
    result = { keys: keys, values: values };
    return result;
  }
  function updateChosen(option) {
    setChosen(option);
    setSuggestions(null);
    setResult(null);
    setStatements(null);
    setSuggestions_s(null);
    let suggestions_t, suggestions_ts;
    if (props.dataset[option] && props.dataset[option]["traits"]) {
      setResult(formatData(props.dataset[option]["traits"]));
    }
    if (props.dataset[option] && props.dataset[option]["suggestions"]) {
      suggestions_t = formatData(props.dataset[option]["suggestions"]);
    }
    if (props.dataset[option] && props.dataset[option]["suggestions(self)"]) {
      suggestions_ts = props.dataset[option]["suggestions(self)"].slice();
    }
    if (suggestions_ts) {
      for (var i = 0; i < suggestions_ts.length; i++) {
        let index_s = suggestions_ts[i].indexOf("-");
        suggestions_ts[i] =
          props.suggestions[suggestions_ts[i].slice(index_s + 1)];
      }
      setSuggestions_s(suggestions_ts);
    }
    if (suggestions_t) {
      for (var i = 0; i < suggestions_t.keys.length; i++) {
        let index = suggestions_t.keys[i].indexOf("-");
        suggestions_t.keys[i] =
          props.suggestions[suggestions_t.keys[i].slice(index + 1)];
      }
      setSuggestions(suggestions_t);
    }
    let qns = [];
    if (props.dataset[option] && props.dataset[option]["qns"]) {
      qns = props.dataset[option]["qns"].slice();
    }
    let qnlvls = [];
    for (var i = 0; i < qns.length; i++) {
      let temp = 1;
      for (var j = i + 1; j < qns.length; j++) {
        if (qns[j] === qns[i]) {
          temp++;
          qns.splice(j, 1);
          j--;
        }
      }
      qnlvls.push(temp);
    }
    let temp_s = {};
    for (var i = 0; i < qns.length; i++) {
      temp_s[qns[i]] = qnlvls[i];
    }
    setStatements(formatData(temp_s));
  }
  function getwidth(object, n) {
    let width = (100 / 5) * object.values[n];
    return width;
  }
  return (
    <div>
      <h1 className="title-wrap">Results</h1>

      <div className="options-wrap">{buttons}</div>

      {chosen && (
        <div className="results-wrap">
          <div className="one">
            <div className="traits">
              <h1 className="sub-head">Top Traits</h1>
              {result && <Chart data={result} />}
              {!result && <div className="score-wrap no-data">No Data</div>}
            </div>
            <div className="statements">
              <h1 className="sub-head">Top Descriptions By Others</h1>
              {statements && (
                <div className="score-wrap" style={{ color: "black" }}>
                  <div className="statement">{statements.keys[0]}</div>
                  {statements.keys[0] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(statements, 0) + "%" }}
                    ></div>
                  )}
                  <div className="statement">{statements.keys[1]}</div>
                  {statements.keys[1] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(statements, 1) + "%" }}
                    ></div>
                  )}
                  <div className="statement">{statements.keys[2]}</div>
                  {statements.keys[2] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(statements, 2) + "%" }}
                    ></div>
                  )}
                  <div className="statement">{statements.keys[3]}</div>
                  {statements.keys[3] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(statements, 3) + "%" }}
                    ></div>
                  )}
                  <div className="statement">{statements.keys[4]}</div>
                  {statements.keys[4] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(statements, 4) + "%" }}
                    ></div>
                  )}
                </div>
              )}
              {!suggestions && (
                <div className="score-wrap no-data">No Data</div>
              )}
            </div>
          </div>
          <div className="two">
            <div className="sugg-others">
              <h1 className="sub-head">Top Suggestions By Others</h1>
              {suggestions && (
                <div className="score-wrap" style={{ color: "black" }}>
                  <div className="statement">{suggestions.keys[0]}</div>
                  {suggestions.keys[0] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(suggestions, 0) + "%" }}
                    ></div>
                  )}
                  <div className="statement">{suggestions.keys[1]}</div>
                  {suggestions.keys[1] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(suggestions, 1) + "%" }}
                    ></div>
                  )}
                  <div className="statement">{suggestions.keys[2]}</div>
                  {suggestions.keys[2] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(suggestions, 2) + "%" }}
                    ></div>
                  )}
                  <div className="statement">{suggestions.keys[3]}</div>
                  {suggestions.keys[3] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(suggestions, 3) + "%" }}
                    ></div>
                  )}
                  <div className="statement">{suggestions.keys[4]}</div>
                  {suggestions.keys[4] && (
                    <div
                      className="qn-status"
                      style={{ width: getwidth(suggestions, 4) + "%" }}
                    ></div>
                  )}
                </div>
              )}
              {!suggestions && (
                <div className="score-wrap no-data">No Data</div>
              )}
            </div>

            <div className="sugg-self">
              <h1 className="sub-head">Top Suggestions By Self</h1>

              {suggestions_s && (
                <div className="score-wrap" style={{ color: "black" }}>
                  {suggestions_s[0] && (
                    <div className="self">{suggestions_s[0]}</div>
                  )}
                  {suggestions_s[1] && (
                    <div className="self">{suggestions_s[1]}</div>
                  )}
                  {suggestions_s[2] && (
                    <div className="self">{suggestions_s[2]}</div>
                  )}
                </div>
              )}
              {!(
                props.dataset[chosen] &&
                props.dataset[chosen]["suggestions(self)"]
              ) && <div className="score-wrap no-data">No Data</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
