import Usuario from "../models/Usuario";
import UsuariosRepository from "./UsuariosRepository";
import { readFile, writeFile } from "fs/promises";

const USUARIOS_FILE_PATH = "./files/usuarios.json";

type UsuarioFile = {
  nome: string;
  email: string;
  senha: string;
};

export default class JSONUsuariosRepository implements UsuariosRepository {
  private usuariosFilePath: string;

  constructor(outrosUsuarios?: string) {
    this.usuariosFilePath = outrosUsuarios || USUARIOS_FILE_PATH;
  }

  public async findAll(): Promise<Usuario[]> {
    return readFile(this.usuariosFilePath).then((data) => {
      const fileContent = JSON.parse(data.toString()) as UsuarioFile[];
      const usuarios = fileContent.map((usuario) => {
        const nome = usuario.nome;
        const email = usuario.email;
        const senha = usuario.senha;
        return new Usuario(nome, email, senha);
      });
      return usuarios;
    });
  }

  public async findByEmail(email: string): Promise<Usuario> {
    const usuarios = await this.findAll();
    const result = usuarios.find((usuario) => usuario.getEmail() === email);
    if (!result) {
      throw new Error(`Usuario não existente`);
    }
    return result;
  }

  public async remove(email: string): Promise<void> {
    const usuarios = await this.findAll();
    const result = usuarios.filter((usuario) => usuario.getEmail() !== email);
    if (!result) {
      throw new Error(`Usuario não existente`);
    }
    await this.save(result);
  }

  public async update(oldUsuario: Usuario): Promise<void> {
    const usuarios = await this.findAll();
    const result = usuarios.map((usuario) => {
      if (oldUsuario.getEmail() === usuario.getEmail()) {
        const updatedNome = usuario.getNome();
        const updatedSenha = usuario.getSenha();
        const email = usuario.getEmail();
        return new Usuario(updatedNome, email, updatedSenha);
      } else {
        return usuario;
      }
    });
    await this.save(result);
  }

  public async save(usuarios: Usuario[]): Promise<void> {
    return await writeFile(this.usuariosFilePath, JSON.stringify(usuarios));
  }
}
