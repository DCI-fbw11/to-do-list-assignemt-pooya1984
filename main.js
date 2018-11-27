class ListBinding {

    constructor(element) {
        this.element = element;
        this.textList = [];
        this.checked = false;

    }

    deleteAll() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }

    }

    update() {
        this.deleteAll();

        let a = 0;
        for (let text of this.textList) {
            let item = document.createElement("li");
            item.textContent = this.textList[a].text;
            item.setAttribute('value', item.textContent);
            item.setAttribute('id', a);
            item.setAttribute('onclick', 'listFields.showSelected(this)');
            this.element.append(item);
            this.showDelete().setAttribute('id', a);
            this.showUpdate()
            if (this.textList[a].checked == true) {
                item.classList.toggle("checked")
            }
            a++;
        }


    }

    add(item) {
        this.textList.push({ text: item, checked: this.checked });
        this.update();

    }

    deleteItem(arg) {
        if (confirm('Are you sure !!')) {
            this.textList.splice([arg.id], 1);
            this.update();
        }

    }

    updateItem(arg) {

        let textToUpdate = document.getElementById(arg.id).value;
        this.textList[arg.id].text = textToUpdate;
        this.update();

    }

    showDelete() {

        let deletelink;
        deletelink = document.createElement('i');
        deletelink.setAttribute('class', 'btn');
        deletelink.setAttribute('href', '#');
        deletelink.innerHTML = '<i class="fa fa-trash" aria-hidden="true" ></i>';
        deletelink.setAttribute('onclick', 'listFields.deleteItem(this)');
        this.element.appendChild(deletelink);
        return deletelink;

    }

    showUpdate() {
        let updatelink;
        updatelink = document.createElement('INPUT');
        updatelink.type = ('checkbox');
        updatelink.setAttribute('class', 'checkbox');
        updatelink.setAttribute('href', '#');
        updatelink.innerHTML = '<input type="checkbox" class="checkmark container">';
        updatelink.setAttribute('onclick', 'listFields.updateItem(this)');
        this.element.appendChild(updatelink);
        return updatelink;
    }

}
const myList = document.getElementById('result');

let listFields = new ListBinding(myList);

document.addEventListener("submit", listFunction);
function listFunction(e) {
    e.preventDefault();
    let todoText = '';
    todoText = document.getElementById('title').value;
    listFields.add(todoText);
    document.getElementById("title").value = "";
}

