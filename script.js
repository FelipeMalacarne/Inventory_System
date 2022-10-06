let my_inv = [
    {
        "id": "#0001",
        "name":"vodka",
        "min": 50,
        "qnt": 30,
        "status": false
    }
]



function item(id, name, min, qnt, status) {
    this.id = id;
    this.name = name;
    this.min = min;
    this.qnt = qnt;
    this.status = status;
}

const new_item = new item("#0002", "gin", 42, 30, true); 

function add_item_to_inv(new_item) {
    if (!my_inv.some(item => item.name === new_item.name)){
        my_inv.push(new_item)
    }
  }

function add_item_to_domain(new_item) {
    const item = document.createElement('div');
    const display= document.querySelector('#itens')

    const item_right = document.createElement('div');
    const item_left = document.createElement('div');
    item_right.classList.add('item-half');
    item_left.classList.add('item-half');
    item.classList.add('item');

    const id = document.createElement('div');
    const name = document.createElement('div');
    const min = document.createElement('div'); 
    const qnt = document.createElement('div');
    const status = document.createElement('div');

    id.textContent = new_item.id;
    name.textContent = new_item.name;
    min.textContent = new_item.min;
    qnt.textContent = new_item.qnt;
    status.textContent = new_item.status;


    item_left.appendChild(id);
    item_left.appendChild(name);
    item_right.appendChild(min);
    item_right.appendChild(qnt);
    item_right.appendChild(status);

    item.appendChild(item_left);
    item.appendChild(item_right);

    display.appendChild(item);

}


for (let i = 0; i < 10; i++){
    const new_item = new item("#" + i, "vov", 30, 30, true )
    add_item_to_domain(new_item);

}
    
