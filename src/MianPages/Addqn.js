import React, {Component} from "react"

class Addqn extends Component {
    state = {
        question: "Please Enter a description",
        quality: "--please choose--",
        qualitylvl: "1",
        quality2: "--please choose--",
        qualitylvl2: "1",
        quality3: "--please choose--",
        qualitylvl3: "1",
        name: "name",
        email: "email"
    }
    handleChange = event => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.addQn({
            question: this.state.question,
            quality: this.state.quality,
            qualitylvl: this.state.qualitylvl,
            quality2: this.state.quality2,
            qualitylvl2: this.state.qualitylvl2,
            quality3: this.state.quality3,
            qualitylvl3: this.state.qualitylvl3});
        this.setState({
            question: "Please Enter a description",
            quality: "--please choose--",
            qualitylvl: "1",
            quality2: "--please choose--",
            qualitylvl2: "1",
            quality3: "--please choose--",
            qualitylvl3: "1"
        })
    }
    handleSubmit_2 = event => {
        event.preventDefault()
        this.props.addTeam({
            done: "",
            name: this.state.name,
            email: this.state.email
        })
        this.setState({
            name: "name",
            email: "email"
        })
    }
    
    render() {
        const qualitylvls = [1,2,3]
        const qualities = this.props.qualities
        // for (var i = 0; i< qualities.length; i++) {
        //     if (qualities[i].includes("(-)")) { 
        //         qualities[i] = qualities[i].substring(3)}
        // }
        return(
            <div> 
                <div className= "end" style = {{paddingTop: "100px", paddingBottom: "50px", color: "#00b4eb"}}>Add Descripton</div>
            <form onSubmit={this.handleSubmit}>
                <input className="qnInput" type="text" value={this.state.question} name="question" onChange={this.handleChange}/>
                <div className ="traits_e">Add at least 1 trait associated with the description and its weight. <br/>These will be used to calculate trait scores for the team members.</div>
                <div className = "traits_a">
                    <label className = "trait_l" style={{color: "#fff"}}>Trait:</label>
                    <select 
                        className = "trait"
                        value={this.state.quality}
                        onChange={this.handleChange}
                        name="quality"
                    >
                        {qualities.map(choice => <option key={choice} value={choice}>{choice.includes("(-)") ? choice.substring(3) : choice}</option>)}
                    </select>
                    <select 
                        className = "trait2"
                        value={this.state.quality2}
                        onChange={this.handleChange}
                        name="quality2"
                    >
                        {qualities.map(choice => <option key={choice} value={choice}>{choice.includes("(-)") ? choice.substring(3) : choice}</option>)}
                    </select>
                    <select 
                        className = "trait3"
                        value={this.state.quality3}
                        onChange={this.handleChange}
                        name="quality3"
                    >
                        {qualities.map(choice => <option key={choice} value={choice}>{choice.includes("(-)") ? choice.substring(3) : choice}</option>)}
                    </select>
                </div>
                
                <div className= "traitlvls">
                    <label className="traitlvl_l">Trait Level:</label>
                    <select 
                        className="traitlvl"
                        value={this.state.qualitylvl}
                        onChange={this.handleChange}
                        name="qualitylvl"
                        
                    >
                        {qualitylvls.map(choicelvl => <option key={choicelvl} value={choicelvl}>{choicelvl}</option>)}
                    </select>
                    <select 
                        className="traitlvl2"
                        value={this.state.qualitylvl2}
                        onChange={this.handleChange}
                        name="qualitylvl2"
                        
                    >
                        {qualitylvls.map(choicelvl => <option key={choicelvl} value={choicelvl}>{choicelvl}</option>)}
                    </select>
                    <select 
                        className="traitlvl3"
                        value={this.state.qualitylvl3}
                        onChange={this.handleChange}
                        name="qualitylvl3"
                        
                    >
                        {qualitylvls.map(choicelvl => <option key={choicelvl} value={choicelvl}>{choicelvl}</option>)}
                    </select>
                </div>
                <div className = "submit-wrapper">
                    <button className="submit" style={{visibility : (this.state.question === "Please Enter a question" || this.state.quality === "--please choose--") && "hidden"}}>Submit</button>
                </div>
            </form>
            <div className= "end" style = {{paddingTop: "100px", paddingBottom: "50px", color: "#00b4eb"}}>Add Team Member</div>
            <form onSubmit={this.handleSubmit_2}>
                <div className = "traits_a">
                    <label className = "trait_l" style={{color: "#fff"}}>Name:</label>
                    <input className="trait" type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
                </div>
                
                <div className= "traitlvls">
                    <label className="traitlvl_l">Email:</label>
                    <input className="trait" type="text" value={this.state.email} name="email" onChange={this.handleChange}/>
                </div>
                <div className = "submit-wrapper">
                    <button className="submit" style={{visibility : (this.state.name === "name" || this.state.email === "email") && "hidden"}}>Add</button>
                </div>
            </form>
            
            </div>
        )
    }
    
}

export default Addqn

