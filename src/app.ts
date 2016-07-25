import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";

import * as appRoutes from "./routes";

export class Server{
  private app: express.Application = null;
  private server: any = null;
  private port: number = 4001;

  public setup(){
    this.port = process.env.KTP_PORT || this.port;
    this.app = express();

    this.app.use(bodyParser.urlencoded({ extended: true }));

    let router = express.Router();
    let routes: appRoutes.Routes = new appRoutes.Routes();

    router.post("/", routes.index.bind(routes.index));

    this.app.use(router);
  }

  public run(){
    this.server = this.app.listen(this.port);
    console.log("Server is up and listening on port " + this.port);
  }

}

let s = new Server();
s.setup();
s.run();