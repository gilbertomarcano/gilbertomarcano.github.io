class Dropdown {
    constructor(id) {
        // Get the id and get the div
        this.id = id
        this.select = document.getElementById(id)
        this.div = this.select.parentElement
        this.div.setAttribute('id', 'available-subjects-div')
        this.ul = this.div.getElementsByTagName('ul')[0]
        this.span = this.div.getElementsByTagName('span')[0]
}

    load(subjects = new Array()) {
        if (subjects[0]) {
            subjects.forEach(subject => {
                const code = subject.code
                const name = subject.name
                this.appendToUl('(' + code + ') ' + name)
            })
        }
    }

    /**
     * Append a value at the end of the list
     * @param {String} value - the string to be appended
     */
    appendToUl(value) {
        // Get and create the elements
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.textContent = value
        // Append the elements to their parents
        li.appendChild(a)
        this.ul.appendChild(li)
    }

    getId() {
        return this.id
    }

    getValue() {
        return this.span.textContent
    }

    getSelectedIndex() {
        return this.select.getAttribute('selected')
    }
}