function Progress({index, numQuestion, points, maxPossiblePoints, answer}) {
    return(
        <header className="progress">
            <progress max={numQuestion} value={index+1 + Number(answer !== null)}></progress>
            <p>Question <strong>{index+1 + Number(answer !== null)}</strong>/ {numQuestion}
            </p>
            <p><strong>{points}/{maxPossiblePoints}</strong></p>
        </header>
    )
}

export default Progress