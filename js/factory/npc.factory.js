"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popup_interface_1 = require("../interface/popup.interface");
class NpcFactory {
    static HTML(npc, popup) {
        let tr = document.createElement('tr');
        let npcKeys = Object.keys(npc);
        var i = 1, max = 6;
        for (; i < max; i++) {
            let td = document.createElement('td');
            if (i === 1) {
                td.innerHTML = npcKeys[i];
            }
            else if (i === 2 || i === 3) {
                let positionKeys = Object.keys(npc.position);
                td.innerHTML = positionKeys[i - 2];
            }
            else if (i === 4) {
                let button = document.createElement('button');
                button.onclick = (event) => {
                    let message = npc.name + ' (X: ' + npc.position.x + ', Y: ' + npc.position.y + ')';
                    popup.sendToGroup(message);
                };
                td.appendChild(button);
            }
            else if (i === 5) {
                let button = document.createElement('button');
                button.onclick = (event) => {
                    popup.delete(popup_interface_1.PopupDataType.NPC, npc.id);
                };
                td.appendChild(button);
            }
            tr.appendChild(td);
        }
        return tr;
    }
}
exports.NpcFactory = NpcFactory;
