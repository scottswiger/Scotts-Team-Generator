const Manager = require('../lib/Manager')

describe("Manager", () => {
    describe("Name", () => {
        it("should return the name of the Employee", () => {
            const name = "Scott";
            const obj = new Manager(name);
            expect(obj.getName()).toEqual(name);
        })
    })
    describe("Id", () => {
        it("should return the Id of the Employee", () => {
            const id = "1234";
            const obj = new Manager('', id);
            expect(obj.getId()).toEqual(id);
        })
    })
    describe("Role", () => {
        it("should return the Role of Employee", () => {
            const obj = new Manager();
            expect(obj.getRole(0)).toEqual("Manager");
        })
    })
    describe("Email", () => {
        it("should return the Email of the Employee", () => {
            const email = "scott@scott.com";
            const obj = new Manager('', '', email);
            expect(obj.getEmail()).toEqual(email);
        })
    })
    describe("officeNumber", () => {
        it("should return the school name of the Employee", () => {
            const officeNumber = "00000000";
            const obj = new Manager('', '', '', officeNumber);
            expect(obj.getOfficeNumber()).toEqual(officeNumber);

        })
    })
})