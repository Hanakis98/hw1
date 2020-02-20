import AppsterController from '../appster/AppsterController.js'
import {GoLogoLoGUIId} from './GoLogoLoConstants.js'
//import { worker } from 'cluster';

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }
    
    processEditText() {
        if(document.getElementById("gologolo_edit_text_button") && (this.model.view.isHiding("gologolo_edit_text_button" ) ==false)){
            let enterNameButton = document.getElementById("appster_text_input_modal_enter_button");
            enterNameButton.onclick=() => {
 
                var textBox = document.getElementById("appster_text_input_modal_textfield");
                var txt = textBox.value;

                var work = this.model.getCurrentWork();

                work.setText(txt);

                 this.model.view.loadWork(work);
                 this.model.view.hideTextEditingModal();

                //CONTINUE HERE
            }
            
     }    
     
    }


    //adds event listeners to edit screen items
    // NOTE: we can use this.model.currentWork to access  work that is being edited
    registerGoLogoLoEventHandlers(){

        var work = this.model.getCurrentWork();

        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);

        /* You should modify the text in this to allow you to change the text that appears in the logo, if you desire
        this modal should also be used for naming your logo once you create it */
        let editTextButton = document.getElementById(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON);
        editTextButton.addEventListener("click", function(){
            this.model.view.showTextEditingModal();
            this.processEditText();                
             
        }.bind(this));

        if(document.getElementById("appster_text_input_modal_cancel_button")){
        let cancelButton = document.getElementById("appster_text_input_modal_cancel_button");
        cancelButton.addEventListener("click", function(){
            this.model.view.hideTextEditingModal();
            
        }.bind(this));
    }



        let fontSizeSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER);
        fontSizeSlider.oninput = function(e){
            var work = this.model.getCurrentWork();
             work.setFontSize(e.target.value)
            this.model.view.loadWorkStyle(work);
        }.bind(this);


        let textColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER);
        textColorPicker.oninput = function(e){
            var work = this.model.getCurrentWork();
            work.setTextColor(e.target.value)
            this.model.view.loadWorkStyle(work);
        }.bind(this);
        

        
        let backgroundColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER);
        backgroundColorPicker.oninput = function(e){
            var work = this.model.getCurrentWork();
            work.setBackgroundColor(e.target.value)
            this.model.view.loadWorkStyle(work);
        }.bind(this);

        
        let borderColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER);
        borderColorPicker.oninput = function(e){
            var work = this.model.getCurrentWork();
            work.setBorderColor(e.target.value)
            this.model.view.loadWorkStyle(work);
        }.bind(this);


        let borderRadiusSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER);
        borderRadiusSlider.addEventListener("input", function(){
            var work = this.model.getCurrentWork();
            work.setBorderRadius(borderRadiusSlider.value);
            this.model.view.loadWorkStyle(work);
        }.bind(this));
       

        let borderThicknessSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER);
        borderThicknessSlider.addEventListener("input", function(){
            var work = this.model.getCurrentWork();
            work.setBorderThickness(borderThicknessSlider.value);
            this.model.view.loadWorkStyle(work);
        }.bind(this));
       


        let paddingSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER);
        paddingSlider.addEventListener("input", function(e){
            var work = this.model.getCurrentWork();
            work.setPadding(e.target.value)
            this.model.view.loadWorkStyle(work);
        }.bind(this));
       




        let marginSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER);
        marginSlider.oninput = function(e){
            var work = this.model.getCurrentWork();
            work.setMargin(e.target.value)
            this.model.view.loadWorkStyle(work);
        }.bind(this);



    }
 
}
