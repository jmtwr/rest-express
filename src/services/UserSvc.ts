import { UserEnt } from "../entities/UserEnt";
import { PublicUserTO, UserTO } from "../models/User";
import { Database } from "../plugins/db";
import { BaseSvc } from "./BaseSvc";

class UserSvc extends BaseSvc<UserTO, UserEnt> {

  constructor(db: Database) {
    super(db.userRepo, UserEnt);
  }

  fromEntity(ent: UserEnt): UserTO {
    return { ...ent }
  }

  toPublicTO(to: UserTO): PublicUserTO {
    return {
      user_id: to.user_id,
      firstName: to.firstName,
      lastName: to.lastName,
      email: to.email
    }
  }
}

export class UserSvcLive extends UserSvc {

}