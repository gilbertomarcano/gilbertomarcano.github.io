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

    this.availableSubjectsList = new SubjectListView("available-subjects");
    this.selectedSubjectsList = new SubjectListView("selected-subjects");
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
      // this.scheduleController.load();
      // Hidden the generator button
      document.getElementById('button-generator').style.visibility = 'hidden';
    }
  }

  buttonNextSchedule() {
    this.scheduleController.loadNext();
  }

  buttonPrevSchedule() {
    this.scheduleController.loadPrev();
  }
}
