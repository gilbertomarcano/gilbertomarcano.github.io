function firstButton() {
    if(!isAnimating) {
        changeWidth()
    }
}

function secondButton() {
    if(!isAnimating) {
        let buttons = document.querySelector('#buttons')

        let b1 = buttons.children[0]
        let b2 = buttons.children[1]

        let prevScheduleButton = buttons.children[2]
        let nextScheduleButton = buttons.children[3]

        b1.style.display = 'none'
        b2.style.display = 'none'

        prevScheduleButton.style.display = 'inline'
        nextScheduleButton.style.display = 'inline'

        app.buttonGenerateSchedules()

    }
}



function changeWidth() {
    let buttons = document.querySelector('#buttons')

    let b1 = buttons.children[0]
    let b2 = buttons.children[1]

    if (!b1.classList.contains('back-button')) {
        b1.classList.add('back-button')
        b1.classList.add('color-2')

        b1.textContent = 'ATRÁS'

        setTimeout(() => {b2.style.display = 'inline';}, 110);
        setTimeout(() => {b2.classList.remove('back-button');}, 160);
    } else {
        b1.classList.remove('back-button')
        b1.classList.remove('color-2')
        b1.textContent = 'SIGUIENTE'

        b2.classList.add('back-button')
        setTimeout(() => {  b2.style.display = 'none'; }, 290);
        
    }
}