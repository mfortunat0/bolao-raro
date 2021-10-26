export default class Time {
  protected readonly id: number;
  protected nome: string;
  protected estado: string;

  public constructor(id: number, nome: string, estado: string) {
    this.id = id;
    this.nome = nome;
    this.estado = estado;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string) {
    this.nome = nome;
  }

  public getId(): number {
    return this.id;
  }

  public getEstado(): string {
    return this.estado;
  }

  public setEstado(estado: string) {
    this.estado = estado;
  }
}
