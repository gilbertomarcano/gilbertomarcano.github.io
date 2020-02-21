// Class Day
class ClassDay {
    constructor(classroom, hours) {
        this.classroom = classroom
        this.hours = hours
    }

    includes(anotherClassDay = new ClassDay()) {
        let intersection
        intersection = this.hours.filter(Set.prototype.has.bind(new Set(anotherClassDay.hours)))
        return Boolean(intersection.length)
    }

    // removeHours(rm_hours) {
    //     if (this.includes(rm_hours)) {
    //         rm_hours.forEach(hour => this.hours.splice(this.hours.indexOf(hour), 1))
    //     }
    // }
}



// Subject
class Subject {
    constructor(name, code, semester, sections = new Array()) {
        this.name = name
        this.code = code
        this.semester = semester
        this.credits = parseInt(code[6])
        this.sections = sections
    }
}

// Section
class Section {
    constructor(professor, id, classDays = new ClassDay()) {
        this.professor = professor
        this.id = id
        this.classDays = classDays
    }
}

// Schedule
class Schedule {
    constructor(subjects = new Array()) {
        this.subjects = subjects
    }

    check(newSection = new Section()) {
        var added = true
        // Select each subject of the list subjects
        this.subjects.forEach(item => {
            // Get the index of the selected section
            let indexOfSection = item.indexOfSection
            // Get the selected section in the subject using the index
            let section = item.subject.sections[indexOfSection]

            for (var i = 0; i < 5; i++) {
                if (section.classDays[i] && newSection.classDays[i] && section.classDays[i].includes(newSection.classDays[i])) {
                    added = false
                    return
                }      
            }
        })

        return added
    }

    appendSubject(subjectToAppend, indexOfSection) {
        var section = subjectToAppend.sections[indexOfSection]
        if (this.check(section)) {

            this.subjects.push({
                subject: subjectToAppend,
                indexOfSection: indexOfSection
            })

            return true
        }
        return false
    }

    removeSubject() {
        this.subjects.pop()
    }
}

class ScheduleGenerator {
    constructor(subjects = new Array()) {
        this.subjects = subjects
        this.generatedSchedules = new Array()
        this.schedule = new Schedule()
    }

    /**
     * Algorithm that generates the valid schedules.
     */
    start(index = 0) {
        // Check if there are selected subjects
        let subjectsLen = this.subjects.length
        if (subjectsLen == 0) return
        
        // Instantiate the subject to test
        let subject = this.subjects[index]
        
        // Get the sections of the subject
        let sections = this.subjects[index].sections

        // Iterate over the sections of the subject
        for (let i = 0, len = sections.length; i < len; i++) {

            // If it's valid to add the i'th section
            if (this.schedule.appendSubject(subject, i)) {

                // And if there are more subjects
                if (index + 1 != this.subjects.length) {
                    this.start(index + 1)
                } else {
                    // Push the generated schedule
                    this.generatedSchedules.push(new Schedule([...this.schedule.subjects]))
                }

                // Remove the last appended subject
                this.schedule.removeSubject(subject)

            }
        }
    }
}





// PLAIN TEXT DATABASE
function getContent() {
    return document.getElementById("myParagraph").innerHTML
}

function _strFillSubjects(content, subjectList) {
    var subjects = content.split('\n\n')
    subjects.forEach(subject => {
        subjectList.push({subject: _strReadSubject(subject), selected: false})
    })
}

function _strReadSubject(subject) {
    // Get the data that represents a subject
    data = subject.split('\n')

    // Get and set the header info of the subject
    var header = data[0].split(",")

    let name = header[0]
    let code = header[1]
    let semester = header[2]

    // Instansiate an array to push every section of the subject
    let sections = new Array()
    for (let i = 1; i < data.length; i++) {
        let section = data[i].split(",")
        sections.push(_strReadSection(section))
    }
    return new Subject(name, code, semester, sections)
}

function _strReadSection(section) {
    let id = section[0]
    let professor = section[1]
    let classDays = Array()
    for (let i = 2; i < section.length; i++) {
        day = section[i]
        classDays.push(_strReadDay(day))
    }
    
    return new Section(professor, id, classDays)
}

function _strReadDay(day) {
    if (day.length == 1) {
        return null
    } else {
        day = day.split('.')
        let classroom = day[0]
        let hours = Array()
        for (let j = 1; j < day.length; j++) {
            hours.push(parseInt(day[j]))
        }

        return new ClassDay(classroom, hours)
    }
}