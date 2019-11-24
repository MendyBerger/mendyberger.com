class Typer {
    constructor(element, charTypeTime = 70) {
        this.charTypeTime = charTypeTime;
        this._setTyperIds(element);
        let elementCopy = element.cloneNode(true);
        this.nodeList = this._getAllNodeChildren(elementCopy);
        this._next(1);
        element.textContent = '';
    }
    _getAllNodeChildren(el) {
        let listToReturn = [el];
        el.childNodes.forEach((e) => {
            if (e.nodeType === Node.TEXT_NODE) {
                listToReturn.push(e);
            }
            else if (e.nodeType === Node.ELEMENT_NODE) {
                let childrenNodes = this._getAllNodeChildren(e);
                listToReturn.push(...childrenNodes);
            }
        });
        return listToReturn;
    }
    _setTyperIds(el) {
        let currentIndex = 0;
        el.setAttribute("typerId", currentIndex);
        el.querySelectorAll("*").forEach(e => {
            e.setAttribute("typerId", ++currentIndex);
        });
    }
    _next(num) {
        let waitTime = this._addNode(this.nodeList[num]);
        if (num < this.nodeList.length) {
            setTimeout(() => {
                this._next(++num);
            }, waitTime * this.charTypeTime);
        }
    }
    _addNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            this._addElement(node);
            return 0;
        }
        else if (node.nodeType === Node.TEXT_NODE) {
            node = this._removeNewLines(node);
            this._addTextNode(node);
            return node.textContent.length;
        }
    }
    _addTextNode(textNode) {
        let text = textNode.textContent;
        let typerid = textNode.parentElement.getAttribute('typerId');
        let parent = document.querySelector(`[typerId='${typerid}']`);
        for (const i in text) {
            setTimeout(() => {
                parent.insertAdjacentHTML('beforeend', text[i]);
            }, (Number(i) + 1) * this.charTypeTime);
        }
    }
    _addElement(element) {
        let typerid = element.parentElement.getAttribute('typerId');
        let parent = document.querySelector(`[typerId='${typerid}']`);
        parent.appendChild(element.cloneNode());
    }
    _removeNewLines(textNode) {
        textNode.textContent = textNode.textContent.replace(/\s+/, ' ');
        return textNode;
    }
}
