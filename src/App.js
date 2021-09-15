import React, { Component } from "react";
import Navbar from "./Navbar";
import Startgame from "./MianPages/Startgame";
import fire from "./fire";
import Login from "./Login";
import Endgame from "./MianPages/subpages/Endgame";

class App extends Component {
  constructor() {
    super();

    this.state = {
      totalQns1: null,
      totalQns2: null,
      questions: null,
      user: null,
      answers: [],
      options: null,
      suggestions: [],
      teammembers: null,
      doneall: null,
    };
  }
  // firebase functions
  getQuestions = () => {
    var questionsRef = fire.database().ref("/questions/");
    return questionsRef.once("value", (snapshot) => {
      if (snapshot.val() != null) {
        let x = Object.values(snapshot.val());
        this.setState({ totalQns1: x.slice().length });
        this.setState({ questions: x });
      }
    });
  };

  getTeam = () => {
    var teamRef = fire.database().ref("/team/");
    return teamRef.once("value", (snapshot) => {
      if (snapshot.val() != null) {
        let x = Object.values(snapshot.val());
        this.setState({ totalQns2: x.slice().length, teammembers: x.slice() });
        let y = [];
        if (this.state.user) {
          for (var i = 0; i < x.length; i++) {
            if (
              x[i].done.includes(this.state.user.email) ||
              x[i].email === this.state.user.email
            )
              y.push(i);
          }
          for (var j = y.length - 1; j > -1; j--) {
            x.splice(y[j], 1);
          }
          this.setState({ options: x });
        }
      }
    });
  };
  getSuggestions = () => {
    var optionsRef = fire.database().ref("/");
    optionsRef.once("value", (snapshot) => {
      this.setState({
        suggestions: snapshot.val().suggestions,
        doneall: snapshot.val().done,
      });
    });
  };

  //   updatedone = (props) => {
  //     var questionsRef = fire.database().ref("/questions/");
  //     return questionsRef
  //       .orderByChild("question")
  //       .equalTo(props.question)
  //       .once("value", (snapshot) => {
  //         snapshot.forEach((childSnapshot) => {
  //           var childKey = childSnapshot.key;
  //           let answer = {
  //             done: childSnapshot.val().done + " " + this.state.user.email,
  //           };
  //           fire
  //             .database()
  //             .ref()
  //             .child("questions")
  //             .child(childKey)
  //             .update(answer);
  //         });
  //       });
  //   };
  // updatedone_sugg = (props) => {
  //   var questionsRef = fire.database().ref("/team/");
  //   return questionsRef
  //     .orderByChild("name")
  //     .equalTo(props.name)
  //     .once("value", (snapshot) => {
  //       snapshot.forEach((childSnapshot) => {
  //         var childKey = childSnapshot.key;
  //         let answer = {
  //           done: childSnapshot.val().done + " " + this.state.user.email,
  //         };
  //         fire.database().ref().child("team").child(childKey).update(answer);
  //       });
  //     });
  // };
  updatedone_sugg = (props) => {};
  doneall = () => {};
  updatedone = (props) => {};

  //   doneall = () => {
  //     var questionsRef = fire.database().ref("/done/");
  //     return questionsRef.once("value", (snapshot) => {
  //       let answer;
  //       if (snapshot.val() === null) {
  //         answer = { done: this.state.user.email };
  //       } else {
  //         answer = { done: snapshot.val() + " " + this.state.user.email };
  //       }
  //       fire.database().ref().update(answer);
  //     });
  //   };
  addAns = (props) => {
    var answersRef = fire
      .database()
      .ref("/answers/" + props.player + "/traits/");
    return answersRef.once("value", (snapshot) => {
      let answer = {};
      let temp = {};
      for (var i = 0; i < props.questions.length; i++) {
        let quality = props.questions[i].quality;
        let qualitylvl = props.questions[i].qualitylvl;
        let quality2 = props.questions[i].quality2;
        let qualitylvl2 = props.questions[i].qualitylvl2;
        let quality3 = props.questions[i].quality3;
        let qualitylvl3 = props.questions[i].qualitylvl3;
        if (temp[quality]) {
          temp[quality] = temp[quality] + parseInt(qualitylvl, 10);
        } else {
          temp[quality] = parseInt(qualitylvl, 10);
        }
        if (quality2 !== "--please choose--") {
          if (temp[quality2]) {
            temp[quality2] = temp[quality2] + parseInt(qualitylvl2, 10);
          } else {
            temp[quality2] = parseInt(qualitylvl2, 10);
          }
        }
        if (quality3 !== "--please choose--") {
          if (temp[quality3]) {
            temp[quality3] = temp[quality3] + parseInt(qualitylvl3, 10);
          } else {
            temp[quality3] = parseInt(qualitylvl3, 10);
          }
        }
      }
      let temp_keys;
      temp_keys = Object.keys(temp);
      for (var a = 0; a < temp_keys.length; a++) {
        if (snapshot.val() === null) {
          answer[temp_keys[a]] = temp[temp_keys[a]];
        } else {
          if (snapshot.val()[temp_keys[a]] !== undefined) {
            answer[temp_keys[a]] =
              temp[temp_keys[a]] + parseInt(snapshot.val()[temp_keys[a]], 10);
          } else {
            answer[temp_keys[a]] = temp[temp_keys[a]];
          }
        }
      }
      fire
        .database()
        .ref()
        .child("answers")
        .child(props.player)
        .child("traits")
        .update(answer);
    });
  };
  addQns = (props) => {
    var qns = fire.database().ref("/answers/" + props.player + "/qns/");
    return qns.once("value", (snapshot) => {
      let temp = [];
      if (snapshot.val()) {
        temp = snapshot.val().slice();
      }
      for (var i = 0; i < props.questions.length; i++) {
        temp.push(props.questions[i].question);
      }
      let answer = { qns: temp };
      fire.database().ref().child("answers").child(props.player).update(answer);
    });
  };
  addSuggSelf = (props) => {
    var SuggSelfRef = fire.database().ref("/answers/" + props.name + "/");
    return SuggSelfRef.once("value", (snapshot) => {
      // let temp = []
      // for (var i = 0; i< props.questions.length; i++){
      //     temp.push(props.questions[i].question)
      // }
      let answer = { "suggestions(self)": props.suggestions };
      fire.database().ref().child("answers").child(props.name).update(answer);
    });
  };
  addSuggOthers = (props) => {
    var answersRef = fire
      .database()
      .ref("/answers/" + props.name + "/suggestions/");
    return answersRef.once("value", (snapshot) => {
      let answer = {};
      for (let i = 0; i < props.suggestions.length; i++) {
        if (snapshot.val() === null) {
          answer[props.suggestions[i]] = 1;
        } else {
          if (snapshot.val()[props.suggestions[i]] === undefined) {
            answer[props.suggestions[i]] = 1;
          } else {
            answer[props.suggestions[i]] =
              1 + parseInt(snapshot.val()[props.suggestions[i]], 10);
          }
        }
      }
      fire
        .database()
        .ref()
        .child("answers")
        .child(props.name)
        .child("suggestions")
        .update(answer);
    });
  };

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  logout = () => {
    this.setState({
      questions: null,
      options: null,
      suggestions: [],
      totalQns1: null,
      totalQns2: null,
    });
    fire.auth().signOut();
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.user !== prevState.user) {
      this.getQuestions();
      this.getTeam();
      this.getSuggestions();
    }
  }

  componentDidMount() {
    this.authListener();
    this.getQuestions();
    this.getTeam();
    this.getSuggestions();
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          <div>
            {this.state.teammembers && (
              <Navbar
                logout={this.logout}
                user={this.state.user}
                teammembers={this.state.teammembers}
              />
            )}
            {this.state.doneall &&
            this.state.doneall.includes(this.state.user.email) ? (
              <Endgame />
            ) : (
              this.state.teammembers &&
              this.state.totalQns1 &&
              this.state.totalQns2 &&
              this.state.questions &&
              this.state.options &&
              this.state.options.length + this.state.questions.length > 0 &&
              this.state.suggestions.length > 0 && (
                <Startgame
                  // questions={this.state.questions}
                  addAns={this.addAns}
                  addQns={this.addQns}
                  addSuggSelf={this.addSuggSelf}
                  addSuggOthers={this.addSuggOthers}
                  updatedone={this.updatedone}
                  updatedone_sugg={this.updatedone_sugg}
                  doneall={this.doneall}
                  data={this.state}
                />
              )
            )}
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
