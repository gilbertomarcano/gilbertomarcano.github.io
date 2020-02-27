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
}




// Section
class Section {
    constructor(professor, id, classDays = new Array()) {
        this.professor = professor
        this.id = id
        this.classDays = classDays
    }
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
        this.tempSchedule = new Schedule()
    }

    update(subjects) {
        this.subjects = subjects
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
            if (this.tempSchedule.appendSubject(subject, i)) {

                // And if there are more subjects
                if (index + 1 != this.subjects.length) {
                    // Iterate over the next subject in the subjects Array
                    this.start(index + 1)
                } else {
                    // Push the generated schedule
                    this.generatedSchedules.push(new Schedule([...this.tempSchedule.subjects]))
                }

                // Remove the last appended subject
                this.tempSchedule.removeSubject(subject)
            }
        }
    }
}



function database_load() {
    let data = 'COMPRENSIÓN Y EXPRESIÓN LINGÜÍSTICA,0061013,I;11,RIVAS JOAMEL,0,A-09.7.8,A-07.7.8,0,0;23,ROJAS M M LOURDES,0,0,A-17.7.8,0,A-17.7.8;29,MARPA MUJICA MADELEINE DEL V.,A-21.13.14,0,A-21.13.14,0,0?INGLÉS INSTRUMENTAL,0071823,I;03,ANTON MARVAL DANIEL ALEJANDRO,A-16.7.8,0,A-18.7.8,0,0;11,LUIS HENRIQUEZ,0,A-06.7.8,0,A-05.7.8,0;22,MARY ARAGUACHE,0,A-08.14.15,0,A-18.14.15,0?MATEMÁTICAS I,0081814,I;01,ROJAS PATRICIA,A-33.7.8,A-30.7.8,A-33.7.8,0,0;04,ALCALA JOZAREL ,0,ANF-01.7.8,A-25.9.10,A-26.7.8,0;06,ROJAS PATRICIA,A-35.9.10,A-30.9.10,A-24.9.10,0,0;12,ALCALA JOZAREL,A-30.9.10,A-26.9.10,A-25.7.8,0,0;17,VILLEGAS MICET GRECIA E.,0,A-32.11.12,A-26.9.10,A-26.9.10,0?DES. DEST. PARA EL APRENDIZAJE,0091012,I;04,LOPEZ DE M DEISY,0,0,0,A-22.10.11.12,0;11,CANARIO RUBEN,S.AMB.13.14.15,0,0,0,0;12,GUACARAN F DE JESUS,0,0,A-15.10.11.12,0,0;13,HURTADO PERNALETE NELLY YANITZA,0,A-01.10.11.12,0,0,0;14,DIAZ ORRIANNY,0,A-14.10.11.12,0,0,0;17,VASQUEZ SHEYLA,0,0,A-14.10.11.12,0,0;20,CANARIO RUBEN,0,0,0,A-15.13.14.15,0;27,HURTADO PERNALETE NELLY YANITZA,0,0,0,A-15.7.8.9,0?QUÍMICA GENERAL,0101214,I;08,SANTAMARIA VELASQUEZ FREDDY,A-39.11.12,A-28.9.10,A-28.11.12,0,0;22, MARCANO JESUS,A-29.13.14,A-28.13.14,0,A-35.13.14,0?FISICA I,0051324,II;11,LHUBEXIS SANTAELLA ,A-1.9.10,A-3.9.10,0,A-4.7.8,0;13,LUIS DIAZ,A-2.7.8,0,A-2.7.8,0,A-2.7.8;14,MARIA MARIÑO,A-3.9.10,A-4.9.10,A-4.9.10,0,0;20,RAUL RUIZ,0,A-1.11.12,A-1.11.12,A-1.11.12,0;26,CARLA PASTRANA,0,A-5.9.10,0,A-1.9.10,A-5.9.10;30,ISMERIA VELASQUEZ,A-3.13.14,0,A-3.11.12,A-3.13.14,0;32,LHUBEXIS SANTAELLA,A-1.7.8,A-3.7.8,0,A-4.9.10,0;34,LUIS DIAZ,A-2.9.10,0,A-2.9.10,0,A-2.9.10?COMPRENSION Y EXPRESION LINGUISTICA II,0061023,II;01,LEONELA GONZALEZ,A-8.7.8,0,A-16.7.8,0,0;05,LEONELA GONZALEZ,A-01.9.10,0,A-21.9.10,0,0?INGLÉS TÉCNICO I,0071121,II;02,LUIS HENRIQUEZ,A-01.7.8,0,A-01.7.8,0,0;03,LUIS HENRIQUEZ,A-05.9.10,0,A-06.9.10,0,0;04,MARY ARAGUACHE,A-05.14.15,0,A-12.14.15,0,0?MATEMÁTICAS II,0081824,II;01,TORRES JIMENEZ EUSTOLIA DEL VALLE,A-32.9.19,A-25.7.8,0,0,A-32.7.8;02,ROJAS TOLAZO OMAR ALFREDO,A-31.9.10,0,0,A-31.11.12,A-26.11.12;03,PINEDA RENGEL ALEX JOSE,ANF-01.11.12,0,ANF-01.11.12,A-33.7.8,0;04,CUMACHE MARIA,A-25.7.8,A-32.7.8,0,0,A-26.7.8;06, ROJAS TOLOZA OMAR ALFREDO,A-23.11.12,0,A-25.11.12,0,A-30.9.10;07,CORDERO DIAZ LUZ MERCEDES,A-26.9.10,A-24.9.10,A-13.9.10,0,0;08,CUMACHE MARIA,A-24.9.10,A-33.9.10,0,0,A-26.9.10?LÓGICA MATEMÁTICA,0721132,II;01,JOSE BASTARDO,0,0,0,I-4.10.11,0?INT. A LA INGENIERÍA EN COMPUTACIÓN,0721962,II;01,YULITZA MUJICA,0,I-7.10.11,0,0,0?COMPUTACIÓN BÁSICA,0721971,II;01,YULITZA MUJICA,0,0,0,0,I-7.11.11.12;20,YULITZA MUJICA,I-7.14.15.16,0,0,0,0?LABORATORIA DE FISICA I,0052131,III;02,RAUL RUIZ,0,LF-I.7.8.9,0,0,0;03,ALBERTO TIRADO,0,0,LF-I.7.8.9,0,0;04,LUIS SURGA,0,0,0,LF-I.7.8.9,0;05,ALBERTO TIRADO,0,0,0,0,LF-I.7.8.9;06,GABRIELA BARRIOS,LF-I.10.11.12,0,0,0,0;07,EFREN GUARITAMA,0,0,.13.14.1,0,0;10,ALBERTO TIRADO,0,0,0,0,.10.11.1;12,ISMERIA VELASQUEZ,0,LF-I.13.14.15,0,0,0?FISICA II,0052134,III;01,TINEO D ALEIDYS R,A-5.7.8,A-1.7.8,A-3.7.8,0,0;07,PARRA LISBETH,0,0,A-3.9.10,A-1.7.8,A-5.7.8;09,SALCEDO JESUS,0,0,A-30.9.10,A-33.11.12,A-31.9.19;22,LEON QUIJADA NELSON MARCOS,0,0,A-1.9.10,A-2.7.8,A-1.7.8?MATEMÁTICAS III,0082814,III;01,LAREZ M GLENIS J,A-26.7.8,A-40.7.8,0,A-39.7.8,0;02,RODRIGUEZ MILLAN MARLIN R,0,A-32.9.10,A-33.9.10,A-26.11.12,0;03,RODRIGUEZ MILLAN MARLIN R,A-31.7.8,0,A-24.7.8,A-25.9.10,0;04,MORILLO MARQUEZ ANGEL JOSE,A-32.7.8,0,A-31.9.10,A-40.7.8,0;20,HERRERA EUOLOGIO DE JESUS,A-23.15.16,A-33.15.16,0,A-32.13.14,0;25,HERRERA EUOLOGIO DE JESUS,A-33.13.14,A-32.13.14,0,A-31.15.16,0?INTRODUCIÓN A LA ING. DE SISTEMAS,0712642,III;01,RIOS ROSA FRANCY ROSSI,0,I-5.7.8,0,0,0;02,PERSAD YESENIA,0,I-5.10.11,0,0,0?PROGRAMACIÓN ORIENTADA A OBJETOS,0722103,III;01,TORREALBA AQUILES,I-6.11.12,0,0,0,I-6.12.13;02,DORTA PEDRO,0,I-5.12.13,0,I-4.13.14,0?TALLER DE PROGRAMACIÓN ORIENTADA A OBJETOS,0722111,III;20,TORREALBA AQUILES,0,0,0,SMRC.13.14.15,0;21,TORREALBA AQUILES,0,0,SMRC.10.11.12,0,0?MATEMÁTICAS DISCRETAS,0722153,III;01,TIRSO GARCIA,0,I-5.9.10.11,0,0,0?MATEMÁTICAS IV,0082824,IV;01,SANEZ FRANCISCO,A-40.9.10,A-40.9.10,0,0,A-40.9.10;02,PINTO DIAZ ONEIDA DEL V.,A-40.7.8,0,A-40.7.8,0,A-40.7.8;03,PINTO DIAZ ONEIDA DEL V.,A-38.9.11,A-26.7.8,A-40.9.11,0,0;23,SANEZ FRANCISCO,A-40.13.14,0,A-39.15.16,0,A-39.13.14?METODOLOGÍA DE LA INVESTIGACIÓN,0114043,IV;01,TOUSAINT MARIANNY,0,A-06.9.10,0,A-10.9.10,0?ESTADISTICA I,0623313,IV;01,ABRAHAM MENESES,0,I-21.7.8.9,0,0,0;02,MARVELIS GONZALEZ,0,0,I-13.7.8.9,0,0?INTRODUCCIÓN A LA ECONOMÍA,0712142,IV;02,CARABALLO AIDA,0,0,I-4.7.8.9,0,0?OBJETOS Y ABSTRACCIÓN DE DATOS,0722123,IV;02,GABRIELA VERACIERTA,I-7.10.11,0,0,I-7.10.11,0;20,GABRIELA VERACIERTA,I-7.12.11,0,I-7.12.11,0,0?TALLER DE OBJETOS Y ABSTRACCIÓN DE DATOS,0722131,IV;01,YULITZA MUJICA,0,CISCO.7.8.9,0,0,0;02,YULITZA MUJICA,0,0,0,CISCO.7.8.9,0;03,GABRIELA VERACIERTA,0,SMRC.10.11.12,0,0,0?CIRCUITOS Y SISTEMAS,0713463,V;01,LUIS ROJAS,I-6.7.8,0,I-5.7.8.9,0,0;20,JULIMA ANATO,0,0,I-5.14.15.16,I-5.14.15,0?INFERENCIA Y DISEÑO DE EXPERIMENTOS,0713122,V;01,WONG CAROLINA,0,I-4.7.8.9,0,0,0?SISTEMAS DE COSTOS INDUSTRIALES,0713172,V;20,ANDREW AZUAJE ABRAHAM ENRIQUE,I-6.14.15.16,0,0,0,0?TEORÍA DE SISTEMAS,0713632,V;01,RIOS ROSAS FRANCY ROSSI,I-4.9.10.11,0,0,0,0;02,RIOS ROSAS FRANCY ROSSI,0,0,0,I-5.9.10.11,0?SISTEMAS DE OPERACIÓN,0713643,V;01,JOSE BASTARDO,0,0,0,0,I-5.7.8.9?MÉTODOS NUMÉRICOS,0723913,V;01,AIDA CARABALLO,0,I-4.10.11,I-4.10.11,0,0?ECONOMÍA DE EMPRESAS,0713113,VI;21,EDGAR MILLAN,0,0,I-6.14.15.16,0,0?ADMINISTRACIÓN DE SIST. DE BASES DE DATOS,0713622,VI;01,CARRASQUERO MORALES MANUEL SEGUNDO,0,0,0,I-5.7.8.9,0?ENFOQUE SISTÉMICO,0713633,VI;01,RIOS ROSAS FRANCY ROSSI,I-4.7.8,0,I-7.7.8,0,0?ANÁLISIS DE DECISIONES,0713653,VI;01,RHONALD RODRIGUEZ,0,I-1.9.10.11,0,0,0?OPTMIZACIÓN DE OPERACIONES,0713663,VI;02,AQUILES TORREALBA,0,SNAV.12.13.14,0,0,I-1.10.11?ELECTRÓNICA,0723533,VI;01,JULIMA ANATO,I-5.9.10.11,0,I-5.10.11,0,0?PREPARACIÓN, EVALUACIÓN Y CONTROL DE PROYECTOS,0714153,VII;20,SOLORZANO BARRETO LUIS ENRIQUE,SMRC.13.14.15,I-1.14.15,0,0,0?ANÁLISIS Y DISEÑO DE SISTEMAS DE INFORMACIÓN,0714323,VII;20,SOLORZANO BARRETO LUIS ENRIQUE,0,I-1.12.13,0,I-1.12.13.14,0?MODELOS DE OPERACIONES I,0714633,VII;01,AURELIA TORCASIO,0,0,0,I-6.7.8,I-6.7.8?SISTEMAS DINÁMICOS,0714643,VII;01,ROJAS C. LUIS FELIPE,0,I-6.10.11,I-6.10.11,0,0?LABORATORIO DE CIRCUITOS Y ELECTRÓNICA,0724641,VII;01, ROJAS C. LUIS FELIPE,0,0,0,0,LSD.9.10.11;20,JULIMA ANATO,0,0,LSD.7.8.9,0,0?GESTIÓN EMPRESARIAL I,0714123,VIII;01,EDGAR MILLAN,0,0,0,I-7.7.8.9,0?MODELOS DE OPERACIONES II,0714133,VIII;01,EDGAR MILLAN,I-5.7.8,0,0,0,I-4.10.11?SISTEMAS DE COMUNICACIÓN INDUSTRIAL,0714642,VIII;01,ALFONSO ALFONSI,0,-I.7.8.9.,0,0,0?LEYES Y DEONTOLOGIA,0625822,IX;01,ROSA BLANCA,0,0,I-21.7.8,0,0;02,ROSA BLANCA,0,0,I-21.9.10,0,0;03,ROSA BLANCA,0,0,0,0,I-21.9.10;04,ROSA BLANCA,0,0,0,0,I-21.7.8?PLANIFICACIÓN ESTRATÉGICA,0715112,IX;20,SOLORZANO BARRETO LUIS ENRIQUE,0,0,I-1.13.14.15,0,0'

    return data
}


// PLAIN TEXT DATABASE
function database_get() {
    // Load the database
    return database_load()
}

function database_fill_subject_list(content, subjectList) {
    var subjects = content.split('?')
    subjects.forEach(subject => {
        subjectList.push({subject: database_read_subject(subject), selected: false})
    })
}

function database_read_subject(subject) {
    // Get the data that represents a subject
    data = subject.split(';')

    // Get and set the header info of the subject
    var header = data[0].split(",")

    let name = header[0]
    let code = header[1]
    let semester = header[2]

    // Instansiate an array to push every section of the subject
    let sections = new Array()
    for (let i = 1; i < data.length; i++) {
        let section = data[i].split(",")
        sections.push(database_read_section(section))
    }
    return new Subject(name, code, semester, sections)
}

function database_read_section(section) {
    let id = section[0]
    let professor = section[1]
    let classDays = Array()
    for (let i = 2; i < section.length; i++) {
        day = section[i]
        classDays.push(database_read_day(day))
    }
    
    return new Section(professor, id, classDays)
}

function database_read_day(day) {
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