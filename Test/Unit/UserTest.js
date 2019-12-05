const expect = require('chai').expect;
const UserService = require('../../App/Services/User/UserService');
const faker = require('faker');

let user = null;

describe('User', () => {
    it('Create', async () => {
        user = await UserService.createUser(
            faker.name.findName(),
            faker.internet.email(),
            faker.internet.password(8));
        expect(user).to.not.equal(false);
    });

    it('Find', async () => {
        user = await UserService.findUser(user);
        expect(user).to.be.a('object');
        expect(user).to.have.property('_id');
        expect(user).to.have.property('name');
        expect(user).to.have.property('email');
        expect(user).to.have.property('password');
    });

    it('Update', async () => {
        const updateResult = await UserService.updateUser(user._id, "UpdatedName");
        expect(updateResult).to.be.a('boolean');
        expect(updateResult).to.be.equal(true);
    });
});