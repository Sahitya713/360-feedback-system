import React, { Component } from "react";
import Endgame from "./subpages/Endgame";
import Quiz from "./subpages/Quiz";
import Lastpage from "./subpages/Lastpage";

class Startgame extends Component {
  state = {
    qnno: 0,
    membercount: 0,
    options: this.props.data.options,
    questions: this.props.data.questions,
    suggestions: this.props.data.suggestions,
  };

  next = () => {
    this.setState((prevState) => {
      return {
        qnno: prevState.qnno + 1,
      };
    });
  };
  proceed = () => {
    this.setState((prevState) => {
      return {
        membercount: prevState.membercount + 1,
        qnno: 1,
      };
    });
  };
  render() {
    const totalQns = this.props.data.totalQns2 * 4 - 3;
    // const length = this.state.options.length + this.state.questions.length
    const qnlength = this.state.options.length * 4 + 1;
    return (
      <div>
        {this.state.membercount >= 0 &&
          this.state.membercount <= this.state.options.length &&
          this.state.qnno === 0 && (
            <div>
              <p className="quality-board-wrap">Assessment Tips</p>
              <ol className="rules">
                <li>
                  <span>
                    {" "}
                    {qnlength === totalQns
                      ? "This assessment will likely take you 15-20 minutes."
                      : "You have " + qnlength + " question(s) left."}
                  </span>
                </li>
                <li>
                  There will be 4 questions per team member. for the first 3
                  questions, select 1-3 of the listed statements that best
                  describe the team member. For the last question, select 1-3
                  Suggestions you would give to the team member.
                </li>
                <li>
                  Finally, please select 1-3 things you want to improve
                  yourself.
                </li>
              </ol>
              <div className="play-wrapper">
                <button className="play" onClick={this.next}>
                  {qnlength === totalQns ? "BEGIN" : "CONTINUE"}
                </button>
              </div>
            </div>
          )}

        {this.state.membercount >= 0 &&
          this.state.membercount < this.state.options.length &&
          this.state.qnno > 0 && (
            <Quiz
              data={this.state}
              next={this.next}
              proceed={this.proceed}
              totalQns1={this.props.data.totalQns1}
              totalmembers={this.props.data.totalQns2}
              updatedone_sugg={this.props.updatedone_sugg}
              user={this.props.data.user}
              addSuggOthers={this.props.addSuggOthers}
              addAns={this.props.addAns}
              addQns={this.props.addQns}
            />
          )}
        {this.state.membercount === this.state.options.length &&
          this.state.qnno > 0 && (
            <Lastpage
              user={this.props.data.user}
              proceed={this.proceed}
              addSuggSelf={this.props.addSuggSelf}
              doneall={this.props.doneall}
              teammembers={this.props.data.teammembers}
              data={this.state}
              totalmembers={this.props.data.totalQns2}
            />
          )}
        {this.state.membercount > this.state.options.length && <Endgame />}
      </div>
    );
  }
}

export default Startgame;
