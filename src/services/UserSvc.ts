import { UserEnt } from "../entities/UserEnt";
import { UserTO } from "../models/User";
import { Database } from "../plugins/db";
import { BaseSvc } from "./BaseSvc";

class UserSvc extends BaseSvc<UserTO, UserEnt> {

  constructor(db: Database) {
    super(db.userRepo, UserEnt);
  }

  fromEntity(ent: UserEnt): UserTO {
    return { ...ent }
  }
}

export class UserSvcLive extends UserSvc {

}