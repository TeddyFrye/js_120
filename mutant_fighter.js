const p = console.log;
let readline = require("readline-sync");

class Mutant {
  constructor(name, power, attack, heal, mutate, health, group, ascii) {
    this.name = name;
    this.power = power;
    this.attack = attack;
    this.heal = heal;
    this.mutate = mutate;
    this.health = health;
    this.maxHealth = health;
    this.group = group;
    this.ascii = ascii;
  }

  isMutate() {
    return this.mutate;
  }

  useAttack(toMutant) {
    toMutant.health -= this.attack;
    p(
      `${this.name} attacks with their ${this.power}, ${toMutant.name}'s health is now ${toMutant.health}.`
    );
  }

  checkMaxHealth(toMutant) {
    const newHealth = toMutant.health + this.heal;
    return newHealth <= toMutant.maxHealth;
  }

  useHeal(toMutant) {
    if (this.checkMaxHealth(toMutant)) {
      toMutant.health += this.heal;
      p(
        `${this.name} heals, ${toMutant.name}'s health is now ${toMutant.health}.`
      );
    } else {
      toMutant.health = toMutant.maxHealth;
      p(`${toMutant.name}'s health is now at max, ${toMutant.health}.`);
    }
  }

  checkDNA() {
    this.mutate
      ? p(`${this.name} is not a real mutant, they were made.`)
      : p(`${this.name} was born with the X-Gene.`);
  }

  useCombo(withMutant, toMutant) {
    // Check if partner mutant is from a different group
    if (this.group !== withMutant.group) {
      p(
        `${this.name} and ${withMutant.name} don't work well together because they are from different groups.`
      );
      return; // Stop further execution if they are from different groups
    }

    // Check if the target mutant is from the same group
    if (this.group === toMutant.group) {
      p(`No in-fighting right now among the ${this.group}.`);
      return; // Stop further execution if trying to attack one's own group member
    }

    // If the above checks pass, perform the combo attack
    toMutant.health -= this.attack + withMutant.attack;
    p(
      `${this.name} and ${withMutant.name} perform a combo attack. ${toMutant.name}'s health is now ${toMutant.health}.`
    );
  }
}

class worldThreat {
  constructor(name, health, damage) {
    this.name = name;
    this.health = health;
    this.damage = damage;
  }

  threatenMutants(toMutant) {
    toMutant.mutate
      ? p(`Mutates are safe from ${this.name}.`)
      : ((toMutant.health -= this.damage),
        p(
          `${this.name} ravages ${toMutant.name}, leaving them at ${toMutant.health}`
        ));
  }
}

let copyPower = function (toMutant) {
  this.power = toMutant.power;
  this.attack = toMutant.attack;
  this.heal = toMutant.heal;
  p(`${this.name} copies ${toMutant.name}'s abilities.`);
};

let cyclops = new Mutant(
  `Cyclops`,
  `optic blasts`,
  5,
  0,
  false,
  10,
  `X-Men`,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠤⠶⠒⠒⠒⠦⣤⠦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡤⠋⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠻⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠓⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⡀⢀⢼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢺⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣬⡥⠂⠀⠀⠀⣀⣤⠤⢤⣴⣶⡆⠀⠀⠀⠀⢸⡷⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢠⢿⠿⠛⠛⠛⠛⠙⠛⠛⠛⠿⠿⢿⡿⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⣿⣀⣀⣀⣀⣀⣀⣀⣀⣤⣀⣤⣾⡟⠀⠀⠀⠀⢩⠇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠽⠿⠿⣿⡿⠿⠾⠾⠿⠛⠓⠛⠉⠄⠀⠀⠀⠀⡸⡆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣃⣀⣀⠀⠀⠀⠀⠀⠀⠀⢐⠀⠀⠀⠀⡄⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⠛⢋⠉⠁⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⢰⢻⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⣦⣤⡤⠶⠶⠀⠀⠀⠀⢸⠀⠀⠀⣼⡟⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⠃⠀⠀⠀⠀⢀⣠⡶⠛⠜⠀⠀⢰⣿⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠿⣶⣶⣶⡾⠟⠉⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`
);
let wolverine = new Mutant(
  `Wolverine`,
  `adamantium claws`,
  4,
  4,
  false,
  15,
  `X-Men`,
  `
	⢰⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡆
	⢸⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡇
	⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿
	⣿⣿⣿⣧⠀⠀⠀⠀⠀⣀⠤⠔⠒⠒⠀⠀⠒⠒⠢⠤⣀⠀⠀⠀⠀⠀⣼⣿⣿⣿
	⣿⣿⣿⣿⣧⠀⢀⠔⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠢⣀⠀⣰⣿⣿⣿⣿
	⣿⣿⣿⣿⣿⣆⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣰⣿⣿⣿⣿⣿
	⢻⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⡿
	⢸⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⡇
	⠀⢿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⡿⠀
	⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀
	⠀⠀⠘⣿⣿⣿⣿⣿⡿⠿⢿⣿⣦⡄⠀⠀⢠⣴⣿⡿⠿⢿⣿⣿⣿⣿⣿⠃⠀⠀
	⠀⠀⠀⠸⣿⣿⣿⣿⣿⣶⣤⣬⣿⡇⠀⠀⢈⣿⣥⣤⣶⣿⣿⣿⣿⣿⠏⠀⠀⠀
	⠀⠀⠀⠀⢻⣿⣟⠛⠻⠿⣿⣿⣿⣧⠀⠀⣼⣿⣿⣿⠿⠟⠛⣻⣿⡟⠀⠀⠀⠀
	⠀⠀⠀⠀⠘⣿⣿⡆⠀⠀⠀⠉⠻⣿⠀⠀⣿⠟⠉⠀⠀⠀⢠⣿⣿⠇⠀⠀⠀⠀
	⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠈⠀⠀⠁⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀
	⠀⠀⠀⠀⠀⠹⣿⣿⡆⠀⠀⠀⣤⣤⣤⣤⣤⣤⠀⠀⠀⢠⣿⣿⠏⠀⠀⠀⠀⠀
	⠀⠀⠀⠀⠀⠀⠘⢿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡿⠃⠀⠀⠀⠀⠀⠀
	⠀⠀⠀⠀⠀⠀⠀⠀⠹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠟⠀⠀⠀⠀⠀⠀⠀⠀
	⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠤⣀⣀⣀⣀⣀⣀⠤⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`
);
let morph = new Mutant(
  `Morph`,
  `kung-fu`,
  2,
  1,
  false,
  8,
  `X-Men`,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣒⡻⠛⠉⠉⠉⠓⠛⠳⠿⣶⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠠⣫⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢝⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡖⠀⠀⢀⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡇⠀⣰⠟⠀⠀⠈⢳⡄⠀⠀⢴⠿⠛⠻⣦⡀⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡇⠀⣿⠀⠀⠀⢀⣼⠁⠀⠀⣿⠀⠀⠀⣿⠇⣇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⡇⢠⡘⠦⣤⡖⠟⠁⠀⠀⠀⠻⣧⣴⣿⢟⠎⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠸⡀⠀⠉⠒⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⡷⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⢳⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢣⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⣀⣠⡶⠀⠀⢸⡏⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠘⡄⠀⠀⠀⠈⠉⠒⠢⠟⠓⢩⡿⠁⠀⠀⡜⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠹⡄⠀⠀⠀⣀⠀⠀⠀⣠⠗⠁⠀⣠⠎⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⠄⠙⡆⠀⠀⠈⢧⣠⠜⠃⠀⠠⠺⠥⠒⠋⢸⠤⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⠆⠀⠀⠈⢢⡀⠀⠀⠀⠀⡠⠊⠁⠀⠀⠀⠀⠘⡆⠈⠂⢀⠀⠀⠀⠀
⠀⢀⠤⣆⠀⠀⠀⠀⠀⠉⠉⡭⡉⢯⡁⠀⠀⠀⢀⡠⠚⠉⠁⠀⠀⠀⠈⠀⡄⠀
⠐⠀⠀⠈⠉⠢⣄⠀⠀⠀⡄⠀⠇⠀⠹⣀⢀⠔⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠓⠎⠀⠀⠇⠀⠀⠘⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀
`
);
morph.copyPower = copyPower.bind(morph);
let magneto = new Mutant(
  `Magneto`,
  `magnetism`,
  7,
  2,
  false,
  20,
  `Brotherhood`,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⠤⠔⠶⠖⠒⠶⠦⣤⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣾⠽⠽⠚⠁⠐⠀⠀⠉⠁⠀⠀⠙⣷⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣰⠏⠀⠀⢀⢀⠀⠀⠀⠀⠀⠀⢠⡄⠀⠀⠑⣿⡢⠄⠀⠀⠀⠀⠀⠀
⠀⠀⡠⢏⠇⠀⠀⠀⠀⠻⣦⠀⠀⠀⠀⢠⣿⠁⠀⠀⠀⠘⢱⡀⡀⠀⠀⠀⠀⠀
⠀⢰⢹⡎⠀⠀⠀⠀⠀⠀⢹⡇⠀⠀⢰⡿⠀⠀⠀⠀⠀⠀⠱⢧⡆⠀⠀⠀⠀⠀
⠀⢰⡸⠀⠀⢠⠤⢦⣆⡦⡀⣿⡀⠀⣟⣿⠟⠛⠻⣦⠀⠀⠀⠘⢧⠀⠀⠀⠀⠀
⠀⣾⠁⠀⠀⣿⡿⠋⠉⠉⠛⡾⠃⠀⣿⠁⠀⠀⠀⠘⡇⠀⠀⠀⣽⠀⠀⠀⠀⠀
⠀⣻⠀⠀⠀⣽⣇⠀⠀⠀⠀⠁⠀⠀⡏⠀⠀⠀⠀⢀⢻⠀⠀⠀⣿⠀⠀⠀⠀⠀
⠀⡿⠀⠀⠀⢻⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢪⠏⠀⠀⠘⣻⠀⠀⠀⠀⠀
⠀⡇⠀⠀⠀⠀⠻⢮⣢⣶⠆⠀⠀⠀⠀⡀⣀⣴⣴⠏⠀⠀⠀⠀⢽⠀⠀⠀⠀⠀
⠀⡇⠀⠀⠀⠀⠀⠀⢹⣯⡆⠀⠀⠀⣀⠋⠛⠛⠁⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀
⠀⡇⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⢜⡆⠀⠀⠀⠀⠀⠀⠀⢀⢿⠀⠀⠀⠀⠀
⢠⣇⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠘⡞⣠⠄⠀⠀⠀
⠀⠻⣆⠀⠀⠀⠀⠀⠀⣽⡇⠀⠀⠀⠸⡇⠀⠀⠀⠀⠀⢀⡤⣪⡿⠋⠀⠀⠀⠀
⠀⠀⠈⠳⡀⠀⠀⠀⠀⡟⣷⠀⠀⠀⠀⡇⠀⠀⠀⡀⣠⠾⠛⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠰⠽⡄⠀⠀⢀⣧⡏⠀⠀⠀⠀⡇⠀⣀⠶⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⠢⣄⡸⢿⡇⠀⠀⠀⠀⣧⡞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠡⢨⠇⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`
);
let deadpool = new Mutant(
  `Deadpool`,
  `katanas`,
  3,
  3,
  true,
  12,
  `X-Force`,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡾⠛⠉⠉⠉⠉⠋⠛⠶⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⡲⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣴⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢯⢣⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠏⠀⠀⢀⣴⣶⡶⡀⠀⠀⠀⣠⢤⢄⠀⠀⠀⠸⣯⡆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢿⡇⠀⠀⢸⣻⡴⢮⣿⠀⠀⢰⣿⡿⣎⡇⠀⠀⠘⣿⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣽⠃⠀⠀⢸⣟⠉⠉⢿⡇⠀⢸⡯⠟⢻⣇⠀⠀⠀⣽⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣟⣲⠀⠀⢸⡞⠀⠀⢸⡇⠀⢸⡇⠀⢸⣿⠀⠀⣼⣷⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡋⣾⠀⠀⢸⣿⢀⢠⣷⡅⠀⢨⡷⠤⣾⠃⠀⠀⣻⣏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠐⢽⠀⠀⠘⣿⣾⣗⣿⡁⠀⢸⣿⣼⢻⡆⠀⢰⡾⢃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠾⠅⠀⠀⢿⢿⣿⣿⠁⠀⢸⢸⢃⡞⠀⠀⢸⡧⠈⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⣆⠀⠀⠠⠑⢭⠞⠀⠀⠀⠫⠋⠀⠀⠀⡸⢂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡏⠂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⠳⣄⠀⠀⠀⠀⠀⠀⠀⢀⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣤⡀⠀⢀⣠⡾⠝⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⡙⠙⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`
);
let mystique = new Mutant(
  `Mystique`,
  `kung-fu`,
  4,
  2,
  false,
  9,
  `Brotherhood`,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⢒⢶⣦⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣰⣾⣿⠿⣘⠴⣔⠐⠤⢽⢛⢦⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣴⣟⣿⠟⠉⢰⠃⠀⣸⠈⠳⣌⢑⡜⡝⡵⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣾⣿⢟⡽⠀⠀⠸⠤⡏⠁⠀⠀⠈⠙⣾⡮⡸⡿⡑⠄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⡼⢳⡷⡎⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠨⢦⣿⡇⢻⣎⡆⠀⠀⠀⠀⠀
⠀⠀⠠⣿⡃⡗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡓⣓⣂⡸⣾⡀⠀⠀⠀⠀⠀
⠀⠀⢌⡟⠾⠉⠀⠎⠉⠉⢳⠀⠀⡖⠋⠉⢹⠀⠀⢙⣵⢮⠀⡽⡇⠀⠀⠀⠀⠀
⠀⠀⠷⣿⢰⠀⠀⢧⣀⠀⣸⡀⠀⠸⣄⡠⠇⠀⠀⢨⠻⡐⣟⡃⣇⠀⠀⠀⠀⠀
⠀⠀⣽⣞⡏⠀⠀⠀⠈⠉⢰⠁⠀⠀⠀⠀⠀⠀⠀⢸⡻⡴⣕⠅⢷⠄⠀⠀⠀⠀
⠀⠀⣾⣣⠂⠀⠀⠀⠀⠀⠧⠤⠄⠀⠀⠀⠀⠀⠀⢸⠛⢟⠷⡀⣿⡷⠀⠀⠀⠀
⠀⠀⡟⡟⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠐⡆⢹⠾⡄⡞⠃⠀⠀⠀⠀
⠀⠀⠩⣏⢀⢼⠀⠀⠀⠀⢀⣤⡽⠛⠉⠁⠀⠀⢀⣾⡇⣸⢸⡯⡇⠀⠀⠀⠀⠀
⠀⠀⠈⠟⠀⠈⣧⡀⠀⠀⠸⠁⠀⠀⠀⠀⠀⣀⣾⠋⡇⢽⡯⢿⡇⠀⠀⠀⠀⠀
⠀⠀⠔⠍⠠⠀⠸⣗⡀⠀⠀⠀⠀⠀⠀⢠⡞⡕⠀⠀⡆⠩⣘⡼⡇⠀⠀⠀⠀⠀
⠀⠀⢈⠃⠈⠀⠀⠙⢯⣀⠀⠀⠀⢴⢞⣅⠖⠀⠀⠀⣻⢪⠂⢄⠇⠀⠀⠀⠀⠀
⠀⠀⠠⡇⠀⠀⠀⠀⠀⠙⠷⠤⠎⠋⠉⠀⠀⠀⠀⠀⠋⣺⠁⢀⡁⠀⠀⠀⠀⠀
⠀⠀⠀⠢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠑⠂⡇⠀⠀⠀⠀⠀
⠀⠀⠁⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⡀⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀
`
);
mystique.copyPower = copyPower.bind(mystique);
let legacyVirus = new worldThreat(`The Legacy Virus`, 15, 10);

class Combatant {
  constructor(characters) {
    this.fighter = null;
    this.characters = characters;
  }
  chooseFighter(mutant) {
    this.fighter = mutant;
    p(`${this.fighter.name} jumps into battle!`);
    p(
      `Stats - Power: ${this.fighter.power}, Attack: ${this.fighter.attack}, Heal: ${this.fighter.heal}, Health: ${this.fighter.health}`
    );
  }

  attack(target) {
    if (this.fighter) {
      this.fighter.useAttack(target);
    } else {
      p("No fighter selected!");
    }
  }

  heal() {
    if (this.fighter) {
      this.fighter.useHeal(this.fighter);
    } else {
      p("No fighter selected!");
    }
  }

  combo(target) {
    const partnerPrompt = "Who are you working with?";
    let partnerName = readline.question(partnerPrompt).toLowerCase();
    let partnerMutant = this.characters.find(
      (m) => m.name.toLowerCase() === partnerName
    );

    if (!partnerMutant) {
      p("Invalid partner name. Try again.");
      return;
    }

    if (this.fighter && target && target.fighter) {
      this.fighter.useCombo(partnerMutant, target.fighter);
    } else {
      p("Combo move is not available due to missing fighters!");
    }
  }
}

class Player extends Combatant {
  constructor(characters) {
    super(characters);
  }
}

class Computer extends Combatant {
  constructor(characters) {
    super(characters);
    this.difficulty = "normal";
  }

  decideMove(opponent) {
    if (!this.fighter) {
      p("Computer has no fighter to make a move.");
      return;
    }
    if (!opponent || !opponent.fighter) {
      p("Error: Opponent or opponent's fighter is undefined.");
      return;
    }

    let randomDecision = Math.random();
    if (randomDecision < 0.5) {
      p("Computer decides to attack.");
      this.attack(opponent.fighter);
    } else {
      p("Computer decides to heal.");
      this.heal();
    }
  }

  heal() {
    if (this.fighter && this.fighter.health < this.fighter.maxHealth) {
      super.heal();
    } else {
      p("Computer's fighter is already at maximum health.");
    }
  }
}

class fightingGame {
  constructor() {
    this.characters = [wolverine, cyclops, morph, deadpool, magneto, mystique];
    this.player = new Player(this.characters);
    this.computer = new Computer(this.characters);
  }

  play() {
    this.displayWelcomeMessage();
    this.characterSelect();
    while (true) {
      this.playerMove();
      if (this.gameOver()) break;
      this.computerMove();
      if (this.gameOver()) break;
    }
    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    p(`Welcome to Mutant Fighter!`);
    console.log(`
		⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
		⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿⣆⠀⠀⣠⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
		⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣦⣴⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
		⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⢀⣴⣶⣶⣶⠀⠀⠀⢠⣶⣶⣶⣶⠀⣤⣶⣶⣶⣶⣶⣶⣶⣶⣶⠀⣶⣶⣶⡀⠀⠀⢰⣶⣶⡆
		⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⠀⠀⣰⣿⣿⣿⣿⣿⢸⣿⣿⣿⡿⠛⠛⠛⠛⠛⠛⠀⣿⣿⣿⣿⣄⠀⢸⣿⣿⡇
		⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣻⣿⣿⣿⣿⣿⣿⣿⢁⣼⣿⣿⠃⣠⣿⣿⣿⣿⣿⣿⢀⣼⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣷⣶⣶⣶⣶⣶⡆⠀⣿⣿⣿⣿⣿⣦⢸⣿⣿⡇
		⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠁⣴⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⡿⢿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
		⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣀⣼⣿⣿⣿⠟⠁⣿⣿⣿⣿⣿⡟⠁⢸⣿⣿⣿⢸⣿⣿⣿⣆⣀⣀⣀⣀⣀⣀⠀⣿⣿⣿⡇⠙⣿⣿⣿⣿⡇
		⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⣿⣿⣿⣿⠏⠀⠀⢸⣿⣿⣿⠘⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⡇⠀⠈⠻⣿⣿⡇
		⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⡟⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁
		⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
		⠀⠀⢀⣼⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
		⠀⢠⣾⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
		⣠⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`);
  }

  characterSelect() {
    const prompt = `Choose Your Fighter:\n${this.characters
      .map((char, index) => `${index + 1}. ${char.name}`)
      .join("\n")}\n`;
    let index = parseInt(readline.question(prompt)) - 1;
    if (index >= 0 && index < this.characters.length) {
      this.player.chooseFighter(this.characters[index]);
      let compOptions = this.characters.filter((_, i) => i !== index);
      this.computer.chooseFighter(
        compOptions[Math.floor(Math.random() * compOptions.length)]
      );
    } else {
      p("Invalid choice, please try again.");
      this.characterSelect();
    }
  }

  displayGoodbyeMessage() {
    p("Would you like to play again? (yes/no)");
    const choice = readline.question().toLowerCase();
    if (choice === "yes") {
      this.resetGame();
      this.play();
    } else {
      p("Thanks for playing Mutant Fighter. Goodbye!");
    }
  }

  resetGame() {
    this.player.fighter.health = this.player.fighter.maxHealth;
    this.computer.fighter.health = this.computer.fighter.maxHealth;
  }

  displayResults() {
    if (this.player.fighter.health > 0) {
      p(this.player.fighter.ascii);
      p(`\nYou win!`);
    } else {
      p(this.computer.fighter.ascii);
      p(`/nYou lose!`);
    }
  }

  playerMove() {
    const movePrompt = `Choose your Move: Attack, Heal, Combo\n`;
    let choice = readline.question(movePrompt).toLowerCase();
    switch (choice) {
      case "attack":
        this.player.attack(this.computer.fighter);
        break;
      case "heal":
        this.player.heal();
        break;
      case "combo":
        this.player.combo(this.computer);
        break;
      default:
        p(`Invalid move. Try again`);
        this.playerMove();
        break;
    }
  }

  computerMove() {
    this.computer.decideMove(this.player);
  }

  gameOver() {
    if (this.player.fighter.health <= 0 || this.computer.fighter.health <= 0)
      return true;
    else {
      return false;
    }
  }
}

let game = new fightingGame();
game.play();
