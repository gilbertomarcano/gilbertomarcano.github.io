class Model {
    constructor() {
        this.availableSubjects = new Array()
        this.generatedSchedules = Array()
        this.generator = new ScheduleGenerator()

    }

    generateSchedules() {
        // Update the list of the generator
        this.generator.update(this.getSelectedSubjects())
        // Start the generator
        this.generator.start()
        this.generatedSchedules = [...this.generator.generatedSchedules] 
        console.log(this.generatedSchedules)


    }

    // DELETE ??
    getSelectedSubjects() {
        let selectedSubjects = new Array()

        this.availableSubjects.forEach(item => {
            if (item.selected) {
                selectedSubjects.push(item.subject)
            }
        })

        return selectedSubjects
    }

    selectSubject(selectedName) {
        this.availableSubjects.forEach(item => {
            if (item.subject.name == selectedName) {
                item.selected = true
                return
            }
        })
    }
    
    
}