import Usuario from "../models/Usuario";
import UsuariosRepository from "./UsuariosRepository";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import crypto from "crypto";
import path from "path";

const USUARIOS_FILE_PATH = path.join(__dirname, "../../files/usuarios.json");

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
    if (existsSync(this.usuariosFilePath)) {
      const data = await readFile(this.usuariosFilePath);

      const fileContent = JSON.parse(data.toString()) as UsuarioFile[];
      const usuarios = fileContent.map((usuario) => {
        const nome = usuario.nome;
        const email = usuario.email;
        const senha = usuario.senha;
        return new Usuario(nome, email, senha);
      });
      return usuarios;
    } else {
      return [];
    }
  }

  public async findByEmail(email: string): Promise<Usuario> {
    const usuarios = await this.findAll();
    const result = usuarios.find((usuario) => usuario.getEmail() === email);
    return result;
  }

  public async remove(email: string): Promise<void> {
    let usuarios = await this.findAll();
    usuarios = usuarios.map((usuario) => {
      if (usuario.getEmail() === email) {
        usuario.setStatus(false);
      }
      return usuario;
    });
    await this.saveMany(usuarios);
  }

  public async update(email: string, updatedUsuario: Usuario): Promise<void> {
    const usuarios = await this.findAll();
    const usuarioAlreadyExists = await this.findByEmail(email);

    if (!usuarioAlreadyExists) {
      throw new Error("Email não cadastrado para nenhum usuario");
    }

    const result = usuarios.map((usuario) => {
      if (email === usuario.getEmail()) {
        const updatedNome = updatedUsuario.getNome();
        const updatedSenha = updatedUsuario.getSenha();
        return new Usuario(updatedNome, email, updatedSenha);
      } else {
        return usuario;
      }
    });
    await this.saveMany(result);
  }

  public async saveMany(usuarios: Usuario[]) {
    await writeFile(this.usuariosFilePath, JSON.stringify(usuarios));
  }

  public async saveOne(usuario: Usuario): Promise<void> {
    let usuarios: Usuario[] = [];

    if (!this.validateEmail(usuario.getEmail())) {
      throw new Error("Email invalido");
    }

    usuarios = await this.findAll();

    const usuarioAlreadyExists = await this.findByEmail(usuario.getEmail());

    if (usuarioAlreadyExists) {
      throw new Error("Usuario ja cadastrado");
    }

    const senhaHasheada = this.getHashSenha(usuario.getSenha());
    usuario.setSenha(senhaHasheada);
    usuarios.push(usuario);
    await writeFile(this.usuariosFilePath, JSON.stringify(usuarios));
  }

  public async login(email: string, senha: string) {
    const usuarios = await this.findAll();
    const hashSenha = this.getHashSenha(senha);
    const usuarioAlreadyExists = usuarios.some(
      (usuario) =>
        usuario.getEmail() === email && usuario.getSenha() === hashSenha
    );

    if (!usuarioAlreadyExists) {
      throw new Error("Email ou senha incorretos");
    }

    return true;
  }

  public getHashSenha(senha: string): string {
    const secret = process.env.SECRET;
    return crypto.createHmac("sha256", secret).update(senha).digest("hex");
  }

  public validateEmail(email: string) {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(email);
  }
}
