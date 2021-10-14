import Usuario from "../models/Usuario";
import UsuariosRepository from "./UsuariosRepository";
import { readFile } from "fs";

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

  // --- Recupera todos

  public findAll(): Promise<Usuario[]> {
    // @todo
    return Promise.reject("Não implementado");
  }

  // --- Encontra um usuario pelo seu email

  public findByEmail(email: string): Promise<Usuario> {
    // @todo
    return Promise.reject("Não implementado");
  }

  // --- Remove um usuario pelo seu email

  public remove(email: string): Promise<void> {
    // @todo
    return Promise.reject("Não implementado");
  }

  // --- Atualiza um usuario

  public update(usuario: Usuario): Promise<void> {
    // @todo
    return Promise.reject("Não implementado");
  }

}
