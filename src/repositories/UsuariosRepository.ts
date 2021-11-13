import Usuario from "../models/Usuario";

export default interface UsuarioRepository {
  findAll(): Promise<Usuario[]>;
  findByEmail(email: string): Promise<Usuario>;
  remove(email: string): Promise<void>;
  update(email: string, usuario: Usuario): Promise<void>;
  saveMany(usuarios: Usuario[]): Promise<void>;
  saveOne(usuario: Usuario): Promise<void>;
}
