var domLib = {


    getElementById: function (id) {
        if (id) {
            return document.getElementById(id);
        }
        else {
            return "Given element have wrong name or does not exist";
        }
    },
    addElement: function (newElementType, textContent, mainElementId) {
        var parent = this.getElementById(mainElementId);
        var node = document.createElement(newElementType);
        node = document.createTextNode(textContent);
        parent.appendChild(node);
        return node;
    },
    deleteElement: function (element) {
        var el = this.getElementById(element);
        return el.parentNode.removeChild(el);
    },
    changeAtribute: function (atribute, parentAtribute, atributeValue) {
        if (atribute === "id") {
            return this.getElementById(parentAtribute).setAttribute("id", atributeValue);
        }
        if (atribute === "class") {
            return this.getElementById(parentAtribute).className = atributeValue;
        }
        if (atribute === "data") {
            return this.getElementById(parentAtribute).setAttribute("data", atributeValue);
        }
        if (atribute === "name") {
            return this.getElementById(parentAtribute).setAttribute("name", atributeValue);
        }
    },
    changeTextContent: function (element, newContent) {
        return this.getElementById(element).textContent = newContent;
    },
    changeHtmlContent: function (element, newContent) {
        return this.getElementById(element).innerHTML = newContent;
    },
    getHtmlContent: function (element) {
        return this.getElementById(element).outerHTML;
    },
    changeStyle: function (element, styleType, newStyle) {
        return this.getElementById(element).style[styleType] = newStyle;
    },
    addStyles: function (element, styles) {
        for (let s of styles) {
            return this.getElementById(element).setAttribute(s);
        }
    },
    getParent: function (child) {
        return this.getElementById(child).parentElement.nodeName;
    },
    getPreviousNode: function (element) {
        return this.getElementById(element).previousSibling.innerHTML;
    },
    getNextNode : function (element) {
        return this.getElementById(element).nextSibling.innerHTML;
    },
    getChildNodes : function (element) {
        var nodeKids = this.getElementById(element).childNodes;
        var nodes = "";
        for (let node of nodeKids) {
            //this.getElementById(element).innerHTML = node.nodeName;
            nodes += node.nodeName;
        }
        return nodes;
    },
    createEvent : function (element, event, todoFunction) {
        return this.getElementById(element).addEventListener(event, todoFunction);
    }

};
