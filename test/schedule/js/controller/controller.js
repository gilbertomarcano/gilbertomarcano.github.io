/**
 * 
 * PART 1. FILL THE SUBJECT LIST
 *    1.1 init()
 *    1.2 Use availableSubjectsArray as buffer of db 
 *    1.3 Load the availableSubjectList with the buffer
 * 
 * PART 2. SELECT THE SUBJECTS
 *    2.1 selecItemListener()
 * 
 * PART 3. GENERATE THE SCHEDULES
 *    3.1 scheduleController.init()
 * 
 * PART 4. SHOW THAT SCHEDULES IN THE VIEW
 */

class Controller {
  constructor() {
    // Controls the data from the schedules
    this.scheduleController = new ScheduleController();
    this.secheduleIndex = 0;

    this.availableSubjectsList = new SubjectListView("available-subjects");
    this.selectedSubjectsList = new SubjectListView("selected-subjects");


    this.timetable = new TimetableView('timetable')
  }

  /**
   * Initialize the app
   */
  init() {
    // Get data for model from the database
    const data = database_get();

    database_fill_subject_list(
      data,
      this.availableSubjectsList.subjects
    )

    this.availableSubjectsList.update()
    this.selectedSubjectsList.update();
  }

  /**
   * Add an element to the selected subject list
   * @param {} event 
   */
  selectItemListener(event) {
    let item;
    if (event.target.classList.contains("subject-list-item")) {
      // Click on div
      item = event.target;
    } else {
      // Click on h1 or h2
      item = event.target.parentElement;
    }

    // If the item was click from the available subject list
    if (item.parentElement.parentElement.id === 'available-subjects') {
      // Get the subject from the text and then its subject
      const code = item.children[1].textContent;
      const subject = app.availableSubjectsList.search(code)

      // Remove if already selected else add
      if (item.classList.contains("selected")) {
        item.classList.remove("selected");
        app.selectedSubjectsList.remove(subject);
      } else {
        item.classList.add("selected");
        app.selectedSubjectsList.add(subject);
      }
    }
  }

  buttonGenerateSchedules() {
    this.scheduleController.init(app.selectedSubjectsList.subjects)

    if (this.scheduleController.generatedSchedules.length === 0) {
      alert("no schedules generated");
    } else {
      alert(
        this.scheduleController.generatedSchedules.length +
        " schedules were generated"
      );
      console.log(this.scheduleController.generatedSchedules)

      this.createTimetable()

      document.getElementById('button-generator').style.visibility = 'hidden';
    }
  }

  createTimetable() {
    let schedule = this.scheduleController.generatedSchedules[this.secheduleIndex]

    this.timetable.create()
    this.fun(this.timetable, schedule)

  }

  fun(timetable, schedule) {
    schedule.subjectsAndSections.forEach(el => {
      let subject = el.subject
      let section = subject.sections[el.indexOfSection]

      let day
      for (let i = 0; i < 5; i++) {
        if (section.classes[i]) {
          switch (i) {
            case 0: day = 'monday'
              break
            case 1: day = 'tuesday'
              break
            case 2: day = 'wednesday'
              break
            case 3: day = 'thursday'
              break
            case 4: day = 'friday'
              break
          }

          let start = zeroPad(section.classes[i].start.hour, 2)

          let duration = section.classes[i].end.hour - section.classes[i].start.hour
          console.log(start, duration)

          if (duration == 2) {
            duration = 'two'
          } else if (duration == 3) {
            duration = 'three'
          }

          let title = subject.name
          let info = subject.code

          timetable.addEvent({
            day: day,
            start: start,
            duration: duration,
            title: title,
            info: info,
            color: '1'
          })
        }
      }

    })
  }

  


  buttonNextSchedule() {
    if (this.secheduleIndex + 1 != this.scheduleController.generatedSchedules.length) {
      this.secheduleIndex++;
      this.timetable.delete()
      this.createTimetable()
    }
  }

  buttonPrevSchedule() {
    if (this.secheduleIndex > 0) {
      this.secheduleIndex--;
      this.timetable.delete()
      this.createTimetable()
    }
  }
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}