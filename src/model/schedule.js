/**
 * Represent a schedule with an array of valid subjects and its corresponded section
 */
class Schedule {
    /**
     * Construct a Schedule Object
     * @param {Array} subjects 
     */
    constructor(subjectsAndSections) {
        this.subjectsAndSections = subjectsAndSections
    }


    // GET TO THE DATABASE TO REMAKE THE APP COMPLETELY AAAAAAAAAAAAAAAAAAAAAAAAaa
        
    isValid(newSection) {
        let valid = true
        // Select each subject of the list subjects
        this.subjectsAndSections.forEach(pair => {
            // Get the index of the selected section
            let indexOfSection = pair.indexOfSection
            // Get the selected section in the subject using the index
            let section = pair.subject.sections[indexOfSection]

            for (let i = 0; i < 5; i++) {
                if (section.classes[i] && newSection.classes[i] && section.classes[i].intersect(newSection.classes[i])) {
                    valid = false
                    return
                }
            }
        })

        return valid
    }

    appendSubject(subjectToAppend, indexOfSection) {
        var section = subjectToAppend.sections[indexOfSection]
        if (this.isValid(section)) {

            this.subjectsAndSections.push({
                subject: subjectToAppend,
                indexOfSection: indexOfSection
            })

            return true
        }
        return false
    }

    removeSubject() {
        this.subjectsAndSections.pop()
    }
}