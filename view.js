class View {
    constructor() {
        this.selectAvailableSubjects = document.getElementById('available-subjects-select')
        this.selectSelectedSubjects = document.getElementById('selected-subjects-select')
    }

    /**
     * Reload the select forms
     * @param {*} subjectList 
     */
    reloadSelect(subjectList = new Array()) {
        // Assign to a new option element the name of each subject
        subjectList.forEach(item => {
            const name = item.subject.name
            const element = this.createElement('option', name)

            // Assign to the correspond select form
            if (item.selected) {
                this.selectSelectedSubjects.appendChild(element)
            } else {
                this.selectAvailableSubjects.appendChild(element)
            }
        })
    }

    clearSelect(select) {
        for(let i = select.options.length - 1 ; i >= 0 ; i--) {
            select.remove(i);    
        }
    }

    // Create an element with an optional CSS class
    createElement(tag, value, className) {
        const element = document.createElement(tag)
        element.textContent = value
        element.value = value

        if (className) element.classList.add(className)

        return element
    }

    getSelectValue() {
        return this.selectAvailableSubjects.value
    }
}