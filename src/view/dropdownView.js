
class listView {
    constructor(id) {
        // Get the id and the get the div
        this.id = id
        this.div = document.getElementById(id)

        // Create a ul element and set its attributes
        this.ul = document.createElement('ul')
        this.ul.setAttribute('id', this.id + '-ul')
        this.ul.setAttribute('selected', -1)

        // Append the ul to the div 
        this.div.appendChild(this.ul)

        // Add the classes
        this.div.classList.add('selectMydropdown')
        this.div.classList.add('filled')

    }

    append(value) {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.textContent = value
        li.appendChild(a)
        this.ul.appendChild(li)
    }

    getId() {
        return this.id
    }

    getIdUl() {
        return this.id + '-ul'
    }
    
    
}


document.addEventListener('click', function (e) {
    if (e.target.parentNode.parentNode.id == 'selected-subjects-ul') {
        const ul = document.getElementById('selected-subjects-ul')
        for (let i = 0; i < ul.children.length; i++) {
            const li = ul.children[i]
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