class Model {
    constructor() {
        this.availableSubjects = new Array()
        this.selectedSubjects = new Array()
        this.generatedSchedules = new Array()

    }

    select(subject) {
        let inList = false
        this.selectedSubjects.forEach(selectedSubject => {
            if (selectedSubject == subject) {
                alert('Already in list')
                inList = true
                return
            }
        })

        if (!inList) {
            this.selectedSubjects.push(subject)
        }
        
    }

    remove(subject) {
        this.selectedSubjects.forEach(selectedSubject => {
            if (selectedSubject == subject) {
                const index = this.selectedSubjects.indexOf(selectedSubject)
                this.selectedSubjects.slice(index, 1)
            }
        })
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