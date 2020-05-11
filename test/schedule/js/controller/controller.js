class Controller {
  constructor() {
    this.scheduleController = new ScheduleController();

    this.availableSubjectsArray = new Array(); // Useful

    //this.list = new Ul("selected-subjects");

    this.availableSubjectsList = new SubjectListView("available-subjects");
    this.selectedSubjectsList = new SubjectListView("selected-subjects");
  }

  /**
   * Initialize the app
   */
  init() {
    // Get data for model from the database
    const data = database_get();
    database_fill_subject_list(data, this.availableSubjectsArray);
    this.availableSubjectsList.load(this.availableSubjectsArray);
    this.selectedSubjectsList.load([]);
  }

  selectItem(event) {
    let item;
    if (event.target.classList.contains("subject-list-item")) {
      // Click on div
      item = event.target;
    } else {
      // Click on h1 or h2
      item = event.target.parentElement;
    }
	
    if (item.parentElement.parentElement.id === 'available-subjects') {
      const code = item.children[1].textContent;
      const subject = app.selectSubject(code);
      //console.log(subject);
      if (item.classList.contains("selected")) {
        item.classList.remove("selected");
        app.selectedSubjectsList.remove(subject);
      } else {
        item.classList.add("selected");
        app.selectedSubjectsList.add(subject);
      }
    }
  }

  selectSubject(code) {
    for (let i = 0; i < app.availableSubjectsArray.length; i++) {
      if (app.availableSubjectsArray[i].code === code) {
        return app.availableSubjectsArray[i];
      }
    }
  }

  getSelectedSubjects(codes) {
    let selectedSubjects = new Array();
    codes.forEach((code) => {
      for (let i = 0; i < this.availableSubjectsArray.length; i++) {
        if (this.availableSubjectsArray[i].code === code) {
          selectedSubjects.push(this.availableSubjectsArray[i]);
          break;
        }
      }
    });
    return selectedSubjects;
  }

  /**
   * Controls which subject is selected
   */
  buttonSelectSubject() {
    // Get the index of the selected subject
    const index = this.dropdown.getSelectedIndex();

    // Instantiate the selected subject with that index
    const subject = this.availableSubjectsArray[index];

    if (!subject) {
      alert("subject is undefined");
    } else {
      const code = subject.code;
      const name = subject.name;
      const value = "(" + code + ") " + name;

      if (!this.list.inList(value)) {
        this.list.clear();
        this.list.append(value);
        this.list.fill();
      } else {
        alert("already in list");
      }
    }
  }

  buttonDeleteSubject() {
    const selected = parseInt(this.list.getSelected());
    const button = document.getElementById("delete-button");

    if (selected != -1) {
      this.list.delete(selected);

      if (!button.classList.contains("delete")) {
        button.classList.add("delete");
        setTimeout(() => button.classList.remove("delete"), 3200);
      }
      this.list.fill();
    } else {
      alert("No subject selected to delete"); // DEBUG ALERT
    }
  }

  buttonGenerateSchedules() {
    let schedule = new Schedule(new Array());
	//this.scheduleController.setSubjects(this.availableSubjectsArray, codes);
	this.scheduleController.set(app.selectedSubjectsList.subjects);
    this.scheduleController.generator(0, schedule);

    if (this.scheduleController.generatedSchedules.length === 0) {
      alert("no schedules generated");
    } else {
      // alert(
      //   this.scheduleController.generatedSchedules.length +
      //     " schedules were generated"
      // );
      this.scheduleController.load();
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
