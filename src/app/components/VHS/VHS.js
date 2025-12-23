'use client';
import Image from "next/image";
import './vhs.css';
import { useState, useEffect } from "react";

function getHeight(){
  return window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
}

export default function VHS() {
    const [linesDrawn, setLinesDrawn] = useState(false);

    function drawLines() {
        const lines = document.getElementsByClassName('line');
        if(lines.length) {
            for (let i = 0; i < lines.length; i++) {
                document.body.removeChild(lines[i]);
            }
        }

        let distanceBetweenLines = 60;

        for(let i = 0; i < getHeight()/distanceBetweenLines * 10; i++){
            const line = document.createElement("div");  
            line.className = `line line-${i}`;
            line.style.top = `${i * distanceBetweenLines}px`;
            const time = Math.random() * 5;
            line.style.animation = `lines ${time}s infinite`;
            document.querySelector('.lines-container').appendChild(line) ;
        }
        setLinesDrawn(true);
    }

    useEffect(() => {
        if (!linesDrawn) {
            drawLines();
        }
    }, []);

    return (
        <>
            <div id='root'>
                <div data-text='Dali Atomicus' id='text'>
                    Dali Atomicus
                </div>
                <div className="lines-container"></div>
            </div>
        </>
    );
}
