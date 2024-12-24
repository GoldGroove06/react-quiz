function FinishScreen({points, maxPossiblePoints, highscore, dispatch}) {
    const percentage = (points/maxPossiblePoints) *100
    return (<>
        <p className="result">
            You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
            
            </p>

            <strong >(Highscore: {highscore} points) </strong>
            <br></br>
      
     <button className="btn btn-ui" onClick={() => dispatch({type:"restart"})}>
                Restart quiz
        </button>
            
       
       </> 
    )
}

export default FinishScreen;