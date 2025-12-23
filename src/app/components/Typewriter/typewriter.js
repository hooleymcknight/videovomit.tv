import './typewriter.css';

export default function Typewriter(data) {

    return (
        <>
            {/* <div className="typewriter">
                <h1>{data.text}</h1>
            </div> */}
            <p className="line-1 anim-typewriter">{data.text}</p>
        </>
    );
}
