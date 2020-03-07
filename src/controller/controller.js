class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.selectedSchedule = 0
        this.schedule = new Schedule(new Array())

        this.list = new Ul('selected-subjects')
    }

    init() {
        // Get data for model from the database 
        const data = database_get()
        database_fill_subject_list(data, this.model.availableSubjects)

        // Reload de select
        this.view.loadSelect('available-subjects-select', this.model.availableSubjects)
        //this.view.loadUl('test-ul', this.model.availableSubjects)
    }

    start() {
        this.model.generateSchedules()

        this.view.loadSchedule(this.model.generator.generatedSchedules[this.selectedSchedule])

        //let item = schedule.subjects[0]
        //this.view.createSubjectEvent(item)
    }

    /**
     * Controls which subject is selected
     */
    selectSubject() {
        // Get the index of the selected subject
        const index = this.view.getSelectedIndex()

        // Get the subject in the list with that index
        const subject = this.model.availableSubjects[index]
        if (!subject) {
            alert('subject is undefined')
        } else {

            const code = subject.code
            const name = subject.name
            const value = '(' + code + ') ' + name

            if (!this.list.inList(value)) {
                this.list.append(value)
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
        } else {
            alert('No subject selected to delete')                                           // DEBUG ALERT
        }
        
    }

    nextSchedule() {
        if (this.selectedSchedule < this.model.generator.generatedSchedules.length - 1) {
            this.view.clearList()
            this.selectedSchedule++
            this.view.load(this.model.generator.generatedSchedules[this.selectedSchedule])
        }

    }

    prevSchedule() {
        if (this.selectedSchedule > 0) {
            this.view.clearList()
            this.selectedSchedule--
            this.view.load(this.model.generator.generatedSchedules[this.selectedSchedule])
        }
    }


}