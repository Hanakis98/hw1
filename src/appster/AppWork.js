export default class AppWork {
    constructor(initName) {
        this.name = initName;
        this.text = initName;
        this.fontSize = 12;
        this.textColor =  "#000";
        this.backgroundColor = "#FFFFFF";
        this.borderColor =  "#320903";
        this.borderThickness = 3;
        this.padding =  5;
        this.margin = 5;
    }

    setName(initName) {
        this.name = initName;
    }

    getName() {
        return this.name;
    }

    setText(initText) {
        this.text = initText;
    }

    getText() {
        return this.text;
    }

    setFontSize(initFontSize) {
        this.fontSize = initFontSize;
    }

    getFontSize() {
        return this.fontSize;
    }

    setTextColor(initColor) {
        this.textColor = initColor;
    }

    getTextColor() {
        return this.textColor;
    }

    setBackgroundColor(initColor) {
        this.backgroundColor = initColor;
    }

    getBackgroundColor() {
        return this.backgroundColor;
    }

    setBorderColor(initColor) {
        this.borderColor = initColor;
    }

    getBorderColor() {
        return this.borderColor;
    }

    setBorderRadius(initBorderRadius) {
        this.borderRadius = initBorderRadius;
    }

    getBorderRadius() {
        return this.borderRadius;
    }

    setBorderThickness(initBorderThickness) {
        this.borderThickness = initBorderThickness;
    }

    getBorderThickness() {
        return this.borderThickness;
    }

    setPadding(initPadding) {
        this.padding = initPadding;
    }

    getPadding() {
        return this.padding;
    }

    setMargin(initMargin) {
        this.margin = initMargin;
    }

    getMargin() {
        return this.margin;
    }
}