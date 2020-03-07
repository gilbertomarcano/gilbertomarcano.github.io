/**
 * Represent a section of a subject with its professor, id and an array of classes
 */
class Section {
    /**
     * Construct a Section Object
     * @param {String} professor - the professor of the section
     * @param {String} id - the id of the section
     * @param {Array} classes - the corresponded classes of every day of the section
     */
    constructor(professor, id, classes) {
        this.professor = professor
        this.id = id
        this.classes = [...classes]
    }
}