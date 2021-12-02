import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Template } from "../models/Template";
import { Project } from "../models/Project";
import { AppException } from '../exceptions/AppException';

class TemplateController {

    //Retorno TODOS os registros
    public async index(request: Request, response: Response) {
        try {
            //Instancio um repositório da classe Template
            const repository = getRepository(Template);

            //Buscar TODOS os templates do banco
            const templates = await repository.find()

            //Pego o ID do projeto que veio por request params
            const { project } = request.params;

            //Buscar o project que veio por request params
            const projectFind = await getRepository(Project).findOne(project);
            
            const obj = {
                templates,
                projectFind
            }

            //Retorno a lista de templates, mais o objeto do projeto
            return response.status(200).json(obj);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        }
    }
    //Adiciono um template
    public async create(request: Request, response: Response) {
        try {
            //Instancio um repositório da classe Template
            const repository = getRepository(Template);

            //Crio uma instância de Template a partir do JSON que veio por request body
            const project = await repository.save(request.body);

            //Retorno o objeto inserido
            return response.status(201).json(project);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        }
    }

    //Removo um template
    public async remove(request: Request, response: Response) {
        try {
            //Pegar o ID do projeto do request params
            const { idTemplate } = request.params;

            //Instancio um repositório da classe Template
            const repository = getRepository(Template);

            //Buscar o template pelo ID
            const template = await repository.findOne(idTemplate);

            //Removo o template
            await repository.remove(template as Template);

            //Retorno o template removido
            return response.status(204).json();

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        }
    }
    //Adicionar um projeto à partir do Template e incrementar a quantidade de vezes que este foi adicionado (incrementar o campo amountUse)
    public async install(request: Request, response: Response) {
        try {
            //Pegar o ID do projeto do request params
            const { idTemplate } = request.params;

            //Instancio um repositório da classe Template
            const repository = getRepository(Template);

            //Buscar o template pelo ID
            const template = await repository.findOne(idTemplate);

            //Incrementar o campo amountUse
            template!.amountUse++;

            //Salvar o template
            await repository.save(template as Template);

            //Retorno o template
            return response.status(200).json(template);
        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        }
    }
}

export default new TemplateController();