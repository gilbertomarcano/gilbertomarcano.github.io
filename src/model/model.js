class Model {
    constructor() {
        this.availableSubjects = new Array()
        this.selectedSubjects = new Array()
        this.generatedSchedules = new Array()

    }

   

    generateSchedules() {
        // Update the list of the generator
        this.generator = new ScheduleGenerator(this.selectedSubjects)
        // Start the generator
        this.generator.start()
        this.generatedSchedules = [...this.generator.generatedSchedules] 
        console.log(this.generatedSchedules)


    }

    selectSubject(name) {
        this.availableSubjects.forEach(item => {
            if (item.subject.name == name) {
                item.selected = true
                return
            }
        })
    }

}