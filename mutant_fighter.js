const p = console.log;

class Mutant {
  constructor(name, power, attack, heal, mutate, health, group) {
    this.name = name;
    this.power = power;
    this.attack = attack;
    this.heal = heal;
    this.mutate = mutate;
    this.health = health;
    this.maxHealth = health;
    this.group = group;
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
    this.checkMaxHealth(toMutant)
      ? ((toMutant.health += this.heal),
        p(
          `${this.name} heals, ${toMutant.name}'s health is now ${toMutant.health}.`
        ))
      : ((toMutant.health = toMutant.maxHealth),
        p(`${toMutant.name}'s health is now at max, ${toMutant.health}.`));
  }

  checkDNA() {
    this.mutate
      ? p(`${this.name} is not a real mutant, they were made.`)
      : p(`${this.name} was born with the X-Gene.`);
  }

  useCombo(withMutant, toMutant) {
    if (this.group === withMutant.group) {
      toMutant.health -= this.attack + withMutant.attack;
      p(
        `${this.name} and ${withMutant.name} fight together.${toMutant.name}'s health is now ${toMutant.health}.`
      );
    } else if (this.group === toMutant.group) {
      p(`No in-fighting right now among the ${this.group}.`);
    } else {
      p(`${this.name} and ${withMutant.name} don't work well together.`);
    }
  }
}

class Xmen extends Mutant {
  constructor(name, power, attack, heal, mutate, health, group) {
    super(name, power, attack, heal, mutate, health);
    this.group = group;
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

let cyclops = new Mutant(`Cyclops`, `optic blasts`, 5, 0, false, 10, `X-Men`);
let wolverine = new Mutant(
  `Wolverine`,
  `adamantium claws`,
  4,
  4,
  false,
  15,
  `X-Men`
);
let magneto = new Mutant(
  `Magneto`,
  `magnetism`,
  7,
  2,
  false,
  20,
  `Brotherhood`
);
let deadpool = new Mutant(`Deadpool`, `katanas`, 3, 3, true, 12, `X-Force`);
let morph = new Mutant(`Morph`, `kung-fu`, 2, 1, false, 8, `X-Men`);
morph.copyPower = copyPower.bind(morph);
let mystique = new Mutant(`Mystique`, `kung-fu`, 4, 2, false, 9, `Brotherhood`);
mystique.copyPower = copyPower.bind(mystique);
let legacyVirus = new worldThreat(`The Legacy Virus`, 15, 10);

morph.useAttack(deadpool);
morph.copyPower(wolverine);
deadpool.useHeal(deadpool);
morph.useAttack(deadpool);

p();
mystique.useAttack(wolverine);
mystique.copyPower(cyclops);
wolverine.useHeal(wolverine);
mystique.useAttack(wolverine);
p();
deadpool.useHeal(deadpool);
morph.copyPower(magneto);
morph.useAttack(deadpool);
deadpool.useHeal(deadpool);
morph.copyPower(wolverine);
morph.useCombo(wolverine, deadpool);
