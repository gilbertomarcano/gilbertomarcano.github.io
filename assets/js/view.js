class View {
    constructor() {
        // The root element
        this.app = this.getElement('#root')
        
        // The select forms
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

    load(schedule) {
        console.log('ready to load', schedule)
        for (let i = 0, len = schedule.subjects.length; i < len; i++) {
            this.createSubjectEvent(schedule.subjects[i])
        }

    }

    createSubjectEvent(item) {
        let section = item.subject.sections[item.indexOfSection]

        //this.createDayEvent(item.subject, day, 'monday-ul')
        for (let i = 0; i < 5; i++) {
            if (section.classDays[i]) {
                let weekday
                if (i == 0) weekday = 'monday-ul'
                else if (i == 1) weekday = 'tuesday-ul'
                else if (i == 2) weekday = 'wednesday-ul'
                else if (i == 3) weekday = 'thursday-ul'
                else if (i == 4) weekday = 'friday-ul'

                console.log('almost create day event', item.subject, section.classDays[i])
                this.createDayEvent(item.subject, section.classDays[i], weekday)
            }
        }
    }

    createDayEvent(subject, day, weekdayid) {
        const li = document.createElement('li')
        li.classList.add('cd-schedule__event')
        
        const em = document.createElement('em')
        em.classList.add('cd-schedule__name')
        em.textContent = subject.name
        em.value = subject.name

        console.log('created a li', li)
        console.log('created a em', em)

        const a = this.createElement('a')
        const dataStart = this.createAttribute('data-start', this.intToDate(day.hours[0]))
        const dataEnd = this.createAttribute('data-end', this.intToDate(day.hours[day.hours.length - 1] + 1))
        const dataContent = this.createAttribute('data-content', 'event-abs-workout')
        const dataEvent = this.createAttribute('data-event', 'event-1')
        const href = this.createAttribute('href', '#0')

        a.setAttributeNode(dataStart)
        a.setAttributeNode(dataEnd)
        a.setAttributeNode(dataContent)
        a.setAttributeNode(dataEvent)
        a.setAttributeNode(href)

        a.appendChild(em)

        console.log('created a', a)
        li.appendChild(a)
        console.log('added to ', weekdayid)
        const weekday = document.getElementById(weekdayid)
        console.log(weekday)
        console.log('========================')

        weekday.appendChild(li)
    }

    createAttribute(tag, value) {
        const attribute = document.createAttribute(tag)
        attribute.value = value

        return attribute
    }

    // Create an element with an optional CSS class
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



    intToDate(number) {
        switch (number) {
            case 7: return '07:00'
            case 8: return '08:00'
            case 9: return '09:00'
            case 10: return '10:00'
            case 11: return '11:00'
            case 12: return '12:00'
            case 13: return '13:00'
            case 14: return '14:00'
            case 15: return '15:00'
            case 16: return '16:00'
            case 17: return '17:00'
            default: break
        }
    }
}