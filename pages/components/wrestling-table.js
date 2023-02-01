export default function WrestlingTable({currentWrestling}){
    return (
        <div>
        <table className="table table-compact w-full">
            <thead>
            <tr>
                <th></th>
                <th>Promotion</th>
                <th>Title</th>
                <th>Presentation Style</th>
                <th>Media Format</th>
            </tr>
            </thead>
            <tbody>
            {currentWrestling.map((film) => (
                <tr key={film.id}>
                <th></th>
                <th>{film.promotion}</th>
                <td>{film.title}</td>
                <td>{film.presentation}</td>
                <td>{film.format}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}