import React, {Component} from "react"
import Navbar from "./Navbar"
import Home from "./MianPages/Home"
import Addqn from "./MianPages/Addqn"
import fire from "./fire"
import Login from "./Login"
import Reset from "./MianPages/Reset"
import Noresults from "./MianPages/Noresults"


class App extends Component {
    constructor(){
        super()

        this.state = {
            navStatus: [0,1,1],
            page: "home",
            questions: null,
            user:null,
            dataset: null,
            teammembers: null,
            qualities: [],
            suggestions: [],
            admin: null,
            error: "",
            done:null
        }
    }
    getQuestions = () => {
        var questionsRef = fire.database().ref('/questions/')
        return questionsRef.once('value', snapshot => {
            if (snapshot.val() != null){
                let x = Object.values(snapshot.val())
                this.setState({questions: x})
                }
            })
    }

    getAnswers = () => {
        var answersRef = fire.database().ref('/answers/')
        answersRef.orderByValue().once('value', snapshot => {
            if (!snapshot.val()) {this.setState({dataset:[-1]})}
            else {this.setState({dataset:snapshot.val()})}
        })
    }

    addQn = (obj) => {
        var newPostKey = fire.database().ref().child('questions').push().key;
        var updates = {};
        updates['/questions/' + newPostKey] = obj;
        fire.database().ref().update(updates);
    }
    deleteAnswers = () => {
        var answersRef = fire.database().ref('/')
        return answersRef.once('value', snapshot => {
            fire.database().ref().update({answers:null, done:null});
           });
    }
    resetDoneSugg = (props) =>{
        var questionsRef = fire.database().ref('/team/')
        return questionsRef.once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                var childKey = childSnapshot.key;
                let answer = {done: ""}
                fire.database().ref().child('team').child(childKey).update(answer);
          });
    })}
    doneall = () =>{
        var questionsRef = fire.database().ref('/done/')
        return questionsRef.once('value', snapshot => {
            let answer
            if (snapshot.val() === null) {
                answer = {done: this.state.user.email}
            }
            else {answer = {done: snapshot.val() + " " + this.state.user.email}}
            fire.database().ref().update(answer);
          });
    }
    
    addTeam = (obj) => {
        var newPostKey = fire.database().ref().child('team').push().key;
        var updates = {};
        updates['/team/' + newPostKey] = obj;
        fire.database().ref().update(updates);
        fire.auth().createUserWithEmailAndPassword(obj.email, "HappyGiving").then((u)=>{
              }).then({})
        
    }
    
    authListener() {
        fire.auth().onAuthStateChanged((user)=>{
            if(user && this.state.user=== null) {
                this.setState({ user });
            } else {
                this.setState({user: null});
            }
        })
    }
    logout = () => {
        this.setState({navStatus: [0,1,1],
            page: "home"})
        fire.auth().signOut();
    }

    get = () => {
        var qualitiesRef = fire.database().ref('/')
        qualitiesRef.once('value', snapshot => {
            this.setState({qualities: snapshot.val().qualities,
                            suggestions: snapshot.val().suggestions,
                            teammembers: Object.values(snapshot.val().team),
                            admin: snapshot.val().admin,
                            done: snapshot.val().done ? snapshot.val().done : []})
        })
    }

    componentDidMount() {
        this.authListener()
        this.getAnswers()
        this.get()
        this.getQuestions()
    }
    
    mainClick = (event) => {
        
        let status
        let {name} =event.target
        if (name === "addqn") {
            status= [1,1,0]} 
        if (name === "reset") {
            status = [1,0,1]}
        if (name === "home") {
            this.setState({dataset: null})
            this.getAnswers()
            status = [0,1,1]}
        if (name === "resetcfm") {
            this.deleteAnswers()
            this.resetDoneSugg()
            this.setState({dataset: [-1], done: null})
            status = [0,1,1]
            name = "home"
        }
        this.setState({navStatus: status, page: name})
    }
    render() {
        return(
            <div>
                {this.state.user ? (<div>
                    {this.state.teammembers && <Navbar 
                        mainClick={this.mainClick.bind(this)}
                        status={this.state.navStatus}
                        logout={this.logout}
                        user = {this.state.user}
                        teammembers = {this.state.teammembers}
                    />}
                   
                    {this.state.page === "home" && this.state.dataset && this.state.dataset[0] === -1 && <Noresults />}
                    {this.state.page === "reset" && <Reset mainClick={this.mainClick}/>}
                    {this.state.page === "addqn" && this.state.qualities.length > 0 && <Addqn addQn={this.addQn} addTeam={this.addTeam} qualities={this.state.qualities} />}
                    {this.state.page === "home" && this.state.dataset && this.state.dataset[0] !== -1 && this.state.teammembers && this.state.done && this.state.suggestions &&
                        <Home 
                            teammembers = {this.state.teammembers} 
                            dataset = {this.state.dataset} 
                            done= {this.state.done} 
                            suggestions = {this.state.suggestions} 
                        />}
                    </div>) : (this.state.admin && <Login admin = {this.state.admin}/>)}
            </div>
        )
    }
}





export default App