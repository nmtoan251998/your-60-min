//pomodoro
document.addEventListener("DOMContentLoaded", () => {
    const addWorkBtn = document.querySelector("#addWorkButton");
    const minusWorkBtn = document.querySelector("#minusWorkButton");    
    let workDisplay = document.querySelector("#work-display");
    let workCount = parseInt(workDisplay.textContent);

    const addBreakBtn = document.querySelector("#addBreakButton");
    const minusBreakBtn = document.querySelector("#minusBreakButton");
    let breakDisplay = document.querySelector("#break-display");
    let breakCount = parseInt(breakDisplay.textContent);

    const startBtn = document.querySelector("#start");
    const pauseBtn = document.querySelector("#pause");
    const resumeBtn = document.querySelector("#resume");
    const resetBtn = document.querySelector("#reset");

    let showTime = document.querySelector("#showtime");

    const intervalDelay = 100;
    let timingFunc, 
    minutes, 
    seconds;    
    
    addWorkBtn.addEventListener("click", () => workDisplay.innerHTML = ++workCount)
    minusWorkBtn.addEventListener("click", () => workDisplay.innerHTML = (workCount === 0) ? 0 : --workCount)
    addBreakBtn.addEventListener("click", () => breakDisplay.innerHTML = ++breakCount)
    minusBreakBtn.addEventListener("click", () => breakDisplay.innerHTML = (breakCount === 0) ? 0 : --breakCount)
    
    const showTimeFunc = () => {            
        showTime.textContent = minutes +' : ' + --seconds;
                
        if(minutes === 0 && seconds === 0){            
            showTime.innerHTML = 0; // set time to 0 when timer is over            
            clearInterval(timingFunc);                                                   
            setTimeout(() => alert("Your time is over!"), 500)
        } else if(seconds === 0) {
            showTime.innerHTML = --minutes;
            seconds = 60; // reset second to initial state             
        }                               
    }

    startBtn.addEventListener("click", () => {              
        minutes = parseInt(workDisplay.textContent);
        seconds = 60;
        clearInterval(timingFunc);

        if(parseInt(workDisplay.textContent) === 0){
            alert("Please set your expected time by clicking the buttons!");
            return;
        }
        
        showTime.innerHTML = minutes--; // display initial state, then decrease it by 1 unit
        setTimeout(() => timingFunc = setInterval(showTimeFunc, intervalDelay), 0) // render          
    })

    pauseBtn.addEventListener("click", () => clearInterval(timingFunc))

    resumeBtn.addEventListener("click", () => {                
        (timingFunc === undefined) 
        ? clearInterval(timingFunc) 
        : setTimeout(() => timingFunc = setInterval(showTimeFunc, intervalDelay), 0) // re-render
    })

    resetBtn.addEventListener("click", () => {
        minutes = 0;
        seconds = 0;
        clearInterval(timingFunc);
        showTime.innerHTML = 0;
    })
    
}, true)