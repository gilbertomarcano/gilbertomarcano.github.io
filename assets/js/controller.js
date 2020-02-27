class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.selectedSchedule = 0
        this.schedule = new Schedule()
    }

    init() {
        // Get data for model from the database 
        const data = database_get()
        database_fill_subject_list(data, this.model.availableSubjects)

        // Reload de select
        this.view.reloadSelect(this.model.availableSubjects)
    }

    start() {
        console.log('start on controller')
        this.model.generateSchedules()

        this.view.load(this.model.generator.generatedSchedules[this.selectedSchedule])

        //let item = schedule.subjects[0]
        //this.view.createSubjectEvent(item)
    }

    loadNext() {
        if (this.selectedSchedule < this.model.generator.generatedSchedules.length - 1) {
            this.view.clearList()
            this.selectedSchedule++
            this.view.load(this.model.generator.generatedSchedules[this.selectedSchedule])
        }
        
    }

    loadPrev() {
        if (this.selectedSchedule > 0) {
            this.view.clearList()
            this.selectedSchedule--
            this.view.load(this.model.generator.generatedSchedules[this.selectedSchedule])
        }
    }

    buttonSelect() {
        const selectedName = this.view.getSelectValue()
        if (selectedName) {
            this.model.selectSubject(selectedName)
        }
        this.view.clearSelect(this.view.selectAvailableSubjects)
        this.view.clearSelect(this.view.selectSelectedSubjects)

        this.view.reloadSelect(this.model.availableSubjects)
    }
}