const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);
const expect = chai.expect;

let foodId = null; // Store ID for later tests

describe("MenuControl API Tests", () => {
  let testFoodId;

  it("GET /home - should return 'working'", (done) => {
    chai.request(server)
      .get("/home")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("working");
        done();
      });
  });

  it("POST /newfood - should add a new food item", (done) => {
    chai.request(server)
      .post("/newfood")
      .send({ foodName: "Pizza", price: 200, desc: "Delicious cheese pizza" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("foodName", "Pizza");
        expect(res.body).to.have.property("price", 200);
        testFoodId = res.body._id;  // Save the new food's id for later tests
        done();
      });
  });

  it("PUT /menu/:id - should update a food item", (done) => {
    chai.request(server)
      .put(`/menu/${testFoodId}`)
      .send({ foodName: "Veg Pizza", price: 250, desc: "Updated description" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("foodName", "Veg Pizza");
        expect(res.body).to.have.property("price", 250);
        done();
      });
  });

  it("DELETE /menu/:id - should delete a food item", (done) => {
  chai.request(server)
    .delete(`/menu/${testFoodId}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message").that.includes("deleted");
      done();
      });
  });

});


