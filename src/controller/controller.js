class Controller {
    constructor(view) {
        this.view = view

        this.availableSubjects = new Array() // Useful
        this.selectedSubjects = new Array() // ??
        this.generatedSchedules = new Array() // Useful

        this.selectedSchedule = 0
        this.tempSchedule = new Schedule(new Array())

        this.list = new Ul('selected-subjects')
        this.dropdown = new Dropdown('available-subjects')
    }

    init() {
        // Get data for model from the database 
        const data = database_get()
        database_fill_subject_list(data, this.availableSubjects)

        // Reload de select
        const select = document.getElementById(this.dropdown.getId())
        console.log('in init', select)
        this.dropdown.load(this.availableSubjects)
        //this.view.loadUl('test-ul', this.model.availableSubjects)

        clearSchedule()

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

    start() {
        const codes = this.list.getData()
        this.selectedSubjects = this.getSelectedSubjects(codes)
        this.generator(0)

        // this.model.generateSchedules()

        this.view.loadSchedule(this.generatedSchedules[this.selectedSchedule])

        runSchedule()

        // //let item = schedule.subjects[0]
        // //this.view.createSubjectEvent(item)
    }



    /**
     * Algorithm that generates the valid schedules.
     */
    generator(index = 0) {
        // Check if there are selected subjects
        let subjectsLen = this.selectedSubjects.length
        if (subjectsLen == 0) return
        
        // Instantiate the subject to test
        let subject = this.selectedSubjects[index]
        
        // Get the sections of the subject
        let sections = this.selectedSubjects[index].sections

        // Iterate over the sections of the subject
        for (let i = 0, len = sections.length; i < len; i++) {

            // If it's valid to add the i'th section
            if (this.tempSchedule.appendSubject(subject, i)) {

                // And if there are more subjects
                if (index + 1 != subjectsLen) {
                    // Iterate over the next subject in the subjects Array
                    this.generator(index + 1)
                } else {
                    // Push the generated schedule
                    this.generatedSchedules.push(new Schedule([...this.tempSchedule.subjectsAndSections]))
                }

                // Remove the last appended subject
                this.tempSchedule.removeSubject(subject)
            }
        }
    }


    nextSchedule() {
        if (this.selectedSchedule < this.generatedSchedules.length - 1) {
            clearSchedule()
            this.selectedSchedule++
            this.view.loadSchedule(this.generatedSchedules[this.selectedSchedule])
            runSchedule()
        }

    }

    prevSchedule() {
        if (this.selectedSchedule > 0) {
            clearSchedule()
            this.selectedSchedule--
            this.view.loadSchedule(this.generatedSchedules[this.selectedSchedule])
            runSchedule()
        }
    }
}