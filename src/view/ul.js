/**
 * Dinamyc ul element
 */
class Ul {
    /**
     * Create an ul element with its attributes and children
     * @param {String} id - the html id
     */
    constructor(id) {
        // Get the id and get the div
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

        this.fill()
    }

    /**
     * Append a value at the end of the list
     * @param {String} value - the string to be appended
     */
    append(value) {
        // Get and create the elements
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.textContent = value
        // Append the elements to their parents
        li.appendChild(a)
        this.ul.appendChild(li)
    }

    /**
     * Eliminate the dashes in the list
     */
    clear() {
        for (let i = 0, len = this.ul.children.length; i < len; i++) {
            if (this.ul.children[i].firstChild.textContent === '-') {
                while (true) {
                    this.ul.removeChild(this.ul.childNodes[i])
                    if (this.ul.children.length === i) return
                }
            }
        }
    }

    /**
     * Delete a particular child by its index
     * @param {Integer} index - the index of the children to be deleted
     */
    delete(index) {
        this.ul.removeChild(this.ul.childNodes[index])
        this.ul.setAttribute('selected', -1)
    }

    /**
     * Fill the list with dashes if needed
     */
    fill() {
        while (true) {
            let length = this.ul.children.length
            this.append('-')
            if (length > 6) break
        }
    }

    isEmpty() {
        if (this.ul.children[0].firstChild.textContent === '-') {
            return true
        }
        return false
    }

    /**
     * Get the code of the subjects in the list
     */
    getData() {
        if (this.isEmpty()) {
            alert('empty list')
        }

        let subjectNames = Array()
        for (let i = 0, len = this.ul.children.length; i < len; i++) {
            let value = this.ul.children[i].firstChild.textContent
            if (value !== '-') {
                subjectNames.push(value.substr(1, 7))
            }
        }
        return subjectNames
    }

    /**
     * Get the html id of the div element
     */
    getId() {
        return this.id
    }

    /**
     * Get the selected index in the list
     */
    getSelected() {
        return this.ul.getAttribute('selected')
    }

    /**
     * Verify if a value is an item in the list
     * @param {String} value - the value to verify
     */
    inList(value) {
        // Iterate over the children of the ul
        for (let i = 0, list = this.ul.children; i < list.length; i++) {
            if (list[i].firstChild.textContent === value) {
                return true
            }
        }
        return false
    }

}


