class TimetableView {
    /**
	 * Construct a graphical schedule
	 * @param {String} id 
	 */
	constructor(id) {
		// Get the id and get the div
        this.id = id
        this.section = document.querySelector('#' + id)
    }

    create() {
        // Get the week element
        const week = document.querySelector('#week')

        // Create the monday element
        const mon = this.createElement({
            tag: 'li',
            id: 'monday',
            class: 'day'
        })
        mon.appendChild(this.createElement({
            tag: 'span',
            class: 'name',
            textContent: 'Lun'
        }))

        // Create the tuesday element
        const tue = this.createElement({
            tag: 'li',
            id: 'tuesday',
            class: 'day'
        })
        tue.appendChild(this.createElement({
            tag: 'span',
            class: 'name',
            textContent: 'Mar'
        }))

        // Create the wednesday element
        const wed = this.createElement({
            tag: 'li',
            id: 'wednesday',
            class: 'day'
        })
        wed.appendChild(this.createElement({
            tag: 'span',
            class: 'name',
            textContent: 'Mie'
        }))

        // Create the thursday element
        const thu = this.createElement({
            tag: 'li',
            id: 'thursday',
            class: 'day'
        })
        thu.appendChild(this.createElement({
            tag: 'span',
            class: 'name',
            textContent: 'Jue'
        }))

        // Create the friday element
        const fri = this.createElement({
            tag: 'li',
            id: 'friday',
            class: 'day'
        })
        fri.appendChild(this.createElement({
            tag: 'span',
            class: 'name',
            textContent: 'Vie'
        }))

        week.appendChild(mon)
        week.appendChild(tue)
        week.appendChild(wed)
        week.appendChild(thu)
        week.appendChild(fri)

    }

    delete() {
        document.querySelector('#week').innerHTML = ''
    }
    
    addEvent(obj) {
        let day_name
        switch (obj.day) {
            case 'monday': day_name = 'monday'
            break
            case 'tuesday': day_name = 'tuesday'
            break
            case 'wednesday': day_name = 'wednesday'
            break
            case 'thursday': day_name = 'thursday'
            break
            case 'friday': day_name = 'friday'
            break
        }

        const day = document.querySelector('#' + day_name)

        const hour = document.createElement('div')

        hour.classList.add('hour')
        hour.classList.add('hour__' + obj.start)
        hour.classList.add('hour--' + obj.duration)
        hour.classList.add('class' + obj.color)

        const title = document.createElement('div')
        title.classList.add('title')
        title.textContent = obj.title

        const info = document.createElement('div')
        info.textContent = obj.info

        hour.appendChild(title)
        hour.appendChild(info)

        day.appendChild(hour)
    }

    createElement(obj) {
        const element = document.createElement(obj.tag)
        if (obj.id) {
            element.id = obj.id
        }
        if (obj.class) {
            element.classList.add(obj.class)
        }
        if (obj.textContent) {
            element.textContent = obj.textContent
        }

        return element
    }
}

newsched = new TimetableView('timetable')
newsched.create()


newsched.addEvent({
    day: 'wednesday',
    start: '12',
    duration: 'two',
    title: 'my title',
    info: 'more info',
    color: '3'
})

newsched.addEvent({
    day: 'wednesday',
    start: '10',
    duration: 'two',
    title: 'my title',
    info: 'more info',
    color: '2'
})
newsched.addEvent({
    day: 'thursday',
    start: '11',
    duration: 'three',
    title: 'my title',
    info: 'more info',
    color: '1'
})
