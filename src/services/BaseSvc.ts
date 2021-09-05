import { ObjectLiteral, Repository } from "typeorm";

export abstract class BaseSvc<TO, ENT extends ObjectLiteral> {
  repo: Repository<ENT>;
  entConstructor: new () => ENT;

  constructor(repo: Repository<ENT>, entC: new () => ENT) {
    this.repo = repo;
    this.entConstructor = entC
  }

  abstract fromEntity(ent: ENT): TO;

  toEntity(to: TO): ENT {
    return Object.assign(new this.entConstructor(), to);
  }

  get(id: number): Promise<ENT> {
    try {
      return this.repo.findOneOrFail(id);
    } catch (err) {
      throw err;
    }
  }

  async add(to: TO): Promise<TO> {
    try {
      const ent = await this.repo.save(this.toEntity(to));
      return this.fromEntity(ent);
    } catch (err) {
      throw err;
    }
  }
}