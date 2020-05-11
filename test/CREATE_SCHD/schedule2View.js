class Schedule2View {
    /**
	 * Construct a graphical schedule
	 * @param {String} id 
	 */
	constructor(id) {
		// Get the id and get the div
        this.id = id
        this.div = document.getElementById(id)
        this.div.classList.add('tab')
    }
    
    createBlank() {
        const table = document.createElement('table')

        /* Headers */
        const days = this.createElement({tag: 'tr', class:'days'})
        days.appendChild(this.createElement({tag: 'th'}))
        days.appendChild(this.createElement({tag: 'th', textContent: 'Monday'}))
        days.appendChild(this.createElement({tag: 'th', textContent: 'Tuesday'}))
        days.appendChild(this.createElement({tag: 'th', textContent: 'Wednesday'}))
        days.appendChild(this.createElement({tag: 'th', textContent: 'Thursday'}))
        days.appendChild(this.createElement({tag: 'th', textContent: 'Friday'}))


        table.appendChild(days)

        this.div.appendChild(table)
    }

    createElement(obj) {
        const elem = document.createElement(obj.tag)
        elem.textContent = obj.textContent
        elem.classList.add(obj.class)
        return elem
    }


}