export default function DataSwitch({ setShowedData }) {
    return (
        <div className="dataswitch">
            <button className="dataswitch__button" onClick={() => setShowedData({dataType: "cases", circleColor: "#FF331F"})}>Cases</button>
            <button className="dataswitch__button" onClick={() => setShowedData({dataType: "recovered", circleColor: "#06D6A0"})}>Recovered</button>
            <button className="dataswitch__button" onClick={() => setShowedData({dataType: "deaths", circleColor: "#FFFFFA"})}>Deaths</button>
        </div>
    )
}