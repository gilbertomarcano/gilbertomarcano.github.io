document.addEventListener('click', function (e) {
    if (e.target.parentNode.parentNode.parentNode === document.getElementById('available-subjects-div')) {
        const div = document.getElementById('available-subjects-div')
        const value = div.getElementsByTagName('span')[0].textContent
        if (value === 'Please choose') {
            div.getElementsByTagName('select')[0].setAttribute('selected', -1)
            return
        }

        const ul = div.getElementsByTagName('ul')[0]
        for (let i = 0, len = ul.children.length; i < len; i++) {
            if (ul.children[i].firstChild.textContent === value) {
                div.getElementsByTagName('select')[0].setAttribute('selected', i)
                return
            }
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