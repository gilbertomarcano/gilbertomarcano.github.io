/**
 * Handle the clicks of the app
 */
document.addEventListener('click', function (e) {
    // Click over the available subjects dropdown
    if (e.target.parentNode.parentNode.parentNode === document.getElementById('available-subjects-div')) {

        const div = e.target.parentNode.parentNode.parentNode
        const ul = e.target.parentNode.parentNode
        const li = e.target.parentNode
        const active = li.classList.contains('active')

        const value = e.target.textContent
        const span = document.getElementById('choice')


        for (let i = 0, len = ul.children.length; i < len; i++) {
            if (ul.children[i].classList.contains('active')) {
                ul.children[i].classList.remove('active')
                break
            }
        }

        let selected
        if (!active) {
            li.classList.add('active')
            for (let i = 0, len = ul.children.length; i < len; i++) {
                if(ul.children[i].firstChild.textContent === value) {
                    selected = i
                    break
                }   
            }
        } else {
            selected = '-1'
        }

        div.classList.remove('open')

        if (selected === '-1') {
            span.textContent = 'Please choose'
            div.getElementsByTagName('select')[0].setAttribute('selected', -1)
            
        } else {
            span.textContent = value
            div.getElementsByTagName('select')[0].setAttribute('selected', selected)
        }
    }

    // Select a subject in the list of selected subjects
    else if (e.target.parentNode.parentNode.parentNode === document.getElementById('selected-subjects')) {
        // Get the ul
        const ul = document.getElementById('selected-subjects').getElementsByTagName('ul')[0]

        if (e.target.textContent === '-') {
            return
        }
        // Iterate over the li of the ul
        for (let i = 0, list = ul.children; i < list.length; i++) {
            const li = list[i]
                
            if (li.textContent === e.target.textContent) {
                // If it's already active
                if (li.className === 'active') {
                    li.classList.remove('active')
                    ul.setAttribute('selected', -1)
                } else if (li.className === '') {
                    li.classList.add('active')
                    ul.setAttribute('selected', i)
                }
            } else if (li.className === 'active') {
                li.classList.remove('active')
            }
        }
    }
})