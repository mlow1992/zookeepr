const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers");
const { zookeepers } = require('../data/zookeepers');

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "jhgdja3ng2" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Erica",
            age: 37,
            favoriteAnimal: "cheetah",
        },
        {
            id: "4",
            name: "Dave",
            age: 23,
            favoriteAnimal: "whale shark",
        },
    ];

    const updatedZookeepers = filterByQuery({ favoriteAnimal: "cheetah" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Erica",
            age: 37,
            favoriteAnimal: "cheetah",
        },
        {
            id: "4",
            name: "Dave",
            age: 23,
            favoriteAnimal: "whale shark",
        },
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Erica");
});

test("validates personality traits", () => {
    const zookeeper = {
        id: "3",
        name: "Erica",
        age: 37,
        favoriteAnimal: "cheetah",
    };

    const invalidZookeeper = {
        id: "3",
        name: "Erica",
        age: 37,
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});