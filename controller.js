class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }

    init() {
        const data = getContent()
        _strFillSubjects(data, this.model.availableSubjects)
        this.view.reloadSelect(this.model.availableSubjects)
        console.log(this.model.availableSubjects)                                   // DEBUG
    }

    buttonSelect() {
        const selectedName = this.view.getSelectValue()
        if (selectedName) {
            this.model.selectSubject(selectedName)
        }
        this.view.clearSelect(this.view.selectAvailableSubjects)
        this.view.clearSelect(this.view.selectSelectedSubjects)

        this.view.reloadSelect(this.model.availableSubjects)
        console.log(this.model.getSelectedSubjects())                              // DEBUG
    }
}