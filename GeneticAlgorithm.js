
/*
    Solução para o Problema da Mochila 0-1.
    Disciplina: IA
    Aluno: João Paulo Back.
*/


/* Lista de itens a serem colocados na mochila */

const globalItems = [
    {
        name: 'Item01',
        weight: 12,
        profit: 4
    },
    {
        name: 'Item02',
        weight: 10,
        profit: 14
    },
    {
        name: 'Item03',
        weight: 08,
        profit: 10
    },
    {
        name: 'Item04',
        weight: 10,
        profit: 12
    },
    {
        name: 'Item05',
        weight: 13,
        profit: 10
    },
    {
        name: 'Item06',
        weight: 05,
        profit: 10
    },
    {
        name: 'Item07',
        weight: 18,
        profit: 12
    },
    {
        name: 'Item08',
        weight: 03,
        profit: 15
    },
    {
        name: 'Item09',
        weight: 12,
        profit: 12
    },
    {
        name: 'Item10',
        weight: 09,
        profit: 02
    }

];


/* Constante que define a capacidade máxima da mochila */
const MAX_KNAPSACK_CAPACITY = 10 * (globalItems.length);
/* Constante que define o número máximo de cromossomos de um indivíduo */
const MAX_CHROMOSOMES = 10;
/* Número máximo de gerações a serem atingidas */
const MAX_GENERATIONS = 100;
/* Valor de mutação */
const MUTATION_PROB = 0.08;


/* Função que define a avaliação de fitness 
*   Percorre todo o cromossomo, caso o valor do gene na posição i
*   seja 1, o seu valor de fitness e o valor de peso é somado ao total de valor e de peso,
*   respectivamente. 
*   Ao percorrer todo o cromossomo, é verificado se o peso total dos
*   genes (itens) do cromossomo não ultrapassou o limite máximo da mochila, caso ultrapassou
*   o fitness desse cromossomo é 0, caso não, o fitness desse cromossomo é igual a soma do valor
*   de todos os genes que possuem valor 1.
*
*/

function fitness(chromosome) {
    total_value = 0
    total_weight = 0
    index = 0
    for (let i = 0; i < chromosome.length; i++) {
        if (index > globalItems.length)
            break
        if (chromosome[i] == 1) {
            total_value += globalItems[index].profit
            total_weight += globalItems[index].weight
        }
        index += 1
    }

    if (total_weight > MAX_KNAPSACK_CAPACITY)
        return 0
    else
        return total_value
}

/* Função que define uma população aleatória com base na função que 
* cria um cromossomo aleatório */

function initializePopulation() {
    let population = [];
    for (let i = 0; i < MAX_CHROMOSOMES; i++) {
        population[i] = initializeIndividual()
    }
    return population;
}

/* Função que cria um cromossomo aleatório */

function initializeIndividual() {
    let chromosome = [];
    for (let i = 0; i < MAX_CHROMOSOMES; i++) {
        chromosome[i] = parseInt((Math.random()) * 2);
    }
    return chromosome;
}

/* 
*  Função que realiza a mutação de um cromossomo 
*   É gerado um número randômico entre 0 e o número total de itens globais
*   para determinar a onde será realizado a mutação.
*   O índice escolhido tem seu valor trocado: Caso seja 0, muda para 1. 
*   Caso seja 1, muda para 0.
*/

function mutate(individual) {
    let r = parseInt((Math.random()) * globalItems.length-1);
    if (individual[r] == 1) {
        individual[r] = 0
    } else {
        individual[r] = 1
    }

    return individual
}

/* 
*  Função que realiza o crossover de um cromossomo 
*   Para realizar o cruzamento, são recebidos como parâmetro dois cromossomos.
*   Primeiramente, é gerado randomicamente o ponto de crossover, que deve estar entre
*   1 e o penúltimo índice do cromossomo.
*   Depois, é percorrido da posição 0 até o ponto de crossover no cromossomo macho, 
*   e adicionando os valores ao novo cromossomo.
*   Por último, é percorrido do ponto de crossover até o valor maximo de cromossomos no
*   cromossomo fêmea, e adicionando os valores ao novo cromossomo.
*  
*/

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

/* Função que realizar a evolução da população 
*   Como parâmetro, é recebido uma população ordenada pelo valor de fitness.
*   No início, são adicionados o primeiro e o segundo cromossomo na nova população,
*   que são os cromossomos com o melhor valor de fitness da população recebida.
*   Em seguida, é criado a população de cromossomos filhos, e determinado qual será o 
*   tamanho dessa população (desired_length), no caso sempre será o tamanho da população recebida,
*   menos o tamanho do vetor dos pais (2).
*   Assim, para cada novo cromossomo que surge, ele passa pelo processo de crossover e talvez
*   pelo processo de mutação.
*   Ao fim, o cromossomo é adicionado a um vetor de filhos, e ao final do loop, o vetor de
*   filhos é adicionado a nova população.
*/


function evaluatePopulation(population) {

    /* Seleção dos pais com o melhor valor de fitness */

    let newPop = [];

    newPop.push(population[population.length - 1].chromosome)
    newPop.push(population[population.length - 2].chromosome)

    /* Geração dos filhos (realizar o 'breeding') */

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

/* Função que recebe uma população como parâmetro e retorna uma nova população
ordenada pelo valor de fitness de cada cromossomo */

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

/* Função main, responsável por inicializar a população e realizar o controle das gerações. */

function main() {

    let i = 0;

    let population = initializePopulation();

    console.log("### Initial Generation ###")
    console.log(sorted(population))
    while (i < MAX_GENERATIONS) {
        let sort = sorted(population)
        population = evaluatePopulation(sort);
        console.log("### Generation " + i + " ###");
        console.log(sorted(population))
        i = i + 1;
    }

    let lastItemIndex = population.length-1;

    console.log("### Final Generation ###");

    console.log(sorted(population))

    console.log("### Solution Found ###");

    console.log(population[lastItemIndex])

    // console.log("### Statistics ###")

    // console.log("# Max Knapsack Capacity -> " + MAX_KNAPSACK_CAPACITY)

    // console.log("## ITENS ##")

    // for (let i = 0; i < 10; i++) {
    //     if (population[lastItemIndex][i] == 1) {
    //         console.log("\rIndex #" + i + ": ");
    //         console.log(globalItems[i])
    //     }
    // }

}

main();