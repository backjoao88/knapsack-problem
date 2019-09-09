const MAX_KNAPSACK_CAPACITY = 35;
const MAX_CHROMOSOMES = 10;
const MAX_GENERATIONS = 100;
const MUTATION_PROB = 0.5;

const global_items = [{
        name: 'Hamburguer',
        weight: 2,
        profit: 5
    },
    {
        name: 'Casaco',
        weight: 3,
        profit: 6
    },
    {
        name: 'Martelo',
        weight: 10,
        profit: 2
    },
    {
        name: 'Prego',
        weight: 5,
        profit: 2
    },
    {
        name: 'Limao',
        weight: 4,
        profit: 8
    },
    {
        name: 'Maça',
        weight: 6,
        profit: 2
    },
    {
        name: 'Maça',
        weight: 6,
        profit: 2
    },
    {
        name: 'Vassoura',
        weight: 2,
        profit: 2
    },
    {
        name: 'Pá',
        weight: 12,
        profit: 15
    },
    {
        name: 'Caneta',
        weight: 2,
        profit: 1
    },

];

function fitness(chromosome) {
    total_value = 0
    total_weight = 0
    index = 0
    for (let i = 0; i < chromosome.length; i++) {
        if (index > global_items.length)
            break
        if (chromosome[i] == 1) {
            total_value += global_items[index].profit
            total_weight += global_items[index].weight
        }
        index += 1
    }

    if (total_weight > MAX_KNAPSACK_CAPACITY)
        return 0
    else
        return total_value
}

function initializePopulation() {
    let population = [];
    for (let i = 0; i < MAX_CHROMOSOMES; i++) {
        population[i] = initializeIndividual()
    }
    return population;
}

function initializeIndividual() {
    let chromosome = [];
    for (let i = 0; i < MAX_CHROMOSOMES; i++) {
        chromosome[i] = parseInt((Math.random()) * 2);
    }
    return chromosome;
}

function mutate(individual) {
    /*
    Changes a random element of the permutation array from 0 - > 1 or from 1 - > 0. ""
    */
    let r = parseInt((Math.random()) * 2);
    if (individual[r] == 1) {
        individual[r] = 0
    } else {
        individual[r] = 1
    }

    return individual
}

function crossover(male, female) {
    let crossOverPoint = parseInt(Math.random() * (MAX_CHROMOSOMES - 2)) + 1;
    let child = []

    // filho 1 = primeira metade do pai e segunda metade da mãe
    // filho 2 = primeira metade da mae e segunda metade do pai

    for (let i = 0; i < crossOverPoint; i++) {
        child.push(male[i])
    }

    for (let i = crossOverPoint; i < MAX_CHROMOSOMES; i++) {
        child.push(female[i])
    }

    return child;

}


function evaluatePopulation(population) {

    /* Parents selection */

    let newPop = [];

    newPop.push(population[population.length - 1].chromosome)
    newPop.push(population[population.length - 2].chromosome)

    /* Breeding */

    let children = [];
    let desired_length = population.length - newPop.length;
    // console.log("Pop length #" + population.length)
    // console.log("NewPop length #" + newPop.length)
    // console.log("Desired length #" + desired_length)
    while (children.length < desired_length) {
        father = newPop[0];
        mother = newPop[1];
        // console.log("Father #" + children.length)
        // console.log(father)
        // console.log("Mother #" + children.length)
        //  console.log(mother)
        child = crossover(father, mother);
        // console.log("Child #" + children.length)
        // console.log(child)
        if (MUTATION_PROB > parseInt(Math.random() * 1)) {
            child = mutate(child)
        }

        children.push(child)
    }

    newPop.push(...children)

    return newPop;
}

function sorted(population) {
    function compare(a, b) {
        valueA = fitness(a);
        valueB = fitness(b);

        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    }

    let sorted = [];

    population.sort(compare)

    for (let i = 0; i < population.length; i++) {
        sorted.push({
            fitness: fitness(population[i]),
            chromosome: population[i]
        });
    }

    return sorted;
}


function main() {

    let i = 0;

    let population = initializePopulation();

    console.log("### Initial Generation ###")
    console.log(population)
    while (i < MAX_GENERATIONS) {
        let sort = sorted(population)
        population = evaluatePopulation(sort);
        //console.log("### Generation " + i + " ###");
        //console.log(population)
        i = i + 1;
    }

    console.log("### Final Generation ###");
    console.log(population)


}

main();