import {AppsterCallback, AppsterGUIId, AppsterHTML} from './AppsterConstants.js'
import AppWork from './AppWork.js';
import AppsterView from './AppsterView.js'

export default class AppsterController {
    constructor() {
this.model = null;
    }

    setModel(initModel) {
        this.model = initModel;
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {AppsterGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {AppsterHTML} eventName The type of control for which to respond.
     * @param {AppsterCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        if (control)
            control.addEventListener(eventName, callback.bind(this));
    }
 
 
    registerAppsterEventHandlers() {
        // FIRST THE NEW WORK BUTTON ON THE HOME SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_HOME_NEW_WORK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CREATE_NEW_WORK]);

        // THEN THE CONTROLS ON THE EDIT SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_HOME_LINK, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_GO_HOME]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TRASH, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_DELETE_WORK]);

        // AND THE MODAL BUTTONS
        this.registerEventHandler(AppsterGUIId.DIALOG_YES_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CONFIRM_DELETE_WORK]);
        this.registerEventHandler(AppsterGUIId.DIALOG_NO_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_DELETE_WORK]);


    }

    /**
    * This method sets up a callback method for an element, registering the
    * elementCallbackName (e.g. click) function for the element control in the DOM, specifying
    * callbackFunctionName as the method to be called when that event occurs. The
    * args array is used to pass needed data to the callback.
    * 
    * @param {Element} element 
    * @param {String} elementCallbackName 
    * @param {String} callbackFunctionName 
    * @param {String[]} args 
    */
    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = "this." + callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    registerRecentWorkEventHandler(element) {
        element.addEventListener(AppsterHTML.CLICK, this.processEditWork);
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome = () => {
        console.log("processGoHome");
        this.model.goHome();
    }

    processGoEdit=(workToEdit)=> {
        console.log("processGoEdit");
        this.model.goEdit(workToEdit);
    }

    /**
     * This function is called when the user requests to create
     * new work.
     */
    processCreateNewWork = (event) => {
        console.log("processCreateNewWork");


        this.model.view.showTextEditingModal();
        // PROMPT FOR THE NAME OF THE NEW LIST
        //var newName = window.prompt("What would like to name this?","Name");
        //create new work
 
            let enterNameButton = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON);
            var header = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_HEADER);
            header.innerHTML=" New Logo";
            header.style.fontSize="18px";

            var footer = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_FRAME).lastChild;
            if(footer)
            footer.innerHTML="Enter the name for your New Logo";

            var section = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_SECTION).firstChild;
            section.innerHTML="Enter Name";

            if(enterNameButton && this.model.view.isHiding(AppsterGUIId.APPSTER_EDIT_TRASH)){

            enterNameButton.onclick=() => {
 
                var textBox = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD);
                var newName = textBox.value;

                if(!newName){
                    newName=""
                }
                // MAKE A BRAND NEW LIST
                let newNameTrimmed = newName ? newName.trim() : "";
               
                if( newNameTrimmed.length < 1 ) {

                    header.innerHTML="Your name should be at least one character long.";
                    header.style.fontSize="12px";
                    return;
                } 
                
                // if not null , a logo with this name was found in model -> return false
                if(this.model.getRecentWork(newNameTrimmed)){
                    header.innerHTML="Sorry, a logo for this name already exists";
                    header.style.fontSize="12px";
                    return;
        
                }
                
                   
                //get name, create new logo, and add to recentworks
                let appWork = new AppWork(newNameTrimmed);
                this.model.appendWork(appWork);
                this.model.view.hideTextEditingModal();
            this.model.setCurrentWorkName=  newNameTrimmed;
            this.model.editWork(newNameTrimmed);                //CONTINUE HERE
            }
}
        
    }

    /**
     * This function responds to when the user clicks on a link
     * for recent work on the home screen.
     * 
     * @param {String} workName The name of the work to load into
     * the controls on the edit screen.
     */
    processEditWork = (event) => {
        console.log("processEditWork");

        // GET THE WORK THAT THE USER WANTS TO LOAD
        let clickedElement = event.target;
        let workName = clickedElement.workId;
        console.log(workName + " clicked");

        
        // START EDITING THE SELECTED WORK
        this.model.setCurrentWorkName(workName);
        this.model.editWork(workName);
    }

    /**
     * This function responds to when the user clicks the No
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processCancelDeleteWork() {
        // JUST HIDE THE DIALOG

    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user clicks the Yes
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processConfirmDeleteWork() {
        // DELETE THE WORK
        this.model.removeWork(this.model.getWorkToEdit());



        // GO BACK TO THE HOME SCREEN
        this.model.goHome();
    }

    /**
     * This function responds to when the user clicks the trash
     * button, i.e. the delete button, in order to delete the
     * list being edited.
     */
    processDeleteWork() {
        // VERIFY VIA A DIALOG BOX
        this.model.view.showDialog();

        let yesButton = document.getElementById("appster_yes_no_modal_yes_button");
        yesButton.onclick=()=>{
            console.log("Deleted");
            var workToDelete = this.model.getRecentWork(this.model.currentWorkName);
            if(!workToDelete){
                console.log("Work couldn't be found. You have a BIG problem.");
            }
            this.model.removeWork(workToDelete);
           this.processGoHome();
           this.model.view.hideDialog();


        }
        let noButton = document.getElementById("appster_yes_no_modal_no_button");
        noButton.onclick=()=>{
            this.model.view.hideDialog();
        }

            console.log("Not Deleted");
               
    }
}