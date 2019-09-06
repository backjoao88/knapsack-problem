const MAX_KNAPSACK_CAPACITY = 50;
const MAX_CHROMOSOMES = 10;
const MAX_GENERATIONS = 100;

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

];

let generateChromosome = () => {
    let chromosome = [];
    for (let i = 0; i < global_items.length; i++) {
        chromosome[i] = parseInt((Math.random()) * 2);
    }
    return chromosome;
}

let initialize = () => {
    let population = [];

    for (let i = 0; i < MAX_CHROMOSOMES; i++) {
        population[i] = {
            chromosome: generateChromosome(),
            totalProfit: 0
        }
    }
    return population;
}

let evaluate = (population) => {
    let sum = 0;
    for (let i = 0; i < population.length; i++) {
        for (let j = 0; j < population[i].chromosome.length; j++) {
            if (population[i].chromosome[j] == 1) {
                sum += global_items[j].profit;
            }
        }
        population[i].totalProfit = sum;
        sum = 0;
    }

    return population;

}

let selectParents = (population) => {
    let totalSumProfit = 0;
    for (let i = 0; i < population.length; i++) {
        totalSumProfit += population[i].totalProfit;
    }

    let randomIndex = parseInt(Math.random() * totalSumProfit);
    let i = 0;
    let partialTotal = 0;
    do {

    } while (partialTotal > randomIndex);
}


function main() {
    let t = 0;
    let population = initialize();
    population = evaluate(population);
    console.log(selectParents2(population))
    console.log(selectParents(population));

}

main()