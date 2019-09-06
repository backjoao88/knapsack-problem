const MAX_KNAPSACK_CAPACITY = 50;
const MAX_CHROMOSOMES = 10;

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
let getTotalProfitSumOfPopulation = (population) => {
    let sum = 0;
    for (let i = 0; i < population.length; i++) {
        sum += population[i].totalProfit;
    }
    return sum
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

    population.sort((a,b) => {
        return a.totalProfit < b.totalProfit ? -1 : a.totalProfit > b.totalProfit ? 1 : 0;
    })

    let totalSum = getTotalProfitSumOfPopulation(population);
    
    let partialTotal = 0;

    let newPop = [];

    let rand = parseInt(Math.random() * totalSum);
    for (let i = 0; i < MAX_CHROMOSOMES; i++){
        partialTotal += population[i].totalProfit;
        if(partialTotal >= rand){
            return population[i]
        }
    }
}


function main() {
    let t = 0;
    let population = initialize();
    console.log(population)
    for(let i = 0; i < MAX_CHROMOSOMES; i++){
        chromo = evaluate(population)
        console.log(chromo)
    }


}

main()