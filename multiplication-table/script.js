let table = document.getElementById('multiplication');
let tableCol = table.getElementsByTagName('col');

table.addEventListener('mouseover', tableHandler);
table.addEventListener('mouseout', tableHandler);

function tableHandler(e) {
    let target = e.target;
    if (target.nodeName !== 'TD') return;

    let cName = e.type === 'mouseover' ? 'active' : '';
    target.parentNode.className = cName;
    tableCol[target.cellIndex].className = cName;
}