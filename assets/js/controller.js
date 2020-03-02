class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.selectedSchedule = 0
        this.schedule = new Schedule()

        this.dropdown = document.getElementById('dropdown')
    }


    init() {
        // Get data for model from the database 
        const data = database_get()
        database_fill_subject_list(data, this.model.availableSubjects)

        // Reload de select
        this.view.loadSelect(document.getElementById('dropdown'), this.model.availableSubjects)
        console.log(this.model.availableSubjects)
    }

    start() {
        console.log('start on controller')
        this.model.generateSchedules()

        this.view.load(this.model.generator.generatedSchedules[this.selectedSchedule])

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

        this.model.select(subject)

        this.view.clearSelect(document.getElementById('selected-subjects-select'))
        this.view.loadSelect(document.getElementById('selected-subjects-select'), this.model.selectedSubjects)
        console.log(subject)
        //this.view.clearSelect(this.view.selectAvailableSubjects)
        //this.view.clearSelect(this.view.selectSelectedSubjects)

        //this.view.reloadSelect(this.model.availableSubjects)
    }
    
    getSubjectByName(name) {
        
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