import { resolve } from "path";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SendMailService from "../services/SendMailService";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { AppError } from "../errors/AppError";

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({
            email
        });

        if (!user) {
            throw new AppError("User does not exists");
        }

        const survey = await surveysRepository.findOne({
            id: survey_id
        });

        if (!survey) {
            throw new AppError("Survey does not exists");
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        let surveyUser = await surveysUsersRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ["user", "survey"]
        });

        if (!surveyUser) {
            surveyUser = surveysUsersRepository.create({
                user_id: user.id,
                survey_id
            });

            await surveysUsersRepository.save(surveyUser);
        }

        const variabels = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: surveyUser.id,
            link: process.env.URL_MAIL
        }

        await SendMailService.execute(email, survey.title, variabels, npsPath);

        return response.json(surveyUser)
    }
}

export { SendMailController };