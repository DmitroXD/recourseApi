import {Request, Response, Router} from "express";
import {recourseRepository} from "../repository";
import {RequestBody} from "../typed";
import {CreateRecourseDto} from "./dto";
import {RecourseStatus} from "../entity/recourse";


export class RecourseController {

    static async all(request: Request, response: Response) {
        const data = await recourseRepository.findAll();
        return response.status(200).send(data);
    }

    static async findOne(request: Request, response: Response) {
        const id = Number(request.params.id);
        const data = await recourseRepository.findOne(id);
        return response.send(data);
    }

    static async create(request: RequestBody<CreateRecourseDto>, response: Response) {
        const data = await recourseRepository.create(request.body);
        return response.status(201).send(data);
    }

    static async takeInWork(request: RequestBody<{id: number}>, response: Response) {
        const data = await recourseRepository.updateStatus(
            request.body.id,
            RecourseStatus.IN_WORK
        );
        return response.send(data);
    }

    static async complete(request: RequestBody<{id: number}>, response: Response) {
        const data = await recourseRepository.updateStatus(
            request.body.id,
            RecourseStatus.COMPLETED
        );
        return response.send(data);
    }

    static async cancel(request: RequestBody<{id: number}>, response: Response) {
        const data = await recourseRepository.updateStatus(
            request.body.id,
            RecourseStatus.CANCELED
        );
        return response.send(data);
    }

    static async cancelAll(request: RequestBody<{id: number}>, response: Response) {
        const data = await recourseRepository.cancelAllRecourse();
        return response.send(data);
    }

    static async delete(request: RequestBody<{ id: number }>, response: Response) {
        const data = await recourseRepository.delete(request.body.id);
        return response.send(data);
    }

    static includeRouters(router: Router) {
        type routerType = Parameters<typeof router.get>[1]
        router.get("/all", this.all as routerType)
        router.get("/get", this.findOne as routerType)
        router.post("/create", this.create as routerType)
        router.post("/take", this.takeInWork as routerType)
        router.post("/complete", this.complete as routerType)
        router.post("/cancel", this.cancel as routerType)
        router.post("/cancelAll", this.cancelAll as routerType)
        router.post("/delete", this.delete as routerType)
    }
}
