const MAX_KNAPSACK_CAPACITY = 50;

const global_items = [
    {
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


// Individual
class Knapsack{
    constructor(items, chromosome){
        this.chromosome = [];
        this.generateChromosome()
    }

    generateChromosome(){
        for(let i = 0; i < global_items.length; i++){
            this.chromosome[i] = parseInt((Math.random()) * 2);    
        }
    }
}

knapsack = new Knapsack();
console.log(knapsack.chromosome);
