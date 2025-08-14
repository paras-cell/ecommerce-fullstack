import "./input.css"
const input =({value,title, handlechange})=>{
    return(
        <label className="btlabel">
            <input onChange={handlechange}  className="radiobt" type="checkbox" value={value} /> 
            {title}
        </label>
    )
}
export default input;