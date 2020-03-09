class Controller {
    constructor(view) {
        this.view = view

        this.availableSubjects = new Array() // Useful
        this.selectedSubjects = new Array() // Useful

        this.generatedSchedules = new Array() // Useful
        this.selectedSchedule = 0

        this.list = new Ul('selected-subjects')
        this.dropdown = new Dropdown('available-subjects')
        this.schedule = new ScheduleView('schedule')
    }

    /**
     * Initialize the app
     */
    init() {
        // Get data for model from the database 
        const data = database_get()
        database_fill_subject_list(data, this.availableSubjects)

        if (!this.dropdown.loadUl(this.availableSubjects)) {
            alert('try again to load the available subjects')                                   // DEBUG ALERT
        } 

        
        //this.view.loadUl('test-ul', this.model.availableSubjects)

    }

    getSelectedSubjects(codes) {
        let selectedSubjects = new Array()
        codes.forEach(code => {
            for (let i = 0; i < this.availableSubjects.length; i++) {
                if (this.availableSubjects[i].code === code) {
                    selectedSubjects.push(this.availableSubjects[i])
                    break
                }

            }
        })
        return selectedSubjects
    }

    
    /**
     * Controls which subject is selected
     */
    buttonSelect() {
        // Get the index of the selected subject
        const index = this.dropdown.getSelectedIndex()

        // Get the subject in the list with that index
        const subject = this.availableSubjects[index]

        if (!subject) {
            alert('subject is undefined')
        } else {

            const code = subject.code
            const name = subject.name
            const value = '(' + code + ') ' + name

            if (!this.list.inList(value)) {
                this.list.clear()
                this.list.append(value)
                this.list.fill()
            } else {
                alert('already in list')
            }
        }
    }

    buttonDelete() {
        const selected = parseInt(this.list.getSelected())
        const button = document.getElementById('delete-button')

        if (selected != -1) {
            this.list.delete(selected)

            if (!button.classList.contains('delete')) {
                button.classList.add('delete')
                setTimeout(() => button.classList.remove('delete'), 3200)
            }
            this.list.fill()

        } else {
            alert('No subject selected to delete')                                           // DEBUG ALERT
        }

    }

    
    


    /**
     * Algorithm that generates the valid schedules.
     */
    /**
     * Recursive algorithm that try every section of a list of subjects in a temporary schedule and generates
     * an array of Schedules which have sections that don't intersect between them
     * @param {Integer} index
     * @param {Schedule} schedule 
     * @param {Integer} subjectsLength
     */
    generator(indexOfSubject, schedule, subjectsLength) {
        // Check if there are selected subjects
        if (subjectsLength == 0) return
        
        // Instantiate the subject to test and get its sections
        let subject = this.selectedSubjects[indexOfSubject]
        let sections = subject.sections

        // Iterate over the sections of the subject
        for (let i = 0, sectionsLength = sections.length; i < sectionsLength; i++) {

            // If it's valid to add the i'th section
            if (schedule.appendSubject(subject, i)) {

                // And if there are more subjects
                if (indexOfSubject + 1 != subjectsLength) {
                    // Iterate over the next subject in the subjects Array
                    this.generator(indexOfSubject + 1, schedule, subjectsLength)
                } else {
                    // Push the generated schedule
                    this.generatedSchedules.push(new Schedule([...schedule.subjectsAndSections]))
                }

                // Remove the last appended subject
                schedule.removeSubject(subject)
            }
        }
    }

    start() {
        const codes = this.list.getData()
        this.selectedSubjects = this.getSelectedSubjects(codes)
        let schedule = new Schedule(new Array())
        let subjectsLength = this.selectedSubjects.length
        this.generator(0, schedule, subjectsLength)

        if (this.generatedSchedules.length === 0) {
            alert('no schedules generated')
        } else {
            this.schedule.create()
            this.view.loadSchedule(this.generatedSchedules[this.selectedSchedule])
            runSchedule()
        }
    }


    nextSchedule() {
        if (this.selectedSchedule < this.generatedSchedules.length - 1) {
            this.schedule.delete()
            this.schedule.create()

            this.selectedSchedule++
            this.view.loadSchedule(this.generatedSchedules[this.selectedSchedule])
            runSchedule()
        }

    }

    prevSchedule() {
        if (this.selectedSchedule > 0) {
            this.schedule.delete()
            this.schedule.create()
            
            this.selectedSchedule--
            this.view.loadSchedule(this.generatedSchedules[this.selectedSchedule])
            runSchedule()
        }
    }


    createSchedule() {
        
    }

    deleteSchedule() {
        this.schedule.delete()
    }
}