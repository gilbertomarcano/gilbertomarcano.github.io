class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.selectedSchedule = 0
        this.schedule = new Schedule()

        this.availableSubjects = document.getElementById('dropdown')
    }

    init() {
        // Get data for model from the database 
        const data = database_get()
        database_fill_subject_list(data, this.model.availableSubjects)

        // Reload de select
        //this.view.reloadSelect(this.model.availableSubjects)
        this.view.loadNewSelect(this.model.availableSubjects)
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
        // Get the name of the subject
        const name = document.getElementById('choice').textContent
        if (name != "Please choose") {
            console.log(name)
            this.model.selectSubject(name)

        } else {
            alert('Select a subject')
        }
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