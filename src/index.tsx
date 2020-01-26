document.getElementById("editor").appendChild(
    <g transform="translate(200, 100) scale(5)">
            <path d="M 0 0 
                 l 10 10 
                 v -5 
                 a 5 5 90 0 1 5 -5
                 h 40
                 a 5 5 180 0 1 0 10 
                 h -40 
                 a 5 5 90 0 0 -5 5
                 v 6 
                 l -10 -10
                 z" fill="black" />

            <text x="13" y="6.5" style="font-size: 5px; fill: white">
                콘솔에 (b) 찍기
            </text>
    </g>
);