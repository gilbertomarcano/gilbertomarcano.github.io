class SubjectListView {
    /**
     * Construct a subject list element
     * @param {String} id 
     */
    constructor(id) {
        this.list = document.getElementById(id)
        this.subjects = new Array();
    }

    /**
     * load the ul of the element with the subject's codes and names
     * @param {Array} subjects - the list of subjects to be loaded
     */
    load(subjects) {
        // Check if there is any subject
        if (subjects.length === 0) return false

        // Update the JS array.
        this.subjects = subjects;

        // Update the HTML divs.
        subjects.forEach(subject => {
            // Get the code and the name.
            const code = subject.code
            const name = subject.name
            // Create the anchor and append it to the list.
            const a = this.createListItem(code, name)
            this.list.appendChild(a)
        })

        return true
    }

    add(subject) {
        this.subjects.push(subject);
        this.update()
    }

    remove(subject) {
        const index = this.subjects.indexOf(subject)
        this.subjects.splice(index, 1);
        this.update()
    }

    update() {
        this.list.innerHTML = '';
        this.load(this.subjects)
    }

    /**
     * Append an item at the end of the list
     * @param {String} value - the string value to be appended
     */
    createListItem(code, name) {
        // Create the elements to be appended
        const a = document.createElement('a')
        const div = document.createElement('div')
        

        div.classList.add('subject-list-item')
        

        const h1 = document.createElement('h1')
        h1.textContent = name
        
        const h2 = document.createElement('h2')
        h2.textContent = code
        
        div.appendChild(h1)
        div.appendChild(h2)
        // Add the listener
        div.addEventListener("click", app.selectItem)
        div.classList.add('subject')
        // Append the div to the anchor.
        a.appendChild(div)
        // Return the anchor.
        return a
    }
}
