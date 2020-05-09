class ScheduleController {
    constructor() {
        // Model attributes
        this.subjects = new Array()
        this.generatedSchedules = new Array() // Useful
        this.selectedScheduleIndex = 0

        // View attributes
        this.scheduleView = new ScheduleView('schedule')

    }

    /**
     * Recursive algorithm that try every section of a list of subjects in a temporary schedule and generates
     * an array of Schedules which have sections that don't intersect between them
     * @param {Integer} index
     * @param {Schedule} schedule 
     * @param {Integer} subjectsLength
     */
    generator(indexOfSubject, schedule) {
        // Check if there are selected subjects
        if (this.subjects.length == 0) return

        // Instantiate the subject to test and get its sections
        let subject = this.subjects[indexOfSubject]
        let sections = subject.sections

        // Iterate over the sections of the subject
        for (let i = 0, sectionsLength = sections.length; i < sectionsLength; i++) {

            // If it's valid to add the i'th section
            if (schedule.appendSubject(subject, i)) {

                // And if there are more subjects
                if (indexOfSubject + 1 != this.subjects.length) {
                    // Iterate over the next subject in the subjects Array
                    this.generator(indexOfSubject + 1, schedule)
                } else {
                    // Push the generated schedule
                    this.generatedSchedules.push(new Schedule([...schedule.subjectsAndSections]))
                }

                // Remove the last appended subject
                schedule.removeSubject(subject)
            }
        }
    }

    /**
     * Set the subjects with which the generator will work
     * @param {Array} availableSubjects - the total subject list
     * @param {Array} codes - the code of the subjects which will be selected
     */
    setSubjects(availableSubjects, codes) {
        codes.forEach(code => {
            for (let i = 0; i < availableSubjects.length; i++) {
                if (availableSubjects[i].code === code) {
                    this.subjects.push(availableSubjects[i])
                    break
                }

            }
        })
    }

    /**
     * Set the subjects with which the generator will work
     * @param {Array} subjects - the subject list
     */
    set(subjects) {
        this.subjects = subjects;
    }

    /**
     * Load the current selected subject in the web page
     */
    load() {
        // Get the selected subject with the correct index
        const selectedSchedule = this.generatedSchedules[this.selectedScheduleIndex]

        // Load the view schedule
        this.scheduleView.delete()
        this.scheduleView.create()
        this.scheduleView.fill(selectedSchedule)
        this.scheduleView.load()
    }

    loadNext() {
        if (this.selectedScheduleIndex < this.generatedSchedules.length - 1) {
            this.selectedScheduleIndex++
            this.load()
        }
    }

    loadPrev() {
        if (this.selectedScheduleIndex > 0) {
            this.selectedScheduleIndex--
            this.load()
        }
    }
}