import {Request, Response, Router} from "express";
import {recourseRepository} from "../repository";
import {RequestBody} from "../typed";
import {CreateRecourseDto, UpdateRecourseDto} from "./dto";
import {RecourseStatus} from "../entity/recourse";


export class RecourseController {

    static async all(request: Request, response: Response) {
        return response.status(200).send(
            await recourseRepository.findAll()
        );
    }

    static async findOne(request: Request, response: Response) {
        return response.send(
            await recourseRepository.findOne(
                Number(request.params.id)
            )
        );
    }

    static async create(request: RequestBody<CreateRecourseDto>, response: Response) {
        return response.status(201).send(
            await recourseRepository.create(request.body)
        );
    }

    static async takeInWork(request: RequestBody<{ id: number }>, response: Response) {
        const updateData = new UpdateRecourseDto()
        updateData.status = RecourseStatus.IN_WORK
        const result = await recourseRepository.update(
            request.body.id,
            updateData
        );
        return response.send(result);
    }

    static async complete(request: RequestBody<{ id: number }>, response: Response) {
        const updateData = new UpdateRecourseDto()
        updateData.status = RecourseStatus.COMPLETED
        const result = await recourseRepository.update(
            request.body.id,
            updateData
        );
        return response.send(result);
    }

    static async cancel(request: RequestBody<{ id: number, reason?: string }>, response: Response) {
        const updateData = new UpdateRecourseDto()
        updateData.status = RecourseStatus.CANCELED
        updateData.reasonCanceled = request.body.reason
        const result = await recourseRepository.update(
            request.body.id,
            updateData
        );
        return response.send(result);
    }

    static async cancelAll(request: RequestBody<{ id: number, reason?: string }>, response: Response) {
        const updateData = new UpdateRecourseDto()
        updateData.status = RecourseStatus.CANCELED
        updateData.reasonCanceled = request.body.reason
        const result = await recourseRepository.updateAll(
            updateData
        );
        return response.send(result);
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
