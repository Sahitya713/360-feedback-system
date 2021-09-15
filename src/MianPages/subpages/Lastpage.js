import React,{useState} from "react"

function Lastpage(props) {
    const [chosen, setChosen] = useState([])
    const [disclaimer, setDisclaimer] = useState("Please Choose 1-3 Options")

    const suggestions = props.data.suggestions
    const qn = "Finally, please select 1-3 things you want to improve yourself."
    let x;
    let name;
    for (x = 0; x<props.teammembers.length ; x++){
        if (props.teammembers[x].email === props.user.email) {
            name = props.teammembers[x].name
            break;}
        
    }
    const buttons_s = suggestions.map((suggestion, i) => 
        <button className="options" key={i} id={suggestion} name={suggestion} style= {{background: chosen.includes("suggestion-"+i) && "#F6511d"}}
            onClick={()=>{
                let x = chosen.slice()
                let index = x.indexOf("suggestion-"+i)
                if (index > -1) {
                    x.splice(index,1)
                    if (x.length === 0) {setDisclaimer("Please Choose 1-3 Options")}
                    else {setDisclaimer("")}
                } else if (x.length<3){
                    x.push("suggestion-"+i);
                    if (x.length>0 && x.length<=3) {setDisclaimer("")} else {setDisclaimer("Please Choose 1-3 Options")}
                } else {setDisclaimer("You can only choose up to 3 Options")}
                
                setChosen(x)
            }
            }>{suggestion}</button>)
    return(
        <div>
            <div className="qn-status-wrap">
                <div className="qn-status"></div>
                <span className="status">Question {props.totalmembers*4-3} of {props.totalmembers*4 -3}</span>
            </div>
            <h1 className = "qn">{qn}</h1> 
            <div className = "options-wrap">
                {buttons_s}
            </div>
            <div className = "block">block</div>
            <div className = "opacity">
                <button className="next" style = {{opacity: chosen.length === 0 && 0.5}} disabled = {chosen.length === 0 && true} onClick={()=>{
                    props.addSuggSelf({name:name, suggestions:chosen})
                    props.doneall()
                    props.proceed()
                    }
                }>done</button>
                <div className = "len-disclaimer" style= {{color: "red"}}>{disclaimer}</div>
             </div>
        </div>
       
    )
}

export default Lastpage