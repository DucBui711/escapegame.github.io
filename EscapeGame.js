"use strict";
/*

À partir de l'HTML fourni, construire une logique d'escape room.
La pièce contient 5 objets cliquables : une lampe, un tapis, un tableau, un coffre et une porte.

Règles du jeu :
- Au départ la pièce est sombre. Tant que la lampe n'est pas allumée,
  cliquer sur n'importe quel autre objet affiche "Tu n'y vois rien... Il fait trop sombre."
- Cliquer sur la lampe → allume la lumière
    → Retirer la classe "dark" et ajouter "lit" sur la div "room"
    → Retirer la classe "dark" aux autres objets
    → Ajouter la classe "on" sur la lampe
- Cliquer sur le tapis → on trouve une clé cachée dessous
    → Ajouter la classe "searched" sur le tapis
    → Mettre à jour le span "inventory-display" avec "🔑 Clé"
- Cliquer sur le tableau → on le retourne, un indice est écrit derrière :
    "L'année où la Tour Eiffel fut frappée par la foudre"
    → Ajouter la classe "flipped" sur le tableau
- Cliquer sur le coffre :
    → Si le joueur n'a PAS la clé : afficher "🔒 Le coffre est verrouillé. Il te faut une clé..."
    → Si le joueur A la clé : le coffre s'ouvre et révèle une carte magnétique permettant de valider le mot de passe saisie au niveau de la porte.
    → Mettre à jour le span "inventory-display" avec "💳 Carte magnétique" à la place de la clé
    → Ajouter la classe "opened" sur le coffre
- Cliquer sur la porte :
    → Retirer la classe "hidden" sur la div "code-section" pour faire apparaître la saisie
- Cliquer sur le bouton "Valider" :
    → Si la valeur dans "code-input" correspond à SECRET_CODE :
        ajouter "unlocked" sur la porte, recacher la code-section, afficher un message de victoire
    → Sinon : afficher "❌ Mauvais code..."

Pour les messages : utiliser la div "message-display" et gérer les classes
"message-info", "message-success", "message-fail", "message-victory"
(en retirant les autres à chaque fois)

Chaque objet ne doit réagir qu'une seule fois (si on reclique, rappeler ce qui a déjà été trouvé)

*/
let lamp_btn = document.getElementById("lamp");
let rug_btn = document.getElementById("rug");
let chest_btn = document.getElementById("chest");
let door_btn = document.getElementById("door");
let paint_btn = document.getElementById("painting");
let code_btn = document.getElementById("code-btn");
let room = document.getElementById("room");
let code_section = document.getElementById("code-section");
let inventory = document.getElementById("inventory-display");
let object_hint = document.getElementById("object-hint");
let code_input = document.getElementById("code-input");
let message = document.getElementById("message-display");
const SECRET_CODE = "1874";
let is_lit = false;
let has_key = false;
let painting_flipped = false;
let chest_opened = false;
function turn_on() {
    rug_btn.classList.toggle("dark");
    door_btn.classList.toggle("dark");
    chest_btn.classList.toggle("dark");
    paint_btn.classList.toggle("dark");
    room.classList.toggle("dark");
    room.classList.toggle("lit");
    lamp_btn.classList.toggle("on");
}
lamp_btn.onclick = turn_on;
function rug() {
    rug_btn.classList.toggle("searched");
    inventory.textContent = "🔑 Clé";
}
rug_btn.onclick = rug;
function table() {
    paint_btn.classList.toggle("flipped");
    object_hint.hidden = false;
    message.classList.toggle("message-info");
    message.textContent = "L'année où la Tour Eiffel fut frappée par la foudre";
}
paint_btn.onclick = table;
function chest() {
    if (inventory.textContent == "🔑 Clé") {
        inventory.textContent = "💳 Carte magnétique";
        chest_btn.classList.toggle("opened");
        message.classList.toggle("messagae-success");
    }
    else {
        inventory.textContent = "🔒 Le coffre est verrouillé. Il te faut une clé...";
        message.classList.toggle("messagae-fail");
    }
}
chest_btn.onclick = chest;
function door() {
    code_section.classList.remove("hidden");
    code_btn.hidden = false;
}
door_btn.onclick = door;
function valide() {
    let my_code = code_input.value;
    console.log(my_code);
    if (my_code === SECRET_CODE) {
        door_btn.classList.add("unlocked");
        code_section.classList.add("hidden");
        message.textContent = "Felicitation !!!";
        message.classList.toggle("message-victory");
    }
    else {
        message.classList.toggle("message-fail");
        message.textContent = "❌ Mauvais code...";
    }
}
code_btn.onclick = valide;
