export default function Log({turns})
{
    return(
    <ol id="log">
        {turns.map((turn) => ( 
            <li key={`${turn.location.column + turn.location.row * 3}`}>{turn.player} Selected slot {turn.location.column + turn.location.row * 3}</li>
        ))}

    </ol>
    );
}