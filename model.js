class Model {
    constructor() {
        this.availableSubjects = new Array()
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
    
    start() {
        const generator = new ScheduleGenerator(this.getSelectedSubjects())
        console.log(generator.generatedSchedules)
        generator.start()
        console.log(generator.generatedSchedules)

    }
}