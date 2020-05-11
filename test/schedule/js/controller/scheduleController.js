class ScheduleController {
    constructor() {
        // Model attributes
        this.subjects = new Array()
        this.generatedSchedules = new Array() // Useful

        // View attributes
        // this.scheduleView = new ScheduleView('schedule')

    }

    init(subjects){
        this.subjects = subjects;
        this.generator(0, new Schedule(new Array()))
    }

    /**
     * Recursive algorithm that try every section of a list of subjects in a temporary schedule and generates
     * an array of Schedules which have sections that don't intersect between them
     * @param {Integer} index
     * @param {Schedule} buffer_schedule 
     * @param {Integer} subjectsLength
     */
    generator(indexOfSubject, buffer_schedule) {
        // Check if there are selected subjects
        if (this.subjects.length == 0) return

        // Instantiate the subject to test and get its sections
        let subject = this.subjects[indexOfSubject]
        let sections = subject.sections

        // Iterate over the sections of the subject
        for (let i = 0, sectionsLength = sections.length; i < sectionsLength; i++) {

            // If it's valid to add the i'th section
            if (buffer_schedule.appendSubject(subject, i)) {

                // And if there are more subjects
                if (indexOfSubject + 1 != this.subjects.length) {
                    // Iterate over the next subject in the subjects Array
                    this.generator(indexOfSubject + 1, buffer_schedule)
                } else {
                    // Push the generated schedule
                    this.generatedSchedules.push(new Schedule([...buffer_schedule.subjectsAndSections]))
                }

                // Remove the last appended subject
                buffer_schedule.removeSubject(subject)
            }
        }
    }

    /**
     * Load the current selected subject in the web page
     */
    // load() {
    //     // Get the selected subject with the correct index
    //     // const selectedSchedule = this.generatedSchedules[this.selectedScheduleIndex]
    //     // Load the view schedule
    //     // this.scheduleView.delete()
    //     // this.scheduleView.create()
    //     // this.scheduleView.fill(selectedSchedule)
    //     // this.scheduleView.load()
    // }

    // loadNext() {
    //     if (this.selectedScheduleIndex < this.generatedSchedules.length - 1) {
    //         this.selectedScheduleIndex++
    //         this.load()
    //     }
    // }

    // loadPrev() {
    //     if (this.selectedScheduleIndex > 0) {
    //         this.selectedScheduleIndex--
    //         this.load()
    //     }
    // }
}