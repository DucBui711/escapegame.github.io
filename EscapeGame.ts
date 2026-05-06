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

let lamp_btn:HTMLButtonElement = document.getElementById("lamp") as HTMLButtonElement;
let rug_btn:HTMLButtonElement = document.getElementById("rug") as HTMLButtonElement;
let chest_btn:HTMLButtonElement = document.getElementById("chest") as HTMLButtonElement;
let door_btn:HTMLButtonElement = document.getElementById("door") as HTMLButtonElement;
let paint_btn:HTMLButtonElement = document.getElementById("painting") as HTMLButtonElement;
let code_btn:HTMLButtonElement = document.getElementById("code-btn") as HTMLButtonElement;


let room:HTMLDivElement = document.getElementById("room") as HTMLDivElement;
let code_section:HTMLDivElement = document.getElementById("code-section") as HTMLDivElement;

let inventory:HTMLSpanElement = document.getElementById("inventory-display") as HTMLSpanElement;
let object_hint:HTMLSpanElement = document.getElementById("object-hint") as HTMLSpanElement;
let code_input:HTMLInputElement = document.getElementById("code-input") as HTMLInputElement;
let message:HTMLParagraphElement = document.getElementById("message-display") as HTMLInputElement;

const SECRET_CODE: string = "1874";

let is_lit: boolean = false;
let has_key: boolean = false;
let painting_flipped: boolean = false;
let chest_opened: boolean = false;

function turn_on():void{

    rug_btn.classList.toggle("dark");
    door_btn.classList.toggle("dark");
    chest_btn.classList.toggle("dark");
    paint_btn.classList.toggle("dark");
    room.classList.toggle("dark");
    room.classList.toggle("lit");
    lamp_btn.classList.toggle("on");
}

lamp_btn.onclick = turn_on;

function rug():void{
    rug_btn.classList.toggle("searched");
    inventory.textContent = "🔑 Clé";
}

rug_btn.onclick = rug;

function table():void{
    paint_btn.classList.toggle("flipped");
    object_hint.hidden = false;
    message.classList.toggle("message-info");
    message.textContent = "L'année où la Tour Eiffel fut frappée par la foudre";
}

paint_btn.onclick = table;

function chest():void{
    if(inventory.textContent == "🔑 Clé"){
        inventory.textContent = "💳 Carte magnétique";
        chest_btn.classList.toggle("opened");
        message.classList.toggle("messagae-success");
    } else {
        inventory.textContent = "🔒 Le coffre est verrouillé. Il te faut une clé...";
        message.classList.toggle("messagae-fail");
    }
}

chest_btn.onclick = chest;  

function door():void{
    code_section.classList.remove("hidden");
    code_btn.hidden = false;
}

door_btn.onclick = door;    

function valide():void{
    let my_code:string = code_input.value;
    console.log(my_code);
    if(my_code === SECRET_CODE){
        door_btn.classList.add("unlocked");
        code_section.classList.add("hidden");
        message.textContent = "Felicitation !!!"
        message.classList.toggle("message-victory");
    } else {
        message.classList.toggle("message-fail");
        message.textContent = "❌ Mauvais code..."
    }

}

code_btn.onclick = valide;