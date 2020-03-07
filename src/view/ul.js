class Ul {
    constructor(id) {
        // Get the id and the get the div
        this.id = id
        this.div = document.getElementById(id)

        // Create a ul element and set its attributes
        this.ul = document.createElement('ul')
        this.ul.setAttribute('selected', -1)

        // Append the ul to the div 
        this.div.appendChild(this.ul)

        // Add the classes
        this.div.classList.add('selectMydropdown')
        this.div.classList.add('filled')
    }

    append(value) {
        // Get and create the elements
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.textContent = value
        // Append the elements to their parents
        li.appendChild(a)
        this.ul.appendChild(li)
    }

    delete(index) {
        this.ul.removeChild(this.ul.childNodes[index])
        this.ul.setAttribute('selected', -1)
    }

    inList(value) {
        // Get the elements
        for (let i = 0, list = this.ul.children; i < list.length; i++) {
            if (list[i].firstChild.textContent === value) {
                return true
            }
        }
        return false
    }

    getId() {
        return this.id
    }

    getSelected() {
        return this.ul.getAttribute('selected')
    }
    
    
}


