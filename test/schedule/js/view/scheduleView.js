class ScheduleView {
	/**
	 * Construct a graphical schedule
	 * @param {String} id 
	 */
	constructor(id) {
		// Get the id and get the div
        this.id = id
		this.div = document.getElementById(id)
	}

	fill(schedule) {
		for (let i = 0, len = schedule.subjectsAndSections.length; i < len; i++) {
            this.addSubjectEvent(schedule.subjectsAndSections[i])
        }
	}

	addClassEvent(subjectName, sectionId, classDay, weekdayid) {
		const li = document.createElement('li')
		li.classList.add('single-event')
		li.setAttribute('data-start', classDay.start.toString())
		li.setAttribute('data-end', classDay.end.toString())
		li.setAttribute('data-contenct', 'event-abs-circuit')
		li.setAttribute('data-event', "event-3")
	
		const a = document.createElement('a')
		a.setAttribute('href', '#0')
	
		const em = document.createElement('em')
		em.classList.add('event-name')
		em.textContent = subjectName
		
		const section = document.createElement('em')
		section.classList.add('event-date')
		section.textContent = 'S-' + sectionId
	
		a.appendChild(em)
		a.appendChild(section)
		li.appendChild(a)
		const ul = document.getElementById(weekdayid)
		ul.appendChild(li)
	}

	addSubjectEvent(item) {
		const section = item.subject.sections[item.indexOfSection]
	
		for (let i = 0; i < 5; i++) {
			if (section.classes[i]) {
				let weekday
				if (i == 0) weekday = 'monday-ul'
				else if (i == 1) weekday = 'tuesday-ul'
				else if (i == 2) weekday = 'wednesday-ul'
				else if (i == 3) weekday = 'thursday-ul'
				else if (i == 4) weekday = 'friday-ul'
	
				this.addClassEvent(item.subject.name, section.id, section.classes[i], weekday)
			}
		}
	}

	/**
	 * Create the schedule by creating every single part of it
	 */
	create() {
		// Create the div of the schedule with its classes
		this.cd_schedule = document.createElement('div')
		this.cd_schedule.classList.add('cd-schedule')
		this.cd_schedule.classList.add('loading')
		
		// Create its children and append everything to the main div
		this.createTimeline()
		this.createEvents()
		this.createEventModal()
		this.createCoverLayer()

		this.div.appendChild(this.cd_schedule)
	}

	/**
	 * Delete the schedule by removing the child of the main div
	 */
	delete() {
		if (this.div.firstChild) {
			this.div.removeChild(this.div.firstChild)
		}
	}

	/**
	 * Create the timeline row and append it to the schedule div
	 */
	createTimeline() {
		const timeline = document.createElement('div')
		timeline.setAttribute('id', 'timeline')
		timeline.classList.add('timeline')
		
		const ul = document.createElement('ul')

		const firstScheduleHour = 7
		const lastScheduleHour = 18
		for (let i = firstScheduleHour; i < lastScheduleHour; i++) {
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

	/**
	 * Create the events rows and append it to the schedule div
	 */
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

	/**
	 * Create the event modal and append it to the schedule div
	 */
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
	
	/**
	 * Create the cover layer and append it to the schedule div
	 */
	createCoverLayer() {
		const cover_layer = document.createElement('div')
		cover_layer.classList.add('cover-layer')

		this.cd_schedule.appendChild(cover_layer)
	}

	load() {
		jQuery(document).ready(function ($) {
			var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
			var transitionsSupported = ($('.csstransitions').length > 0);
			//if browser does not support transitions - use a different event to trigger them
			if (!transitionsSupported) transitionEnd = 'noTransition';
	
			//should add a loding while the events are organized 
	
			function SchedulePlan(element) {
				this.element = element;
				this.timeline = this.element.find('.timeline');
				this.timelineItems = this.timeline.find('li');
				this.timelineItemsNumber = this.timelineItems.length;
				this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
				//need to store delta (in our case half hour) timestamp
				this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems.eq(1).text()) - getScheduleTimestamp(this.timelineItems.eq(0).text());
	
				this.eventsWrapper = this.element.find('.events');
				this.eventsGroup = this.eventsWrapper.find('.events-group');
				this.singleEvents = this.eventsGroup.find('.single-event');
				this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
	
				this.modal = this.element.find('.event-modal');
				this.modalHeader = this.modal.find('.header');
				this.modalHeaderBg = this.modal.find('.header-bg');
				this.modalBody = this.modal.find('.body');
				this.modalBodyBg = this.modal.find('.body-bg');
				this.modalMaxWidth = 800;
				this.modalMaxHeight = 480;
	
				this.animating = false;
	
				this.initSchedule();
			}
	
			SchedulePlan.prototype.initSchedule = function () {
				this.scheduleReset();
				this.initEvents();
			};
	
			SchedulePlan.prototype.scheduleReset = function () {
				var mq = this.mq();
				if (mq == 'desktop' && !this.element.hasClass('js-full')) {
					//in this case you are on a desktop version (first load or resize from mobile)
					this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
					this.element.addClass('js-full');
					this.placeEvents();
					this.element.hasClass('modal-is-open') && this.checkEventModal();
				} else if (mq == 'mobile' && this.element.hasClass('js-full')) {
					//in this case you are on a mobile version (first load or resize from desktop)
					this.element.removeClass('js-full loading');
					this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
					this.eventsWrapper.children('.grid-line').remove();
					this.element.hasClass('modal-is-open') && this.checkEventModal();
				} else if (mq == 'desktop' && this.element.hasClass('modal-is-open')) {
					//on a mobile version with modal open - need to resize/move modal window
					this.checkEventModal('desktop');
					this.element.removeClass('loading');
				} else {
					this.element.removeClass('loading');
				}
			};
	
			SchedulePlan.prototype.initEvents = function () {
				var self = this;
	
				this.singleEvents.each(function () {
					//create the .event-date element for each event
					var durationLabel = '<span class="event-date">' + $(this).data('start') + ' - ' + $(this).data('end') + '</span>';
					$(this).children('a').prepend($(durationLabel));
	
					//detect click on the event and open the modal
					$(this).on('click', 'a', function (event) {
						event.preventDefault();
						if (!self.animating) self.openModal($(this));
					});
				});
	
				//close modal window
				this.modal.on('click', '.close', function (event) {
					event.preventDefault();
					if (!self.animating) self.closeModal(self.eventsGroup.find('.selected-event'));
				});
				this.element.on('click', '.cover-layer', function (event) {
					if (!self.animating && self.element.hasClass('modal-is-open')) self.closeModal(self.eventsGroup.find('.selected-event'));
				});
			};
	
			SchedulePlan.prototype.placeEvents = function () {
				var self = this;
				this.singleEvents.each(function () {
					//place each event in the grid -> need to set top position and height
					var start = getScheduleTimestamp($(this).attr('data-start')),
						duration = getScheduleTimestamp($(this).attr('data-end')) - start;
						
					console.log(self.mq())
					var eventTop = self.eventSlotHeight * (start - self.timelineStart) / self.timelineUnitDuration,
						eventHeight = self.eventSlotHeight * duration / self.timelineUnitDuration;
	
					$(this).css({
						top: (eventTop - 1) + 'px',
						height: (eventHeight + 1) + 'px'
					});
				});
	
				this.element.removeClass('loading');
			};
	
			SchedulePlan.prototype.openModal = function (event) {
				var self = this;
				var mq = self.mq();
				this.animating = true;
	
				//update event name and time
				this.modalHeader.find('.event-name').text(event.find('.event-name').text());
				this.modalHeader.find('.event-date').text(event.find('.event-date').text());
				this.modal.attr('data-event', event.parent().attr('data-event'));
	
				//update event content
				this.modalBody.find('.event-info').load(event.parent().attr('data-content') + '.html .event-info > *', function (data) {
					//once the event content has been loaded
					self.element.addClass('content-loaded');
				});
	
				this.element.addClass('modal-is-open');
	
				setTimeout(function () {
					//fixes a flash when an event is selected - desktop version only
					event.parent('li').addClass('selected-event');
				}, 10);
	
				if (mq == 'mobile') {
					self.modal.one(transitionEnd, function () {
						self.modal.off(transitionEnd);
						self.animating = false;
					});
				} else {
					var eventTop = event.offset().top - $(window).scrollTop(),
						eventLeft = event.offset().left,
						eventHeight = event.innerHeight(),
						eventWidth = event.innerWidth();
	
					var windowWidth = $(window).width(),
						windowHeight = $(window).height();
	
					var modalWidth = (windowWidth * .8 > self.modalMaxWidth) ? self.modalMaxWidth : windowWidth * .8,
						modalHeight = (windowHeight * .8 > self.modalMaxHeight) ? self.modalMaxHeight : windowHeight * .8;
	
					var modalTranslateX = parseInt((windowWidth - modalWidth) / 2 - eventLeft),
						modalTranslateY = parseInt((windowHeight - modalHeight) / 2 - eventTop);
	
					var HeaderBgScaleY = modalHeight / eventHeight,
						BodyBgScaleX = (modalWidth - eventWidth);
	
					//change modal height/width and translate it
					self.modal.css({
						top: eventTop + 'px',
						left: eventLeft + 'px',
						height: modalHeight + 'px',
						width: modalWidth + 'px',
					});
					transformElement(self.modal, 'translateY(' + modalTranslateY + 'px) translateX(' + modalTranslateX + 'px)');
	
					//set modalHeader width
					self.modalHeader.css({
						width: eventWidth + 'px',
					});
					//set modalBody left margin
					self.modalBody.css({
						marginLeft: eventWidth + 'px',
					});
	
					//change modalBodyBg height/width ans scale it
					self.modalBodyBg.css({
						height: eventHeight + 'px',
						width: '1px',
					});
					transformElement(self.modalBodyBg, 'scaleY(' + HeaderBgScaleY + ') scaleX(' + BodyBgScaleX + ')');
	
					//change modal modalHeaderBg height/width and scale it
					self.modalHeaderBg.css({
						height: eventHeight + 'px',
						width: eventWidth + 'px',
					});
					transformElement(self.modalHeaderBg, 'scaleY(' + HeaderBgScaleY + ')');
	
					self.modalHeaderBg.one(transitionEnd, function () {
						//wait for the  end of the modalHeaderBg transformation and show the modal content
						self.modalHeaderBg.off(transitionEnd);
						self.animating = false;
						self.element.addClass('animation-completed');
					});
				}
	
				//if browser do not support transitions -> no need to wait for the end of it
				if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
			};
	
			SchedulePlan.prototype.closeModal = function (event) {
				var self = this;
				var mq = self.mq();
	
				this.animating = true;
	
				if (mq == 'mobile') {
					this.element.removeClass('modal-is-open');
					this.modal.one(transitionEnd, function () {
						self.modal.off(transitionEnd);
						self.animating = false;
						self.element.removeClass('content-loaded');
						event.removeClass('selected-event');
					});
				} else {
					var eventTop = event.offset().top - $(window).scrollTop(),
						eventLeft = event.offset().left,
						eventHeight = event.innerHeight(),
						eventWidth = event.innerWidth();
	
					var modalTop = Number(self.modal.css('top').replace('px', '')),
						modalLeft = Number(self.modal.css('left').replace('px', ''));
	
					var modalTranslateX = eventLeft - modalLeft,
						modalTranslateY = eventTop - modalTop;
	
					self.element.removeClass('animation-completed modal-is-open');
	
					//change modal width/height and translate it
					this.modal.css({
						width: eventWidth + 'px',
						height: eventHeight + 'px'
					});
					transformElement(self.modal, 'translateX(' + modalTranslateX + 'px) translateY(' + modalTranslateY + 'px)');
	
					//scale down modalBodyBg element
					transformElement(self.modalBodyBg, 'scaleX(0) scaleY(1)');
					//scale down modalHeaderBg element
					transformElement(self.modalHeaderBg, 'scaleY(1)');
	
					this.modalHeaderBg.one(transitionEnd, function () {
						//wait for the  end of the modalHeaderBg transformation and reset modal style
						self.modalHeaderBg.off(transitionEnd);
						self.modal.addClass('no-transition');
						setTimeout(function () {
							self.modal.add(self.modalHeader).add(self.modalBody).add(self.modalHeaderBg).add(self.modalBodyBg).attr('style', '');
						}, 10);
						setTimeout(function () {
							self.modal.removeClass('no-transition');
						}, 20);
	
						self.animating = false;
						self.element.removeClass('content-loaded');
						event.removeClass('selected-event');
					});
				}
	
				//browser do not support transitions -> no need to wait for the end of it
				if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
			}
	
			SchedulePlan.prototype.mq = function () {
				//get MQ value ('desktop' or 'mobile') 
				var self = this;
				return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
			};
	
			SchedulePlan.prototype.checkEventModal = function (device) {
				this.animating = true;
				var self = this;
				var mq = this.mq();
	
				if (mq == 'mobile') {
					//reset modal style on mobile
					self.modal.add(self.modalHeader).add(self.modalHeaderBg).add(self.modalBody).add(self.modalBodyBg).attr('style', '');
					self.modal.removeClass('no-transition');
					self.animating = false;
				} else if (mq == 'desktop' && self.element.hasClass('modal-is-open')) {
					self.modal.addClass('no-transition');
					self.element.addClass('animation-completed');
					var event = self.eventsGroup.find('.selected-event');
	
					var eventTop = event.offset().top - $(window).scrollTop(),
						eventLeft = event.offset().left,
						eventHeight = event.innerHeight(),
						eventWidth = event.innerWidth();
	
					var windowWidth = $(window).width(),
						windowHeight = $(window).height();
	
					var modalWidth = (windowWidth * .8 > self.modalMaxWidth) ? self.modalMaxWidth : windowWidth * .8,
						modalHeight = (windowHeight * .8 > self.modalMaxHeight) ? self.modalMaxHeight : windowHeight * .8;
	
					var HeaderBgScaleY = modalHeight / eventHeight,
						BodyBgScaleX = (modalWidth - eventWidth);
	
					setTimeout(function () {
						self.modal.css({
							width: modalWidth + 'px',
							height: modalHeight + 'px',
							top: (windowHeight / 2 - modalHeight / 2) + 'px',
							left: (windowWidth / 2 - modalWidth / 2) + 'px',
						});
						transformElement(self.modal, 'translateY(0) translateX(0)');
						//change modal modalBodyBg height/width
						self.modalBodyBg.css({
							height: modalHeight + 'px',
							width: '1px',
						});
						transformElement(self.modalBodyBg, 'scaleX(' + BodyBgScaleX + ')');
						//set modalHeader width
						self.modalHeader.css({
							width: eventWidth + 'px',
						});
						//set modalBody left margin
						self.modalBody.css({
							marginLeft: eventWidth + 'px',
						});
						//change modal modalHeaderBg height/width and scale it
						self.modalHeaderBg.css({
							height: eventHeight + 'px',
							width: eventWidth + 'px',
						});
						transformElement(self.modalHeaderBg, 'scaleY(' + HeaderBgScaleY + ')');
					}, 10);
	
					setTimeout(function () {
						self.modal.removeClass('no-transition');
						self.animating = false;
					}, 20);
				}
			};
	
			var schedules = $('.cd-schedule');
			var objSchedulesPlan = [],
				windowResize = false;
	
			if (schedules.length > 0) {
				schedules.each(function () {
					//create SchedulePlan objects
					objSchedulesPlan.push(new SchedulePlan($(this)));
				});
			}
	
			$(window).on('resize', function () {
				if (!windowResize) {
					windowResize = true;
					(!window.requestAnimationFrame) ? setTimeout(checkResize) : window.requestAnimationFrame(checkResize);
				}
			});
	
			$(window).keyup(function (event) {
				if (event.keyCode == 27) {
					objSchedulesPlan.forEach(function (element) {
						element.closeModal(element.eventsGroup.find('.selected-event'));
					});
				}
			});
	
			function checkResize() {
				objSchedulesPlan.forEach(function (element) {
					element.scheduleReset();
				});
				windowResize = false;
			}
	
			function getScheduleTimestamp(time) {
				//accepts hh:mm format - convert hh:mm to timestamp
				time = time.replace(/ /g, '');
				var timeArray = time.split(':');
				var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
				return timeStamp;
			}
	
			function transformElement(element, value) {
				element.css({
					'-moz-transform': value,
					'-webkit-transform': value,
					'-ms-transform': value,
					'-o-transform': value,
					'transform': value
				});
			}
		});
	
	}
}
