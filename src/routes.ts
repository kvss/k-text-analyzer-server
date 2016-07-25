import * as express from "express";
import {Analyzer} from "../node_modules/k-text-analyzer/build/src/analyzer";

module Route {
  export interface ReturnObject {
    score: number,
    warning: string,
    warningGenerated: boolean,
    input: string
  }
  export class Routes {
    public index(req: express.Request, res: express.Response, next: express.NextFunction) {
      let analyzer = new Analyzer();
      
      let ret: ReturnObject = {
        score: 0,
        warning: "",
        warningGenerated: false,
        input: ""
      };
      
            
      let text = "";
      if(req.hasOwnProperty("body") && req.body.hasOwnProperty("text")){
        ret.input = req.body.text;
      }else{
        ret.warning = "We could not find a POST body that contained a 'text' property, so the score is 0."
        ret.warningGenerated = true;
      }
      ret.score = analyzer.analyze(ret.input);
      
      res.send(ret);
    }
  }
}

export = Route;