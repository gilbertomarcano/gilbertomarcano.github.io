/**
 * Represent a subject with its name, code, semester and an array of sections
 */
class Subject {
    /**
     * Construct a Subject Object
     * @param {String} name - the name of the subject 
     * @param {String} code - the code of the subject
     * @param {String} semester - the semester of the subject
     * @param {Array} sections - the sections of the subject
     */
    constructor(name, code, semester, sections) {
        this.name = name
        this.code = code
        this.semester = semester
        this.credits = parseInt(code[6])
        this.sections = sections
    }
}