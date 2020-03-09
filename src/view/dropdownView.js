class Dropdown {
    /**
     * Construct a dropdown element
     * @param {String} id 
     */
    constructor(id) {
        // Get the id and get the div
        this.id = id
        this.select = document.getElementById(id)
        this.div = this.select.parentElement
        this.div.setAttribute('id', 'available-subjects-div')
        this.ul = this.div.getElementsByTagName('ul')[0]
        this.span = this.div.getElementsByTagName('span')[0]
    }

    /**
     * load the ul of the element with the subject's codes and names
     * @param {Array} subjects - the list of subjects to be loaded
     */
    loadUl(subjects) {
        if (subjects.length === 0) return false

        subjects.forEach(subject => {
            const code = subject.code
            const name = subject.name
            this.appendToUl('(' + code + ') ' + name)
        })

        return true
    }

    /**
     * Append a value at the end of the list
     * @param {String} value - the string to be appended
     */
    appendToUl(value) {
        // Create the elements to be appended
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.textContent = value
        // Append the elements to their parents
        li.appendChild(a)
        this.ul.appendChild(li)
    }

    /**
     * Return the selected attribute of the dropdown's select element
     */
    getSelectedIndex() {
        return this.select.getAttribute('selected')
    }
}