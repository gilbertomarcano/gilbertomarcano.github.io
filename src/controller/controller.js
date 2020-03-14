class Controller {
    constructor() {
        this.scheduleController = new ScheduleController()

        this.availableSubjects = new Array() // Useful

        this.list = new Ul('selected-subjects')
        this.dropdown = new Dropdown('available-subjects')
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
    buttonSelectSubject() {
        // Get the index of the selected subject
        const index = this.dropdown.getSelectedIndex()

        // Instantiate the selected subject with that index
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

    buttonDeleteSubject() {
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


    buttonGenerateSchedules() {
        const codes = this.list.getData()
        let schedule = new Schedule(new Array())
        this.scheduleController.setSubjects(this.availableSubjects, codes)
        this.scheduleController.generator(0, schedule)

        if (this.scheduleController.generatedSchedules.length === 0) {
            alert('no schedules generated')
        } else {
            alert(this.scheduleController.generatedSchedules.length + ' schedules were generated')
            this.scheduleController.load()
        }
    }

    buttonNextSchedule() {
        this.scheduleController.loadNext()
    }

    buttonPrevSchedule() {
        this.scheduleController.loadPrev()
    }
}