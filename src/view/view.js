class View {
    constructor() {
        // The root element
        this.app = this.getElement('#root')

        this.totalSubjects = 0

    }

    /**
     * Append an option with the name of a subject to a dropdown select
     * @param {*} select the select that is going to be extended
     * @param {*} name the name of the subject to be appended
     */
    appendChildToSelect(selectId, value) {
        // Create and append the element
        const select = document.getElementById(selectId)
        const element = this.createElement('option', value)
        const id = this.createAttribute('id', this.totalSubjects.toString())
        this.totalSubjects += 1

        element.setAttributeNode(id)
        select.appendChild(element)
    }



    appendChildToDiv(subject) {
        // Create the elements with its values and classes
        const div = this.createElement('div', null, 'option')
        const input = this.createElement('input', null, 'radio')
        const label = this.createElement('label', subject.name, null)

        // Create attributes for the input element
        const type = this.createAttribute('type', 'radio')
        const name = this.createAttribute('name', 'category')

        // Set attributes for the input element
        input.setAttributeNode(type)
        input.setAttributeNode(name)

        // Append the childs for the div element
        div.appendChild(input)
        div.appendChild(label)

        // Append the div to the main div
        const availableSubjects = document.getElementById('available-subjects')
        availableSubjects.appendChild(div)
    }


    clearSelect(selectId) {
        const select = document.getElementById(selectId)
        for (let i = select.options.length - 1; i >= 0; i--) {
            select.remove(i);
        }
    }

    clearList() {
        let weekday
        for (let i = 0; i < 5; i++) {
            if (i == 0) weekday = document.getElementById("monday-ul")
            else if (i == 1) weekday = document.getElementById("tuesday-ul")
            else if (i == 2) weekday = document.getElementById("wednesday-ul")
            else if (i == 3) weekday = document.getElementById("thursday-ul")
            else if (i == 4) weekday = document.getElementById("friday-ul")

            if (weekday) {
                while (weekday.childElementCount > 0) {
                    weekday.removeChild(weekday.firstChild)
                }
            }

        }
    }

    loadSchedule(schedule) {
        for (let i = 0, len = schedule.subjectsAndSections.length; i < len; i++) {
            addSubjectEvent(schedule.subjectsAndSections[i])
        }

    }

    createSubjectEvent(item) {
        let section = item.subject.sections[item.indexOfSection]

        //this.createDayEvent(item.subject, day, 'monday-ul')
        for (let i = 0; i < 5; i++) {
            if (section.classes[i]) {
                let weekday
                if (i == 0) weekday = 'monday-ul'
                else if (i == 1) weekday = 'tuesday-ul'
                else if (i == 2) weekday = 'wednesday-ul'
                else if (i == 3) weekday = 'thursday-ul'
                else if (i == 4) weekday = 'friday-ul'

                this.createDayEvent(item.subject, section.classes[i], weekday)
            }
        }
    }

    createDayEvent(subject, day, weekdayid) {
        // Creating the li element
        const li = document.createElement('li')
        li.classList.add('cd-schedule__event')

        // Creating the em element 
        const em = document.createElement('em')
        em.classList.add('cd-schedule__name')
        em.textContent = subject.name
        em.value = subject.name

        // Creating the a element and its attributes
        const a = this.createElement('a')
        const dataStart = this.createAttribute('data-start', day.start)
        const dataEnd = this.createAttribute('data-end', day.end)
        const dataContent = this.createAttribute('data-content', 'event-abs-workout')
        const dataEvent = this.createAttribute('data-event', 'event-1')
        const href = this.createAttribute('href', '#0')

        // Set attributes
        a.setAttributeNode(dataStart)
        a.setAttributeNode(dataEnd)
        a.setAttributeNode(dataContent)
        a.setAttributeNode(dataEvent)
        a.setAttributeNode(href)

        // Append everything to the correspond element
        a.appendChild(em)

        li.appendChild(a)

        // Getting the correct ul element and append the li
        const weekday = document.getElementById(weekdayid)

        weekday.appendChild(li)
    }

    // Create an attribute
    createAttribute(tag, value) {
        const attribute = document.createAttribute(tag)
        attribute.value = value

        return attribute
    }

    // Create an element with its value and CSS class
    createElement(tag, value, className) {
        const element = document.createElement(tag)
        if (value) {
            element.textContent = value
            element.value = value
        }

        if (className) element.classList.add(className)

        return element
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    getSelectValue() {
        return this.selectAvailableSubjects.value
    }

    /**
     * Returns the name of a subject in a select dropdown
     * @param {*} select 
     */
    getSelectedSubject(select) {
        const name = select.value
        return name
    }

}



