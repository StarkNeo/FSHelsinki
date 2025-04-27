const Total = ({ parts }) => {
    console.log(parts);
    let total = parts.reduce((s, p) => s + p.exercises, 0)
    console.log(total)
    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total