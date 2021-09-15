import React, { useState } from "react";

function Quiz(props) {
  const [chosen, setChosen] = useState([]);
  const [disclaimer, setDisclaimer] = useState("Please Choose 1-3 Options");
  const [compiled, setCompiled] = useState([]);

  const suggestions = props.data.suggestions;
  const questions_t = props.data.questions;
  const qnno = props.data.qnno;
  const membercount = props.data.membercount;
  const name = props.data.options[props.data.membercount].name;
  // const email = props.data.options[props.data.membercount].email
  const n = props.totalQns1 / 3;
  let questions;
  if (qnno === 1) {
    questions = questions_t.slice(0, n);
  } else if (qnno === 2) {
    questions = questions_t.slice(n, 2 * n);
  } else if (qnno === 3) {
    questions = questions_t.slice(2 * n, props.totalQns1);
  } else {
    questions = questions_t.slice();
  }
  let qn;
  if (qnno === 4) {
    qn = "Select 1-3 suggestions you would like to give " + name + ".";
  } else {
    qn =
      "Please select 1-3 statements that best describe " +
      name +
      " from the list below.";
  }

  const buttons_q = questions.map((question, i) => (
    <button
      className="options"
      key={i}
      id={i}
      name={i}
      style={{ background: chosen.includes(question) && "#F6511d" }}
      onClick={() => {
        let x = chosen.slice();
        let index = x.indexOf(question);
        if (index > -1) {
          x.splice(index, 1);
          if (x.length === 0) {
            setDisclaimer("Please Choose 1-3 Options");
          } else {
            setDisclaimer("");
          }
        } else if (x.length < 3) {
          x.push(question);
          if (x.length > 0 && x.length <= 3) {
            setDisclaimer("");
          } else {
            setDisclaimer("Please Choose 1-3 Options");
          }
        } else {
          setDisclaimer("You can only choose up to 3 Options");
        }

        setChosen(x);
      }}
    >
      {question.question}
    </button>
  ));
  const buttons_s = suggestions.map((suggestion, i) => (
    <button
      className="options"
      key={i}
      id={suggestion}
      name={suggestion}
      style={{ background: chosen.includes("suggestion-" + i) && "#F6511d" }}
      onClick={() => {
        let x = chosen.slice();
        let index = x.indexOf("suggestion-" + i);
        if (index > -1) {
          x.splice(index, 1);
          if (x.length === 0) {
            setDisclaimer("Please Choose 1-3 Options");
          } else {
            setDisclaimer("");
          }
        } else if (x.length < 3) {
          x.push("suggestion-" + i);
          if (x.length > 0 && x.length <= 3) {
            setDisclaimer("");
          } else {
            setDisclaimer("Please Choose 1-3 Options");
          }
        } else {
          setDisclaimer("You can only choose up to 3 Options");
        }

        setChosen(x);
      }}
    >
      {suggestion}
    </button>
  ));
  const width = (
    (100 / (props.totalmembers * 4 - 3)) *
    (qnno +
      membercount * 4 +
      (props.totalmembers - 1 - props.data.options.length) * 4)
  ).toString();
  return (
    <div>
      <div className="qn-status-wrap">
        <div className="qn-status" style={{ width: width + "%" }}></div>
        <span className="status">
          Question{" "}
          {qnno +
            membercount * 4 +
            (props.totalmembers - 1 - props.data.options.length) * 4}{" "}
          of {props.totalmembers * 4 - 3}
        </span>
      </div>
      <h1 className="qn">{qn}</h1>
      <div className="options-wrap">{qnno === 4 ? buttons_s : buttons_q}</div>
      <div className="block">block</div>
      <div className="opacity">
        <button
          className="next"
          style={{ opacity: chosen.length === 0 && 0.5 }}
          disabled={chosen.length === 0 && true}
          onClick={() => {
            if (qnno === 4) {
              props.addSuggOthers({ name: name, suggestions: chosen });
              props.addAns({ player: name, questions: compiled });
              props.addQns({ player: name, questions: compiled });
              props.updatedone_sugg({ name: name });
              setCompiled([]);
              props.proceed();
            } else {
              let x = compiled.slice();
              for (let a = 0; a < chosen.length; a++) {
                x.push(chosen[a]);
              }
              setCompiled(x);
              props.next();
            }
            setChosen([]);
            setDisclaimer("Please Choose 1-3 Options");
          }}
        >
          next
        </button>
        <div className="len-disclaimer" style={{ color: "red" }}>
          {disclaimer}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
