/// <reference path="../typings/mocha/mocha.d.ts" />

import * as mocha from "mocha";
import * as supertest from "supertest";
import assert = require("assert");
import {Server} from "../app";

describe("Test analyzer", () => {

  let request: any = null;

  before(() => {
    let s = new Server();
    s.setup();
    request = supertest((s as any).app);    
  });

  it("should return a score > 0", (done: any) => {
    request.post("/")
      .send("text=kill yourself")
      .end((err, response) => {
        assert.equal(err, null);
        assert(response.body.score > 0);
        assert.equal(response.body.warningGenerated, false);
        assert.equal(response.body.warning, "");
        done();      
    });
  });
  it("should return a score of 0", (done: any) => {
    request.post("/")
      .send("text=This is a nice safe message")
      .end((err, response) => {
        assert.equal(err, null);
        assert(response.body.score === 0);
        assert.equal(response.body.warningGenerated, false);
        assert.equal(response.body.warning, "");
        done();      
    });
  });
  it("should test a really long message", (done: any) => {
    request.post("/")
      .send(`text=This is a really long message. It may or may not be dangerous but we are simply checking to ensure 
      that our API can handle long messages. The following was ripped directly from the Hodor Ipsum tool:      
      Hodor hodor HODOR! Hodor HODOR hodor, hodor hodor; hodor hodor? Hodor. Hodor HODOR hodor, hodor hodor 
      hodor hodor. Hodor hodor - hodor - hodor hodor - hodor?! Hodor hodor HODOR! Hodor hodor - hodor hodor 
      hodor hodor! Hodor! Hodor hodor, hodor hodor hodor hodor!
      Hodor! Hodor hodor, hodor hodor hodor hodor hodor - hodor. Hodor. Hodor hodor - HODOR hodor, hodor hodor?! 
      Hodor hodor; hodor hodor, hodor. Hodor hodor hodor! Hodor, hodor. Hodor. Hodor, hodor hodor hodor; hodor 
      hodor? Hodor. Hodor hodor; hodor hodor hodor hodor. Hodor, hodor - hodor?
      Hodor. Hodor hodor... Hodor hodor hodor; hodor hodor hodor. Hodor. Hodor! Hodor hodor, hodor, hodor. Hodor 
      HODOR hodor, hodor hodor?! Hodor, hodor hodor hodor. Hodor! Hodor hodor, hodor; hodor hodor... Hodor hodor 
      hodor. Hodor. Hodor hodor - hodor hodor... Hodor hodor hodor?! Hodor. Hodor hodor, hodor. Hodor HODOR 
      hodor, hodor hodor. Hodor. Hodor hodor - hodor, hodor. Hodor hodor, hodor, hodor hodor.`)
      .end((err, response) => {
        assert.equal(err, null);    
        assert.equal(response.body.warningGenerated, false);
        assert.equal(response.body.warning, "");    
        done();      
      });    
  });
  it("should trigger a warning", (done: any) => {
    request.post("/")
      .end((err, response) => {
        assert.equal(err, null);        
        assert(response.body.score === 0);
        assert.equal(response.body.warningGenerated, true);
        assert.notEqual(response.body.warning, "");
        done();      
    });
  });
});
