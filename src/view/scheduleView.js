class ScheduleView {
	constructor(id) {
		// Get the id and get the div
        this.id = id
		this.div = document.getElementById(id)
	}

	create() {
		this.cd_schedule = document.createElement('div')
		this.cd_schedule.classList.add('cd-schedule')
		this.cd_schedule.classList.add('loading')
		this.createTimeline()
		this.createEvents()
		this.createEventModal()
		this.createCoverLayer()
		this.div.appendChild(this.cd_schedule)
	}

	delete() {
		this.div.removeChild(this.div.firstChild)
	}

	createTimeline() {
		const timeline = document.createElement('div')
		timeline.setAttribute('id', 'timeline')
		timeline.classList.add('timeline')
		
		const ul = document.createElement('ul')

		for (let i = 7; i < 18; i++) {
			const li_oclock = document.createElement('li')
			const li_half = document.createElement('li')
			const span_oclock = document.createElement('span')
			const span_half = document.createElement('span')

			if (i < 10) {
				span_oclock.textContent = '0' + i + ':' + '00'
				span_half.textContent = '0' + i + ':' + '30'
			} else {
				span_oclock.textContent = i + ':' + '00'
				span_half.textContent = i + ':' + '30'
			}

			li_oclock.appendChild(span_oclock)
			li_half.appendChild(span_half)

			ul.appendChild(li_oclock)
			ul.appendChild(li_half)

		}

		timeline.appendChild(ul)

		this.cd_schedule.appendChild(timeline)
	}

	createEvents() {
		const events = document.createElement('div')
		events.setAttribute('id', 'events')
		events.classList.add('events')

		const wrap = document.createElement('ul')
		wrap.classList.add('wrap')

		const monday = document.createElement('li')
		monday.classList.add('events-group')
		const monday_info = document.createElement('div')
		monday_info.classList.add('top-info')
		let span = document.createElement('span')
		span.textContent = 'Monday'
		monday_info.appendChild(span)
		const monday_ul = document.createElement('ul')
		monday_ul.classList.add('monday-ul')
		monday_ul.setAttribute('id', 'monday-ul')
		monday.appendChild(monday_info)
		monday.appendChild(monday_ul)

		const tuesday = document.createElement('li')
		tuesday.classList.add('events-group')
		const tuesday_info = document.createElement('div')
		tuesday_info.classList.add('top-info')
		span = document.createElement('span')
		span.textContent = 'Tuesday'
		tuesday_info.appendChild(span)
		const tuesday_ul = document.createElement('ul')
		tuesday_ul.classList.add('tuesday-ul')
		tuesday_ul.setAttribute('id', 'tuesday-ul')

		tuesday.appendChild(tuesday_info)
		tuesday.appendChild(tuesday_ul)

		const wednesday = document.createElement('li')
		wednesday.classList.add('events-group')
		const wednesday_info = document.createElement('div')
		wednesday_info.classList.add('top-info')
		span = document.createElement('span')
		span.textContent = 'Wednesday'
		wednesday_info.appendChild(span)
		const wednesday_ul = document.createElement('ul')
		wednesday_ul.classList.add('wednesday-ul')
		wednesday_ul.setAttribute('id', 'wednesday-ul')

		wednesday.appendChild(wednesday_info)
		wednesday.appendChild(wednesday_ul)

		const thursday = document.createElement('li')
		thursday.classList.add('events-group')
		const thursday_info = document.createElement('div')
		thursday_info.classList.add('top-info')
		span = document.createElement('span')
		span.textContent = 'Thursday'
		thursday_info.appendChild(span)
		const thursday_ul = document.createElement('ul')
		thursday_ul.classList.add('thursday-ul')
		thursday_ul.setAttribute('id', 'thursday-ul')
		thursday.appendChild(thursday_info)
		thursday.appendChild(thursday_ul)

		const friday = document.createElement('li')
		friday.classList.add('events-group')
		const friday_info = document.createElement('div')
		friday_info.classList.add('top-info')
		span = document.createElement('span')
		span.textContent = 'Friday'
		friday_info.appendChild(span)
		const friday_ul = document.createElement('ul')
		friday_ul.classList.add('friday-ul')
		friday_ul.setAttribute('id', 'friday-ul')
		friday.appendChild(friday_info)
		friday.appendChild(friday_ul)

		wrap.appendChild(monday)
		wrap.appendChild(tuesday)
		wrap.appendChild(wednesday)
		wrap.appendChild(thursday)
		wrap.appendChild(friday)

		events.appendChild(wrap)

		this.cd_schedule.appendChild(events)
	}

	createEventModal() {
		const event_modal = document.createElement('div')
		event_modal.classList.add('event-modal')

		const header = document.createElement('header')
		header.classList.add('header')
		const content = document.createElement('div')
		content.classList.add('content')
		const event_date = document.createElement('span')
		event_date.classList.add('event-date')
		const event_name = document.createElement('h3')
		event_name.classList.add('event-name')
		content.appendChild(event_date)
		content.appendChild(event_name)
		const header_bg = document.createElement('div')
		header_bg.classList.add('header-bg')
		header.appendChild(content)
		header.appendChild(header_bg)

		const body = document.createElement('div')
		body.classList.add('body')
		const event_info = document.createElement('div')
		event_info.classList.add('event-info')
		const body_bg = document.createElement('div')
		body_bg.classList.add('body-bg')
		body.appendChild(event_info)
		body.appendChild(body_bg)

		const close = document.createElement('a')
		close.setAttribute('href', '#0')
		close.classList.add('close')
		close.textContent = 'Close'

		event_modal.appendChild(header)
		event_modal.appendChild(body)
		event_modal.appendChild(close)

		this.cd_schedule.appendChild(event_modal)
	}
	
	createCoverLayer() {
		const cover_layer = document.createElement('div')
		cover_layer.classList.add('cover-layer')

		this.cd_schedule.appendChild(cover_layer)
	}
}