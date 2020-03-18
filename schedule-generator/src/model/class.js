class Date {
    constructor(hour, minutes = 0) {
        this.hour = hour
        this.minutes = minutes
    }

    toString() {
        let strHour
        let strMinutes

        // Change to ternary
        if (this.hour < 10) strHour = '0' + this.hour.toString()
        else strHour = this.hour.toString()
        if (this.minutes < 10) strMinutes = '0' + this.minutes.toString()
        else strMinutes = this.minutes.toString()
        
        return strHour + ':' + strMinutes
    }

    equals(date) {
        if (this.hour == date.hour && this.minutes == date.minutes)
        return true
    }

    lessThan(date) {
        if (this.hour < date.hour) return true
        else if (this.hour > date.hour) return false
        else if (this.minutes < date.minutes) return true
        else return false
    }

    greaterThan(date) {
        return !this.lessThan(date)
    }
}

/**
 * Represent a class day with an array of hours in a particular day and a classroom
 */
class Class {
    /**
     * Construct a Class Object
     * @param {String} classroom - the classroom of the class
     * @param {Date} start - the hour when the class starts
     * @param {Date} end - the hour when the class finishes
     */
    constructor(classroom, start = new Date(7), end = new Date(0)) {
        this.classroom = classroom
        this.start = start
        this.end = end
    }

    /**
     * Compares the hours of two classes and returns if these hours interstect in some point
     * @param {Class} anotherClass - the other class to be compared 
     */
    intersect(anotherClass = new Class()) {
        if (this.start.equals(anotherClass.end) || this.start.greaterThan(anotherClass.end)) {
            return false
        } else if (this.end.equals(anotherClass.start) || this.end.lessThan(anotherClass.start)){
            return false
        } else {
            return true
        }
    }
}

let class1 = new Class('A5', [], new Date(7), new Date(9, 30))
let class2 = new Class('A5', [], new Date(4), new Date(6))


