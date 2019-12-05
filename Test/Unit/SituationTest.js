const expect = require('chai').expect;
const SituationService = require('../../App/Services/Situation/SituationService');
const faker = require('faker');

let situation = null;
let stepId = null;
let descriptionId = null;

describe('Situation', () => {
    // it('Create', async () => {

    //     const ObjectId = require('mongodb').ObjectID;
    //     stepId = new ObjectId();
    //     descriptionId = new ObjectId();
    //     const mock = {
    //         title: faker.name.title(),
    //         "description": faker.name.jobDescriptor(),
    //         "author": new ObjectId("5c183fa6d8b1b66fd8768294"),
    //         "type": faker.helpers.randomize(['interview', 'daily-situation']),
    //         "category": [
    //             faker.random.word(),
    //             faker.random.word()
    //         ],
    //         "rating": faker.random.number({min: 0, max: 5}),
    //         "steps": [
    //             {
    //                 _id: stepId,
    //                 "order": 1,
    //                 "descriptions": [{
    //                     _id: descriptionId,
    //                     "type": "default",
    //                     "text": faker.lorem.text()
    //                 }],
    //                 "possibleAnswers": [
    //                     "default"
    //                 ]
    //             },
    //             {
    //                 _id: new ObjectId(),
    //                 "order": 2,
    //                 "descriptions": [{
    //                     _id: new ObjectId(),
    //                     "type": "default",
    //                     "text": faker.lorem.text()
    //                 }],
    //                 "possibleAnswer": [
    //                     "positive",
    //                     "angry"
    //                 ]
    //             }
    //         ]
    //     };

    //     situation = await SituationService.createSituation(mock);
    //     expect(situation).to.not.equal(false);
    // });

    // it('Find', async () => {
    //     situation = await SituationService.findSituation('5c1ae1e357a0651d01a7755b');
    //     expect(situation).to.be.a('object');
    //     expect(situation).to.have.property('_id');
    //     expect(situation).to.have.property('title');
    //     expect(situation).to.have.property('description');
    //     expect(situation).to.have.property('steps');
    //     expect(situation).to.have.property('author');
    // });

    // it('Add step', async () => {
    //     const ObjectId = require('mongodb').ObjectID;
    //     const result = await SituationService.createStep('5c1ae1e357a0651d01a7755b',
    //     {
    //         _id: new ObjectId(),
    //         "description": [{
    //             "type": "default",
    //             "text": faker.lorem.text()
    //         }],
    //         "possibleAnswer": [
    //             "default"
    //         ]
    //     });
    //     console.log(result);

    //     // expect(situation).to.be.a('object');
    //     // expect(situation).to.have.property('_id');
    //     // expect(situation).to.have.property('title');
    //     // expect(situation).to.have.property('description');
    //     // expect(situation).to.have.property('steps');
    //     // expect(situation).to.have.property('author');
    // });

    // it('Update Description', async () => {
    //     situation = await SituationService.updateStepDescription('5c2424ea65056127ade37c2b', '5c2424ea65056127ade37c29', '5c2424ea65056127ade37c2a', null, 'kkkkkkkkkkkkkkkk!');
    //     // expect(situation).to.be.a('object');
    //     // expect(situation).to.have.property('_id');
    //     // expect(situation).to.have.property('title');
    //     // expect(situation).to.have.property('description');
    //     // expect(situation).to.have.property('steps');
    //     // expect(situation).to.have.property('author');
    // });

    // it('Update Possible answers', async () => {
    //     situation = await SituationService.updatePossibleAnswers('5c2563c5b8612319f31e0f80', ['soft', 'harsh']);
    //     // expect(situation).to.be.a('object');
    //     // expect(situation).to.have.property('_id');
    //     // expect(situation).to.have.property('title');
    //     // expect(situation).to.have.property('description');
    //     // expect(situation).to.have.property('steps');
    //     // expect(situation).to.have.property('author');
    // });

    // it('Update Situation', async () => {
    //     situation = await SituationService.updateSituation('5c25643ea56e7a1a2a9eff04', {type : "daily-situation"});
    //     // expect(situation).to.be.a('object');
    //     // expect(situation).to.have.property('_id');
    //     // expect(situation).to.have.property('title');
    //     // expect(situation).to.have.property('description');
    //     // expect(situation).to.have.property('steps');
    //     // expect(situation).to.have.property('author');
    // });

    it('Search', async () => {
        const search = await SituationService.search("Fish");
        search.forEach(item => console.log(item));
        // expect(situation).to.be.a('object');
        // expect(situation).to.have.property('_id');
        // expect(situation).to.have.property('title');
        // expect(situation).to.have.property('description');
        // expect(situation).to.have.property('steps');
        // expect(situation).to.have.property('author');
    });
});